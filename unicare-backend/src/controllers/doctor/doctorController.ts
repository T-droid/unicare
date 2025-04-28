import { Request, Response } from "express";
import {
  createStudentPrescription,
  getAllDoctors,
  getDoctorLabRequests,
  getDoctorsAppointments,
  getDoctorsPrescriptions,
  getStudentLabTests,
  getStudentMedicalHistory,
  requestStudentLabTest,
  updatePatientType,
} from "../../services/doctorService";
import { getStudentByregNo } from "../../services/studentService";
import {
  validateCreateStudentPrescription,
  validateUpdatePatientType,
  validateRequestStudentLabTest,
} from "../../validation/doctorValidation";
import { CustomError } from "../../util/customerError";

// get all doctors details
export const getAllDoctorsController = async (
  req: Request & { user?: { role: string } },
  res: Response,
) => {
  const { role } = req.user || {};
  if (!role && role !== "receptionist") {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  try {
    const doctors = await getAllDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch all doctors", error });
  }
};

// View a student's complete medical history
export const getMedicalHistoryController = async (
  req: Request & { user?: { role: string } },
  res: Response,
) => {
  const { regNo } = req.params;
  const { role } = req.user || {};
  if (!role && role !== "doctor") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const student = await getStudentByregNo(regNo);
    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const medicalHistory = await getStudentMedicalHistory(regNo);
    if (medicalHistory.length === 0) {
      return res
        .status(404)
        .json({ message: "Student has no previouse medical history" });
    }

    const formattedMedicalHistory = medicalHistory.map((record) => ({
      ...record,
      student_name: student[0].name,
    }));

    return res.status(200).json({
      message: "Medical history fetched successfully",
      data: formattedMedicalHistory,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Write a new prescription for a student
export const createPrescriptionController = async (
  req: Request & { user?: { role: string; id: string } },
  res: Response,
) => {
  const { regNo } = req.params;
  const { prescriptionDetails } = req.body;

  const { role, id } = req.user || {};
  if (!role && role !== "doctor") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const { error } = validateCreateStudentPrescription.validate({
      regNo,
      prescriptionDetails,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the student exists
    const student = await getStudentByregNo(regNo);
    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Logic to create a new prescription
    const prescription = await createStudentPrescription(
      id as string,
      regNo,
      prescriptionDetails,
    );
    if (prescription.length === 0) {
      return res.status(400).json({ message: "Failed to create prescription" });
    }
    return res.status(201).json({
      message: "Prescription created successfully",
      data: { prescription, studentName: student[0].name },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server failed to create prescription", error });
  }
};

export const requestLabTestController = async (
  req: Request & { user?: { role: string; id: string | null } },
  res: Response,
) => {
  let { regNo } = req.params;
  regNo = decodeURIComponent(regNo);
  const { testName, testDescription } = req.body;
  const { role, id } = req.user || {};
  if (!role && role !== "doctor") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const { error } = validateRequestStudentLabTest.validate({
      regNo,
      testName,
      testDescription,
      requestedById: id,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the student exists
    const student = await getStudentByregNo(regNo);
    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const result = await requestStudentLabTest(
      regNo,
      testName,
      testDescription,
      id as string,
    );
    if (result.length === 0) {
      return res.status(400).json({ message: "Failed to request lab test" });
    }
    return res.status(201).json({
      message: "Lab test requested successfully",
      data: { result, studentName: student[0].name },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server failed to request lab test", error });
  }
};

// Mark the patient as either inpatient or outpatient
export const updatePatientTypeController = async (
  req: Request & { user?: { role: string } },
  res: Response,
) => {
  const { regNo } = req.params;
  const { patientType } = req.body;
  const { role } = req.user || {};
  if (!role && role !== "doctor") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const { error } = validateUpdatePatientType.validate({
      regNo,
      patientType,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the student exists
    const student = await getStudentByregNo(regNo);
    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Logic to update patient type
    const result = await updatePatientType(patientType, regNo);
    if (result.length === 0) {
      return res.status(400).json({ message: "Failed to update patient type" });
    }

    return res.status(200).json({
      message: "Patient type updated successfully",
      data: { result, studentName: student[0].name },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server failed to update patient type", error });
  }
};

// View lab results of the student

export const getLabResultsController = async (
  req: Request & { user?: { role: string } },
  res: Response,
) => {
  const { regNo } = req.params;

  const { role } = req.user || {};
  if (!role && role !== "doctor") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const labResults = await getStudentLabTests(regNo);
    if (labResults.length === 0) {
      return res.status(404).json({ message: "Lab results not found" });
    }
    return res.status(200).json({
      message: "Lab results fetched successfully",
      data: labResults[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server failed to fetch lab results", error });
  }
};

export const getDoctorsAppointmentsController = async (
  req: Request & { user?: { role: string; id: string | null } },
  res: Response,
) => {
  const { role, id } = req.user || {};
  if (!role && role !== "doctor") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const appointments = await getDoctorsAppointments(id as string);
    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }
    return res.status(200).json({
      message: "Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server failed to fetch appointments", error });
  }
};

export const getDoctorsLabrequestsController = async (
  req: Request & { user?: { role: string; id: string } },
  res: Response,
) => {
  const { role, id } = req.user || {};
  if (!role && role !== "doctor") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const labRequests = await getDoctorLabRequests(id as string);
    if (labRequests.length === 0) {
      return res.status(404).json({ message: "No lab requests found" });
    }
    return res.status(200).json({
      message: "Lab requests fetched successfully",
      data: labRequests,
    });
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};

export const getDoctorsPrescriptionsController = async (
  req: Request & { user?: { role: string; id: string } },
  res: Response,
) => {
  const { role, id } = req.user || {};
  if (!role && role !== "doctor") {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  try {
    const prescriptions = await getDoctorsPrescriptions(id as string);
    if (prescriptions.length === 0) {
      return res.status(404).json({ message: "No prescriptions found" });
    }
    return res.status(200).json({
      message: "Prescriptions fetched successfully",
      data: prescriptions,
    });
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};
