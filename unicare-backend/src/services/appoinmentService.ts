import { Appointment } from "../types/appointment";
import { db } from "../db";
import { AppointmentsTable, StudentTable, UserTable } from "../db/schema";
import { and, eq } from "drizzle-orm";


const appointments: Appointment[] = [];

export const bookAppointment = async (
  regNo: string,
  doctorId: string,
  date: string | any,
) => {

  const appointmentDate = new Date(date);
  if (isNaN(appointmentDate.getTime())) {
    throw new Error("Invalid date format");
  }
  return await db
    .insert(AppointmentsTable)
    .values({
      reg_no: regNo,
      doctor_id: doctorId,
      appointment_date: appointmentDate,
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
