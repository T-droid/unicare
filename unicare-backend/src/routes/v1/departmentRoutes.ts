import { createDepartment } from "../../controllers/department/create";
import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { createDeptSchema } from "../../validation/departmentValidation";
import { listDepartments } from "../../controllers/department/list";
import { authenticateUser } from "../../middleware/auth";
const departmentRouter = Router();

departmentRouter.post(
  "/create",
  validateRequest(createDeptSchema),
  createDepartment,
);

departmentRouter.get("/", authenticateUser, listDepartments);
export default departmentRouter;

/**
 * @swagger
 * /v1/departments/create:
 *   post:
 *     summary: Create a new department
 *     description: Creates a department with a unique name.
 *     tags:
 *       - Departments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 200
 *                 example: Cardiology
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Validation error (e.g., name already exists)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/departments:
 *   get:
 *     summary: Retrieve a list of departments
 *     description: Fetches all available departments from the database.
 *     tags:
 *       - Departments
 *     responses:
 *       200:
 *         description: A list of departments retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 departments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Computer Science"
 *                       description:
 *                         type: string
 *                         example: "Department focused on computing and programming."
 *       400:
 *         description: Bad request error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unknown Error occurred"
 */
