import { Request, Response } from "express";
import { saveDepartment } from "../../services/departmentService";

export const createDepartment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name } = req.body;
    console.log("name :", name);
    const newDepartment = await saveDepartment({ name });

    res.status(201).json({
      message: "Department created successfully",
      department: newDepartment,
    });
    return;
  } catch (err) {
    console.error("Error creating department:", err);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
