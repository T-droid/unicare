import { RoomsTable, InpatientTable } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const getRoomById = async (roomId: string) => {
  return await db.select().from(RoomsTable).where(eq(RoomsTable.id, roomId));
};

export const getAllRooms = async () => {
  return await db.select().from(RoomsTable);
};

export const assignRoom = async (regNo: string, roomId: any) => {
  return await db
    .insert(InpatientTable)
    .values({
      reg_no: regNo,
      room_id: roomId,
    })
    .returning();
};

export const updateDischargePatient = async (regNo: string) => {
  return await db
    .update(InpatientTable)
    .set({ discharge_date: new Date() })
    .where(eq(InpatientTable.reg_no, regNo))
    .returning();
};
