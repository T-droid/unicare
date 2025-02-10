import { createDepartment } from "../../controllers/department/create";
import { Router } from "express";

const departmentRouter = Router();

departmentRouter.post("/create", createDepartment);

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
