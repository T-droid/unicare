import express, { Request, Response } from "express";
import { createAppointment } from "../../controllers/appointments/appointment controller";

const appointmentRouter = express.Router();

appointmentRouter.post("/", (req: Request, res: Response) => {
  createAppointment(req, res);
});

export default appointmentRouter;
