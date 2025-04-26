import { Appointment } from "../types/appointment";
import { db } from "../db";
import { AppointmentsTable, StudentTable, UserTable } from "../db/schema";
import { and, eq, count} from "drizzle-orm";
import { d } from "drizzle-kit/index-BAUrj6Ib";

const appointments: Appointment[] = [];

export const bookAppointment = async (
  regNo: string,
  doctorId: string,
  date: string | any,
  // requestingUser: { id: string; role: string }
) => {
  const appointmentDate = new Date(date);
  if (isNaN(appointmentDate.getTime())) {
    throw new Error("Invalid date format");
  }
  // if (requestingUser.role !== "receptionist") {
  //   throw new Error("Only receptionists can book appointments.");
  // }

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
  const student = await db
    .select()
    .from(StudentTable)
    .where(eq(StudentTable.reg_no, regNo));
  return student.length > 0;
};

export const doctorExists = async (doctorId: string): Promise<boolean> => {
  const doctor = await db
    .select()
    .from(UserTable)
    .where(and(eq(UserTable.id, doctorId), eq(UserTable.role, "doctor")));
  return doctor.length > 0;
};

export const getAppointments = async (
  offset?: number,
  limit?: number
) => {
  try {
    // Base query
    let query = db
      .select({
        id: AppointmentsTable.id,
        // extract doctor details
        doctor_details: {
          id: UserTable.id,
          name: UserTable.name,
          phone_number: UserTable.phone_number,
          role: UserTable.role,
        },
        student_details: {
          reg_no: StudentTable.reg_no,  
          name: StudentTable.name,
          phone_number: StudentTable.phone_number,
        },
        appointment_date: AppointmentsTable.appointment_date
      })
      .from(AppointmentsTable)
      .innerJoin(StudentTable, eq(AppointmentsTable.reg_no, StudentTable.reg_no))
      .innerJoin(UserTable, eq(AppointmentsTable.doctor_id, UserTable.id));
    // Execute query
    const appointmentsList = await query.execute(); // Fix: Explicit execution of query


    return appointmentsList;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw new Error("Failed to fetch appointments: " + error);
  }
};
