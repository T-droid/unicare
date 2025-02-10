import { Request, Response } from "express";
import { DepartmentsTable } from "../../config/drizzle/schema";
import { db } from "../../config/drizzle/db";

export const createDepartment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name } = req.body;

    const [newDepartment] = await db
      .insert(DepartmentsTable)
      .values({ name })
      .returning(); // Returns the inserted row

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
