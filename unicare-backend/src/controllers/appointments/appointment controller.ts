import { Request, Response } from "express";
import { bookAppointment } from "../../services/appoinmentService";
import { appointmentSchema } from "../../validation/appointmentValidation";
import { db } from "../../db";
import { StudentTable, UserTable } from "../../db/schema";
import { and, eq } from "drizzle-orm";

export const createAppointment = async (req: Request, res: Response) => {
  // Validate request body using Joi
  const { error } = appointmentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({ errors: error.details.map((err) => err.message) });
    return;
  }

  // Extract validated data
  const { regNo, doctorId, date } = req.body;

  try {
    const studentExists = await db
      .select()
      .from(StudentTable)
      .where(eq(StudentTable.reg_no, regNo));
    if (studentExists.length === 0)
      return res.status(404).json({ message: "Student does not exist" });

    const doctorExists = await db
      .select()
      .from(UserTable)
      .where(and(eq(UserTable.id, doctorId), eq(UserTable.role, "doctor")));
    if (doctorExists.length === 0)
      return res.status(404).json({ message: "Doctors does not exist" });

    // Call service function to book appointment
    const appointment = await bookAppointment(regNo, doctorId, date);

    // Send success response
    res.status(201).json(appointment);
  } catch (err) {
    // Typecast `err` as `Error` before accessing `message`
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return res
      .status(500)
      .json({ message: "Something went wrong", error: errorMessage });
  }
};
