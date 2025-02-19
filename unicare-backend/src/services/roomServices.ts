import { RoomsTable, InpatientTable } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const getRoomById = async (roomId: string) => {
  try {
    return await db.select().from(RoomsTable).where(eq(RoomsTable.id, roomId));
  } catch (err) {
    throw err;
  }
};

export const getAllRooms = async () => {
  try {
    return await db.select().from(RoomsTable);
  } catch (err) {
    throw err;
  }
};

export const assignRoom = async (regNo: string, roomId: any) => {
  try {
    return await db
      .insert(InpatientTable)
      .values({
        reg_no: regNo,
        room_id: roomId,
      })
      .returning();
  } catch (err) {
    throw err;
  }
};

export const updateDischargePatient = async (regNo: string) => {
  try {
    return await db
      .update(InpatientTable)
      .set({ discharge_date: new Date() })
      .where(eq(InpatientTable.reg_no, regNo))
      .returning();
  } catch (err) {
    throw err;
  }
};
