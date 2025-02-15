export interface Appointment {
  id: string;
  studentId: string;
  doctorId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "canceled";
}
