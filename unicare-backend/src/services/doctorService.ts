import { and, desc, eq } from "drizzle-orm";
import { db } from "../db";
import {
  UserTable,
  PatientMedicalRecords,
  labTestRequestTable,
  AppointmentsTable,
  StudentTable,
} from "../db/schema";
import { CustomError } from "../util/customerError";

export async function getAllDoctors() {
  try {
    const doctors = await db
      .select({
        id: UserTable.id,
        name: UserTable.name,
        phone_number: UserTable.phone_number,
        email: UserTable.email,
        work_id: UserTable.work_id,
        // fetch department they belong to too
      })
      .from(UserTable)
      .where(eq(UserTable.role, "doctor"))
      .orderBy(desc(UserTable.created_at));

    return doctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error("Failed to fetch doctors");
  }
}
export async function getStudentMedicalHistory(regNo: string) {
  try {
    // Fetch medical history for the student
    const medicalHistory = await db
      .select({
        id: PatientMedicalRecords.id,
        prescription: PatientMedicalRecords.prescription,
        doctor_recommendation: PatientMedicalRecords.doctor_recommendation,
        patient_type: PatientMedicalRecords.patient_type,
        created_at: PatientMedicalRecords.created_at,
      })
      .from(PatientMedicalRecords)
      .where(eq(PatientMedicalRecords.reg_no, regNo))
      .orderBy(desc(PatientMedicalRecords.created_at));

    if (medicalHistory.length === 0) {
      throw new CustomError("No medical history found for this student", 404);
    }

    // Fetch lab tests for the student
    const labTests = await db
      .select({
        id: labTestRequestTable.id,
        test_name: labTestRequestTable.test_name,
        test_description: labTestRequestTable.test_description,
        test_status: labTestRequestTable.test_status,
        test_result: labTestRequestTable.test_result,
        requested_at: labTestRequestTable.requested_at,
        completed_at: labTestRequestTable.completed_at,
      })
      .from(labTestRequestTable)
      .where(eq(labTestRequestTable.reg_no, regNo))
      .orderBy(desc(labTestRequestTable.requested_at));

    // Merge medical history and lab tests
    const medicalHistoryWithLabTests = medicalHistory.map((record) => ({
      ...record,
      lab_results: labTests.filter(
        (test) =>
          new Date(test.requested_at as Date).toISOString().split("T")[0] ===
          new Date(record.created_at as Date).toISOString().split("T")[0],
      ),
    }));

    return medicalHistoryWithLabTests;
  } catch (error) {
    console.error("Error fetching medical history with lab tests:", error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      "Failed to fetch medical history with lab tests",
      500,
    );
  }
}

export async function createStudentPrescription(
  doctorId: string,
  regNo: string,
  prescription: string,
) {
  try {
    return await db
      .insert(PatientMedicalRecords)
      .values({
        prescribed_by_id: doctorId,
        reg_no: regNo,
        prescription,
      })
      .returning();
  } catch (error) {
    console.error("Error creating prescription:", error);
    throw new Error("Failed to create prescription");
  }
}

