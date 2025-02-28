import { Router } from "express";
import { registerStudent } from "../../controllers/student/create";
import validateRequest from "../../middleware/validateRequest";
import { registerStudentSchema } from "../../validation/studentValidation";
import { listStudents } from "../../controllers/student/list";
const studentRouter = Router();

studentRouter.get("/", listStudents);
studentRouter.post(
  "/register",
  validateRequest(registerStudentSchema),
  registerStudent,
);

export default studentRouter;

/**
 * @swagger
 * /v1/students/register:
 *   post:
 *     summary: Register a new student
 *     description: Adds a new student to the database after validating the request.
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone_number
 *               - reg_no
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               phone_number:
 *                 type: string
 *                 example: "1234567890"
 *               reg_no:
 *                 type: string
 *                 example: "REG12345"
 *               emergency_contact:
 *                 type: string
 *                 example: "0987654321"
 *               special_conditions:
 *                 type: string
 *                 example: "Diabetic and has high blood pressure"
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Bad request (validation error or duplicate registration number)
 *       500:
 *         description: Internal server error
 */
