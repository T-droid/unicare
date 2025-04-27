import { between, count, eq, sql } from "drizzle-orm";
import { db } from "../db";
import {
  InpatientTable,
  DrugsTable,
  AppointmentsTable,
  labTestRequestTable,
  PatientMedicalRecords,
  RoomsTable,
  StudentTable,
  UserTable,
} from "../db/schema";
import { date } from "drizzle-orm/pg-core";

// export const fetchPrescriptionsReport = async (startDate: Date, endDate: Date) => {
//     // Simulate fetching drug usage data from the database
//     try {
//         const prescriptionsReport = await db
//             .select({
//                 student: {
//                     name: StudentTable.name,
//                     reg_no: StudentTable.reg_no,
//                 },
//                 doctor_name: UserTable.name,
//                 prescription: PatientMedicalRecords.prescription,
//             })
//             .from(PatientMedicalRecords)
//             .orderBy(sql`${PatientMedicalRecords.created_at} desc nulls last`)
//             .leftJoin(StudentTable, eq(PatientMedicalRecords.reg_no, StudentTable.reg_no))
//             .leftJoin(UserTable, eq(PatientMedicalRecords.prescribed_by_id, UserTable.id))
//             .where(between(PatientMedicalRecords.created_at, startDate, endDate));

//         return prescriptionsReport;
//     } catch (error: any) {
//         console.log("Error fetching drug usage report:", error);
//         throw new Error(`Failed to fetch drug usage report: ${error.message}`);
//     }
//   };

//   export const fetchLabTestsReport = async (startDate: string, endDate: string) => {
//     // Simulate fetching lab tests data from the database
//     try {
//         const labTestsReport = await db
//             .select({
//                 test_name: labTestRequestTable.test_name,
//                 total_tests: count(labTestRequestTable.id),
//                 requested_by: labTestRequestTable.requested_by_id,
//                 requested_at: labTestRequestTable.requested_at,
//             })
//             .from(labTestRequestTable)
//             .groupBy(
//                 labTestRequestTable.test_name,
//                 labTestRequestTable.requested_by_id,
//                 labTestRequestTable.requested_at
//             )
//             .orderBy(sql`${count(labTestRequestTable.id)} desc`)
//             .where(between(labTestRequestTable.created_at, new Date(startDate), new Date(endDate)));

//         return labTestsReport;
//     } catch (error: any) {
//         console.error("Error fetching lab tests report:", error);
//         throw new Error(error);
//     }
//   };

//   export const fetchStudentTreatedReport = async (startDate: string, endDate: string) => {
//     // Simulate fetching student treatment data from the database
//     try {
//         const studentTreatedReport = await db
//             .select({
//                 total_treated: count(PatientMedicalRecords.id)
//             })
//             .from(PatientMedicalRecords)
//             .where(between(PatientMedicalRecords.created_at, new Date(startDate), new Date(endDate)));
//         return studentTreatedReport;

//     } catch (error: any) {
//         console.error("Error fetching student treated report:", error);
//         throw new Error(error);
//     }
//   };

//   export const fetchRoomOccupancyReport = async (startDate: string, endDate: string) => {
//     // Simulate fetching room occupancy data from the database
//     try {
//         const getRoomOccupancyReport = await db
//             .select({
//                 total_inpatients: count(InpatientTable.reg_no),
//                 room: {
//                 room_name: RoomsTable.name,
//                 total_beds: RoomsTable.total_beds,
//                 occupied_beds: sql`${RoomsTable.total_beds} - ${RoomsTable.available_beds}`,
//                 },
//             })
//             .from(RoomsTable)
//             .leftJoin(InpatientTable, eq(InpatientTable.room_id, RoomsTable.id))
//     } catch (error: any) {
//         console.error("Error fetching student treated report:", error);
//         throw new Error(error);
//     }
//   };

