import { Appointment } from "../types/appointment";
import { db } from "../db";
import { AppointmentsTable, StudentTable, UserTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { Request, Response } from "express";

const appointments: Appointment[] = [];

export const bookAppointment = async (
  regNo: string,
  doctorId: string,
  date: string | any,
) => {
  return await db
    .insert(AppointmentsTable)
    .values({
      reg_no: regNo,
      doctor_id: doctorId,
      appointment_date: date,
    })
    .returning();
};

export const studentExists = async (regNo: string): Promise<boolean> => {
  await db.select().from(StudentTable).where(eq(StudentTable.reg_no, regNo));
  return studentExists.length === 0;
};

export const doctorExists = async (doctorId: string): Promise<boolean> => {
  await db
    .select()
    .from(UserTable)
    .where(and(eq(UserTable.id, doctorId), eq(UserTable.role, "doctor")));
  return doctorExists.length === 0;
};
