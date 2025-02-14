import { Appointment } from "../types/appointment";

const appointments: Appointment[] = [];

export const bookAppointment = (
  studentId: string,
  doctorId: string,
  date: string,
  time: string,
): Appointment => {
  const newAppointment: Appointment = {
    id: String(appointments.length + 1),
    studentId,
    doctorId,
    date,
    time,
    status: "pending",
  };
  appointments.push(newAppointment);
  return newAppointment;
};
