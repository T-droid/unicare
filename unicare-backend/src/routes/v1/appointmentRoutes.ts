import express from "express";
import { createAppointment } from "../../controllers/appointments/appointment controller";

const appointmentRouter = express.Router();

appointmentRouter.post("/appointments", createAppointment);

export default appointmentRouter;
