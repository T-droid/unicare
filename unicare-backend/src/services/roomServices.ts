import { RoomsTable, InpatientTable } from "../db/schema";
import { db } from "../db";
import { and, eq, sql } from "drizzle-orm";

export const getRoomById = async (roomId: string) => {
  return await db.select().from(RoomsTable).where(eq(RoomsTable.id, roomId));
};

export const getAllRooms = async () => {
  return await db.select().from(RoomsTable);
};

export const assignRoom = async (
  regNo: string,
  roomId: any,
  availableBeds: number | null,
) => {
  return await db.transaction(async (tx) => {
    try {
      // Check if the patient is already assigned to a room
      const existingAssignment = await tx
        .select({ room_id: InpatientTable.room_id })
        .from(InpatientTable)
        .where(eq(InpatientTable.reg_no, regNo))
        .limit(1);

      if (existingAssignment.length > 0) {
        throw new Error("Patient is already assigned to a room");
      }

      // Assign the room to the patient
      const roomAssignment = await tx
        .insert(InpatientTable)
        .values({
          reg_no: regNo,
          room_id: roomId,
        })
        .returning();

      // Decrement the available beds in the room
      await tx
        .update(RoomsTable)
        .set({
          available_beds: (availableBeds as number) - 1,
        })
        .where(eq(RoomsTable.id, roomId));

      return roomAssignment;
    } catch (error) {
      console.log(`Transaction failed:`, error);
      tx.rollback();
      throw error;
    }
  });
};

export const updateDischargePatient = async (regNo: string) => {
  return await db
    .update(InpatientTable)
    .set({ discharge_date: new Date() })
    .where(eq(InpatientTable.reg_no, regNo))
    .returning();
};

export const reassignRoom = async (regNo: string) => {
  return await db.transaction(async (tx) => {
    try {
      console.log(`Starting transaction for regNo: ${regNo}`);

      // Fetch the current room assignment for the patient
      const roomAssignment = await tx
        .select({
          room_id: InpatientTable.room_id,
        })
        .from(InpatientTable)
        .where(eq(InpatientTable.reg_no, regNo))
        .limit(1);

      console.log(`Room assignment result:`, roomAssignment);

      // Ensure roomAssignment is not empty
      if (roomAssignment.length === 0) {
        throw new Error(
          "Patient is already discharged and cannot be reassigned",
        );
      }

      const { room_id: roomId } = roomAssignment[0];

      // Ensure roomId is valid before updating the room's available beds
      if (!roomId) {
        throw new Error("Room ID is null or invalid");
      }

      // Delete the patient's room assignment
      await tx
        .delete(InpatientTable)
        .where(
          and(
            eq(InpatientTable.reg_no, regNo),
            eq(InpatientTable.room_id, roomId),
          ),
        );

      const room = await tx
        .select({ available_beds: RoomsTable.available_beds })
        .from(RoomsTable)
        .where(eq(RoomsTable.id, roomId))
        .limit(1);

      // Increment the available beds in the room
      const roomUpdateResult = await tx
        .update(RoomsTable)
        .set({
          available_beds: (room[0].available_beds as number) + 1,
        })
        .where(eq(RoomsTable.id, roomId));

      console.log(`Room update result:`, roomUpdateResult);

      return { message: "Room reassigned successfully" };
    } catch (error) {
      console.error(`Transaction failed:`, error);
      await tx.rollback();
      throw error;
    }
  });
};
