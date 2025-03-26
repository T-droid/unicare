import { Request, Response } from "express";
import { getDepartments } from "../../services/departmentService";
import { AuthRequest } from "../../middleware/auth";

export const listDepartments = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const departmentLists = await getDepartments();
    res.status(200).json({
      departments: departmentLists,
    });
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error });
      return;
    }
    res.status(500).json({
      error: "Unknown Error occurred",
    });
    return;
  }
};
