import { Appointment } from "../types/appointment";
import { db } from "../db";
import { AppointmentsTable } from "../db/schema";

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