export async function requestStudentLabTest(
  regNo: string,
  testName: string,
  testDescription: string,
  requestedById: string | null,
) {
  try {
    // Fetch the latest medical history ID for the student
    const medicalHistory = await db
      .select({ id: PatientMedicalRecords.id })
      .from(PatientMedicalRecords)
      .where(eq(PatientMedicalRecords.reg_no, regNo))
      .orderBy(desc(PatientMedicalRecords.created_at))
      .limit(1);

    const medicalHistoryId =
      medicalHistory.length > 0 ? medicalHistory[0].id : null;

    // Insert the lab test request
    const labTestRequest = await db
      .insert(labTestRequestTable)
      .values({
        reg_no: regNo,
        medical_history_id: medicalHistoryId,
        test_name: testName,
        test_description: testDescription,
        requested_by_id: requestedById,
        requested_at: new Date(),
      })
      .returning();

    return labTestRequest;
  } catch (error) {
    console.error("Error requesting lab test:", error);
    throw new Error("Failed to request lab test");
  }
}
export async function updatePatientType(
  patientType: "outpatient" | "inpatient",
  regNo: string,
) {
  try {
    const result = await db
      .update(PatientMedicalRecords)
      .set({ patient_type: patientType })
      .where(eq(PatientMedicalRecords.reg_no, regNo))
      .returning();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getStudentLabTests(regNo: string) {
  try {
    const labTests = await db
      .select({
        id: labTestRequestTable.id,
        test_name: labTestRequestTable.test_name,
        test_description: labTestRequestTable.test_description,
        test_status: labTestRequestTable.test_status,
        test_result: labTestRequestTable.test_result,
        requested_at: labTestRequestTable.requested_at,
        completed_at: labTestRequestTable.completed_at,
      })
      .from(labTestRequestTable)
      .where(eq(labTestRequestTable.reg_no, regNo))
      .orderBy(desc(labTestRequestTable.requested_at));

    return labTests;
  } catch (error) {
    console.error("Error fetching student lab tests:", error);
    throw new Error("Failed to fetch student lab tests");
  }
}

export async function getDoctorsAppointments(id: string) {
  try {
    const appointments = await db
      .select({
        appointment_id: AppointmentsTable.id,
        appointment_date: AppointmentsTable.appointment_date,
        status: AppointmentsTable.status,
        created_at: AppointmentsTable.created_at,
        student: {
          reg_no: StudentTable.reg_no,
          name: StudentTable.name,
          emergency_contact: StudentTable.emergency_contact || "",
          phone_number: StudentTable.phone_number,
        },
      })
      .from(AppointmentsTable)
      .innerJoin(
        StudentTable,
        eq(StudentTable.reg_no, AppointmentsTable.reg_no),
      )
      .where(eq(AppointmentsTable.doctor_id, id))
      .orderBy(desc(AppointmentsTable.created_at));

    return appointments;
  } catch (error) {
    console.error("Error fetching doctors appointments:", error);
    throw new Error("Failed to fetch doctors appointments");
  }
}

export const getDoctorLabRequests = async (doctorId: string) => {
  try {
    const labRequests = await db
      .select({
        test_name: labTestRequestTable.test_name,
        test_description: labTestRequestTable.test_description,
        test_status: labTestRequestTable.test_status,
        test_result: labTestRequestTable.test_result,
        lab_tech_name: UserTable.name,
        requested_at: labTestRequestTable.requested_at,
        student_name: StudentTable.name,
        reg_no: StudentTable.reg_no,
      })
      .from(labTestRequestTable)
      .where(eq(labTestRequestTable.requested_by_id, doctorId))
      .orderBy(desc(labTestRequestTable.requested_at))
      .leftJoin(
        StudentTable,
        eq(StudentTable.reg_no, labTestRequestTable.reg_no),
      )
      .leftJoin(UserTable, eq(UserTable.id, labTestRequestTable.tested_by_id));
    return labRequests;
  } catch (error: any) {
    console.error("Error fetching lab requests:", error);
    throw new Error(error);
  }
};

export const getDoctorsPrescriptions = async (doctorId: string) => {
  try {
    const prescriptions = await db
      .select({
        student_namee: StudentTable.name,
        reg_no: PatientMedicalRecords.reg_no,
        prescription: PatientMedicalRecords.prescription,
        doctor_recommendation: PatientMedicalRecords.doctor_recommendation,
        prescribed_at: PatientMedicalRecords.created_at,
      })
      .from(PatientMedicalRecords)
      .leftJoin(
        StudentTable,
        eq(StudentTable.reg_no, PatientMedicalRecords.reg_no),
      )
      .where(eq(PatientMedicalRecords.prescribed_by_id, doctorId))
      .orderBy(desc(PatientMedicalRecords.created_at));
    return prescriptions;
  } catch (error: any) {
    console.error("Error fetching prescriptions:", error);
    throw new Error(error);
  }
};

// Chimene Mercedez Zema avance
