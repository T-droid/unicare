import { Request, Response } from "express";
import { bookAppointment } from "../../services/appoinmentService";

export const createAppointment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Extract validated data
  const { regNo, doctorId, date } = req.body;

  try {
    // Call service function to book appointment
    const appointment = await bookAppointment(regNo, doctorId, date);

    // Send success response
    res.status(201).json(appointment);
  } catch (err) {
    // Typecast `err` as `Error` before accessing `message`
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};
