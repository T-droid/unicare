import { Request, Response } from "express";
import { bookAppointment } from "../../services/appoinmentService";
import { appointmentSchema } from "../../validation/appointmentValidation";

export const createAppointment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Validate request body using Joi
  const { error } = appointmentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({ errors: error.details.map((err) => err.message) });
    return;
  }

  // Extract validated data
  const { studentId, doctorId, date, time } = req.body;

  try {
    // Call service function to book appointment
    const appointment = await bookAppointment(studentId, doctorId, date, time);

    // Send success response
    res.status(201).json(appointment);
  } catch (err) {
    // Typecast `err` as `Error` before accessing `message`
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res
      .status(500)
      .json({ message: "Something went wrong", error: errorMessage });
  }
};
