import express, { Response, Request } from "express";
import {
  createLabResults,
  getLabTechTestRequests,
  getAllTestRequests,
} from "../../controllers/labTech/labTechController";
import authenticateUser from "../../middleware/auth";
import { get } from "http";

const labTechRouter = express.Router();

/**
 * @swagger
 * /v1/lab-tech/lab-results/{regNo}:
 *   post:
 *     summary: Create a lab result for a student
 *     tags:
 *       - Lab Technician
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: regNo
 *         required: true
 *         schema:
 *           type: string
 *         description: Student registration number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - labResult
 *             properties:
 *               labResult:
 *                 type: string
 *                 example: "positive for tb and some other info"
 *     responses:
 *       201:
 *         description: Lab result created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lab result created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     labResult:
 *                       type: string
 *                       example: "positive for tb and some other info"
 *       400:
 *         description: Validation error or failed to create lab result
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /v1/lab-tech/lab-test-requests:
 *   get:
 *     summary: Get all lab test requests for the logged-in lab technician
 *     tags:
 *       - Lab Technician
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lab test requests fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       requestId:
 *                         type: string
 *                         description: Unique identifier for the lab test request
 *                       studentName:
 *                         type: string
 *                         description: Name of the student
 *                       testName:
 *                         type: string
 *                         description: Name of the lab test
 *                       requestedDate:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the lab test was requested
 *                       status:
 *                         type: string
 *                         description: Status of the lab test request
 *       207:
 *         description: No lab test requests found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Informational message
 *       403:
 *         description: Unauthorized access (only lab technicians can access this route)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error details
 */

/**
 * @swagger
 * /v1/lab-tech/all-lab-test-requests:
 *   get:
 *     summary: Get all lab test requests
 *     tags:
 *       - Lab Technician
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lab test requests fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier for the lab test request
 *                       reg_no:
 *                         type: string
 *                         description: Registration number of the student
 *                       test_name:
 *                         type: string
 *                         description: Name of the lab test
 *                       test_description:
 *                         type: string
 *                         description: Description of the lab test
 *                       requested_at:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the lab test was requested
 *                       test_status:
 *                         type: string
 *                         description: Status of the lab test request
 *       207:
 *         description: No lab test requests found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Informational message
 *       403:
 *         description: Unauthorized access (only lab technicians can access this route)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error details
 */

labTechRouter.post(
  "/lab-results/:regNo",
  authenticateUser,
  (req: Request, res: Response) => {
    createLabResults(req, res);
  },
);

labTechRouter.get(
  "/lab-test-requests",
  authenticateUser,
  (req: Request, res: Response) => {
    getLabTechTestRequests(req, res);
  },
);

labTechRouter.get(
  "/all-lab-test-requests",
  authenticateUser,
  (req: Request, res: Response) => {
    getAllTestRequests(req, res);
  },
);

export default labTechRouter;
