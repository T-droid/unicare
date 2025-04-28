import { Request, Response } from "express";
import { getStudentByregNo } from "../../services/studentService";
import { validateCreateLabResults } from "../../validation/labTechValidation";
import {
  createLabResultsInDB,
  getAllTestRequestsFromDB,
  getLabTechTestRequestsFromDB,
} from "../../services/labTechService";
import { CustomError } from "../../util/customerError";

export const createLabResults = async (
  req: Request & { user?: { role: string; id: string | null } },
  res: Response,
) => {
  const { labResult } = req.body;
  let { regNo } = req.params;
  console.log("regNo", regNo);

  regNo = decodeURIComponent(regNo);

  const { role, id } = req.user || {};
  if (role !== "lab_technician") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    // Validate the lab results adn regNo
    const { error } = validateCreateLabResults.validate({ regNo, labResult });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the student exists
    const student = await getStudentByregNo(regNo);
    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Logic to create lab results
    const result = await createLabResultsInDB(labResult, id as string, regNo);
    if (result.length === 0) {
      return res.status(400).json({ message: "Failed to create lab results" });
    }
    return res.status(201).json({
      message: "Lab results created successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getLabTechTestRequests = async (
  req: Request & { user?: { role: string; id: string | null } },
  res: Response,
) => {
  const { role, id } = req.user || {};
  if (role !== "lab_technician") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    // Logic to get lab test requests for the lab technician
    const testRequests = await getLabTechTestRequestsFromDB(id as string);

    if (testRequests.length === 0) {
      return res.status(207).json({ message: "No lab test requests found" });
    }

    return res.status(200).json({
      message: "Lab test requests fetched successfully",
      data: testRequests,
    });
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};

export const getAllTestRequests = async (
  req: Request & { user?: { role: string; id: string | null } },
  res: Response,
) => {
  const { role } = req.user || {};
  if (role !== "lab_technician") {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  try {
    const testRequests = await getAllTestRequestsFromDB();
    if (testRequests.length === 0) {
      return res.status(207).json({ message: "No lab test requests found" });
    }
    return res.status(200).json({
      message: "Lab test requests fetched successfully",
      data: testRequests,
    });
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};
