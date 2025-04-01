import { Request, Response } from "express";
import { bookAppointment } from "../../services/appoinmentService";
import { studentExists, doctorExists } from "../../services/appoinmentService";
export const createAppointment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { regNo, doctorId, date } = req.body;

  try {
    // Check if student exists
    if (!(await studentExists(regNo))) {
      res
        .status(400)
        .json({ error: "Student with this reg_no does not exist" });
      return;
    }

    // Check if doctor exists
    if (!(await doctorExists(doctorId))) {
      res
        .status(400)
        .json({
          error: "Doctor with this ID does not exist or is not a doctor",
        });
      return;
    }

    // Proceed to book the appointment
    const appointment = await bookAppointment(regNo, doctorId, date);

    res.status(201).json(appointment);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};
