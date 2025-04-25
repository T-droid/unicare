import express, { Request, Response } from "express";
import { getReports } from "../../controllers/reports/reportController";

// import {
//   getDrugUsageReport,
//   getLabTestsReport,
//   getStudentTreatedReport,
//   getRoomOccupancyReport,
// } from "../../controllers/reports/reportController";
// import authenticateUser from "../../middleware/auth";

// // Swagger documentation
// /**
//  * @swagger
//  * tags:
//  *   name: Reports
//  *   description: API for generating various reports
//  */

// /**
//  * @swagger
//  * /v1/reports/prescription:
//  *   get:
//  *     summary: Get prescription report
//  *     tags: [Reports]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: startDate
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Start date for the report (YYYY-MM-DD)
//  *       - in: query
//  *         name: endDate
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: End date for the report (YYYY-MM-DD)
//  *     responses:
//  *       200:
//  *         description: Drug usage report
//  *       207:
//  *         description: No drug usage found for this period
//  *       403:
//  *         description: Unauthorized access
//  *       500:
//  *         description: Internal server error
//  */

// /**
//  * @swagger
//  * /v1/reports/lab-tests:
//  *   get:
//  *     summary: Get lab tests report
//  *     tags: [Reports]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: startDate
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Start date for the report (YYYY-MM-DD)
//  *       - in: query
//  *         name: endDate
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: End date for the report (YYYY-MM-DD)
//  *     responses:
//  *       200:
//  *         description: Lab tests report
//  *       207:
//  *         description: No lab tests found for this period
//  *       403:
//  *         description: Unauthorized access
//  *       500:
//  *         description: Internal server error
//  */

// /**
//  * @swagger
//  * /v1/reports/student-treated:
//  *   get:
//  *     summary: Get student treated report
//  *     tags: [Reports]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: startDate
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Start date for the report (YYYY-MM-DD)
//  *       - in: query
//  *         name: endDate
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: End date for the report (YYYY-MM-DD)
//  *     responses:
//  *       200:
//  *         description: Student treated report
//  *       207:
//  *         description: No students treated during this period
//  *       403:
//  *         description: Unauthorized access
//  *       500:
//  *         description: Internal server error
//  */

// /**
//  * @swagger
//  * /v1/reports/room-occupancy:
//  *   get:
//  *     summary: Get room occupancy report
//  *     tags: [Reports]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: startDate
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Start date for the report (YYYY-MM-DD)
//  *       - in: query
//  *         name: endDate
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: End date for the report (YYYY-MM-DD)
//  *     responses:
//  *       200:
//  *         description: Room occupancy report
//  *       207:
//  *         description: No room occupancy found for this period
//  *       403:
//  *         description: Unauthorized access
//  *       500:
//  *         description: Internal server error
//  */

const reportRouter = express.Router();

// reportRouter.use(authenticateUser);

// reportRouter.get("/prescription", (req: Request, res: Response) => {
//   getDrugUsageReport(req, res);
// });

// reportRouter.get("/lab-tests", (req: Request, res: Response) => {
//   getLabTestsReport(req, res);
// });

// reportRouter.get("/student-treated", (req: Request, res: Response) => {
//   getStudentTreatedReport(req, res);
// });

// reportRouter.get("/room-occupancy", (req: Request, res: Response) => {
//   getRoomOccupancyReport(req, res);
// });


reportRouter.get("", (req: Request, res: Response) => {
    getReports(req, res);
  });

export default reportRouter;

/**
 * @swagger
 * /v1/reports:
 *   get:
 *     summary: Get dashboard data
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dashboardData:
 *                   type: object
 *                   description: Aggregated dashboard data
 *       400:
 *         description: Missing or invalid query parameters
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

