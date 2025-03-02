import express from "express";
import { createAppointment } from "../../controllers/appointments/appointment controller";
import validateRequest from "../../middleware/validateRequest";
import { appointmentSchema } from "../../validation/appointmentValidation";
const appointmentRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - doctorId
 *               - date
 *               - time
 *             properties:
 *               patientId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               doctorId:
 *                 type: string
 *                 format: uuid
 *                 example: "987e6543-e89b-21d3-a456-426614174111"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-15"
 *               time:
 *                 type: string
 *                 example: "10:30 AM"
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
appointmentRouter.post(
  "/",
  validateRequest(appointmentSchema),
  createAppointment,
);

export default appointmentRouter;
