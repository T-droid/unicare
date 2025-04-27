import { Request, Response } from "express";
import {
  findDepartmentByName,
  saveDepartment,
} from "../../services/departmentService";

export const createDepartment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name } = req.body;
    const deptExists = await findDepartmentByName(name);

    if (deptExists.length > 0) {
      res.status(400).json({ error: "Department already exists" });
      return;
    }

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
