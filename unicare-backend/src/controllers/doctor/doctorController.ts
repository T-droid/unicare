import { Request, Response } from "express";
import { createStudentPrescription, getStudentMedicalHistory, requestStudentLabTest, updatePatientType } from "../../services/doctorService";
import { getStudentByregNo } from "../../services/studentService";
import { validateCreateStudentPrescription, validateUpdatePatientType, validateRequestStudentLabTest } from "../../validation/doctorValidation";

// View a student's complete medical history
export const getMedicalHistoryController  = async (req: Request, res: Response) => {
  const { regNo } = req.params;
  
  try {
    const student = await getStudentByregNo(regNo);
    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const medicalHistory = await getStudentMedicalHistory(regNo);
    if (medicalHistory.length === 0) {
      return res.status(404).json({ message: "Student has no previouse medical history" });
    }
    
    const formattedMedicalHistory = medicalHistory.map((record) => ({
      ...record,
      student_name: student[0].name,
    }));
    return res
      .status(200)
      .json({ message: "Medical history fetched successfully", data: formattedMedicalHistory });
  } catch (error) {
    return res.status(500).json({ message: "Server failed to get medical history", error });
  }
};

// Write a new prescription for a student
export const createPrescriptionController  = async (req: Request, res: Response) => {
  const { regNo } = req.params;
  const { prescriptionDetails } = req.body;
  
  try {
    const { error } = validateCreateStudentPrescription.validate({ regNo, prescriptionDetails });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the student exists
    const student = await getStudentByregNo(regNo);
    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Logic to create a new prescription
    const prescription = await createStudentPrescription(regNo, prescriptionDetails);
    if (prescription.length === 0) {
      return res.status(400).json({ message: "Failed to create prescription" });
    }
    return res
      .status(201)
      .json({ message: "Prescription created successfully", data: {prescription, studentName: student[0].name} });
    
  } catch (error) {
    return res.status(500).json({ message: "Server failed to create prescription", error });
  }
}

// Request a lab test for the student
export const requestLabTestController  = async (req: Request, res: Response) => {
  const { regNo } = req.params;
  const { testName, testDescription, requestedById } = req.body;

  try {
    const { error } = validateRequestStudentLabTest.validate({ regNo, testName, testDescription, requestedById });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the student exists
    const student = await getStudentByregNo(regNo);
    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const result = await requestStudentLabTest(regNo, testName, testDescription, requestedById);
    if (result.length === 0) {
      return res.status(400).json({ message: "Failed to request lab test" });
    }
    return res
      .status(201)
      .json({ message: "Lab test requested successfully", data: { result, studentName: student[0].name } });
  } catch (error) {
    return res.status(500).json({ message: "Server failed to request lab test", error });
  }
};

// Mark the patient as either inpatient or outpatient
export const updatePatientTypeController = async (req: Request, res: Response) => {
  const { regNo } = req.params;
  const { patientType } = req.body;

  try {
    const { error } = validateUpdatePatientType.validate({ regNo, patientType });
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
    return res
      .status(200)
      .json({ message: "Patient type updated successfully", data: { result, studentName: student[0].name } });
  } catch (error) {
    return res.status(500).json({ message: "Server failed to update patient type", error });
  }
};

// View lab results of the student
export const getLabResultsController  = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  // Logic to fetch lab results for the student
  // ...existing code...
  res
    .status(200)
    .json({ message: "Lab results fetched successfully", data: {} });
};

// View and update the patient's status during treatment
export const updateTreatmentStatusController  = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const { treatmentStatus } = req.body;
  // Logic to update treatment status
  // ...existing code...
  res
    .status(200)
    .json({ message: "Treatment status updated successfully", data: {} });
};