// // fetch total student,total staff based on roles, total_appointments, total drugs nearing out of stock
export const getTotalStudents = async () => {
  try {
    const totalStudents = await db
      .select({
        total_students: count(StudentTable.id),
      })
      .from(StudentTable);
    return totalStudents[0]; // assuming one row
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch total students: " + error);
  }
};

// Get total staff and breakdowns
export const getTotalStaff = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const totalStaff = await db
      .select({
        total_staff: count(UserTable.id),
        total_doctors: count(
          sql`CASE WHEN ${UserTable.role} = 'doctor' THEN 1 ELSE NULL END`,
        ),
        total_nurses: count(
          sql`CASE WHEN ${UserTable.role} = 'nurse' THEN 1 ELSE NULL END`,
        ),
        total_pharmacists: count(
          sql`CASE WHEN ${UserTable.role} = 'pharmacist' THEN 1 ELSE NULL END`,
        ),
        total_lab_technicians: count(
          sql`CASE WHEN ${UserTable.role} = 'lab_technician' THEN 1 ELSE NULL END`,
        ),
        total_added_today: count(
          sql`CASE WHEN ${UserTable.created_at}::date = ${today} THEN 1 ELSE NULL END`,
        ),
      })
      .from(UserTable);

    return totalStaff[0]; // one row expected
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch total staff: " + error);
  }
};

// Get total appointments and breakdowns
export const getTotalAppointments = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const last7Days = new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0];
    const last30Days = new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0];

    const totalAppointments = await db
      .select({
        total_appointments: count(AppointmentsTable.id),
        total_appointments_today: count(
          sql`CASE WHEN ${AppointmentsTable.created_at}::date = ${today} THEN 1 ELSE NULL END`,
        ),
        total_appointments_this_week: count(
          sql`CASE WHEN ${AppointmentsTable.created_at}::date >= ${last7Days} THEN 1 ELSE NULL END`,
        ),
        total_appointments_this_month: count(
          sql`CASE WHEN ${AppointmentsTable.created_at}::date >= ${last30Days} THEN 1 ELSE NULL END`,
        ),
      })
      .from(AppointmentsTable);

    return totalAppointments[0];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch total appointments: " + error);
  }
};

// Get drug details and summaries
export const drugDetails = async () => {
  try {
    const outOfStock = await db
      .select({
        drug_name: DrugsTable.name,
        quantity: DrugsTable.quantity,
        updated_at: DrugsTable.updated_at,
      })
      .from(DrugsTable)
      .where(sql`${DrugsTable.quantity} = 0`);

    const nearOutOfStock = await db
      .select({
        drug_name: DrugsTable.name,
        quantity: DrugsTable.quantity,
        updated_at: DrugsTable.updated_at,
      })
      .from(DrugsTable)
      .where(sql`${DrugsTable.quantity} < 5 AND ${DrugsTable.quantity} > 0`);

    const summary = await db
      .select({
        total_drugs: count(DrugsTable.id),
        total_in_stock: count(
          sql`CASE WHEN ${DrugsTable.quantity} > 0 THEN 1 ELSE NULL END`,
        ),
        total_out_of_stock: count(
          sql`CASE WHEN ${DrugsTable.quantity} = 0 THEN 1 ELSE NULL END`,
        ),
        total_near_out_of_stock: count(
          sql`CASE WHEN ${DrugsTable.quantity} < 5 AND ${DrugsTable.quantity} > 0 THEN 1 ELSE NULL END`,
        ),
      })
      .from(DrugsTable);

    return {
      ...summary[0],
      drugs_out_of_stock: outOfStock,
      drugs_near_out_of_stock: nearOutOfStock,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch drug details: " + error);
  }
};

// Combine all dashboard data
export const dashboardData = async () => {
  try {
    const data = {
      drugDetails: await drugDetails(),
      studentDetails: await getTotalStudents(),
      staffDetails: await getTotalStaff(),
      appointmentDetails: await getTotalAppointments(),
    };
    return data;
  } catch (error) {
    console.error("Failed to compile dashboard data:", error);
    throw error;
  }
};
