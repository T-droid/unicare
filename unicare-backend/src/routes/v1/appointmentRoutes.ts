import express from "express";
import { createAppointment } from "../controllers/appointmentController";

const router = express.Router();

router.post("/appointments", createAppointment);

export default router;
