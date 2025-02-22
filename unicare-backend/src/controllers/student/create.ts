import { Request, Response } from "express";
import { addStudent } from "../../services/studentService";

export const registerStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = req.body;
    const newStudent = await addStudent(data);
    res.status(201).json({
      message: "Student created successfully",
      data: newStudent,
    });
    return;
  } catch (err) {
    console.error("Error creating student:", err);
    if (err instanceof Error) {
      res.status(400).json({ error: err });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
