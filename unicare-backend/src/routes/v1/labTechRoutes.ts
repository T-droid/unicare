import express from "express";
import {
  getLabTestRequests,
  uploadLabTestResults,
} from "../../controllers/LabTech/labTechController";
import validateRequest from "../../middleware/validateRequest";
import {
  getLabTestRequestsSchema,
  uploadLabTestResultsSchema,
} from "../../validation/labTechValidation";

const labTechRouter = express.Router();

/**
 * @swagger
 * /v1/lab-tests:
 *   get:
 *     summary: Get lab test requests assigned by a doctor
 *     tags: [LabTechnician]
 *     parameters:
 *       - in: query
 *         name: doctorId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the doctor
 *     responses:
 *       200:
 *         description: List of lab test requests
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
labTechRouter.get(
  "/lab-tests",
  validateRequest(getLabTestRequestsSchema),
  getLabTestRequests,
);

/**
 * @swagger
 * /v1/lab-tests/results:
 *   post:
 *     summary: Upload lab test results for a student
 *     tags: [LabTechnician]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - testId
 *               - results
 *             properties:
 *               studentId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               testId:
 *                 type: string
 *                 format: uuid
 *                 example: "987e6543-e89b-21d3-a456-426614174111"
 *               results:
 *                 type: string
 *                 example: "Blood test results: Normal"
 *     responses:
 *       201:
 *         description: Lab test results uploaded successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
labTechRouter.post(
  "/lab-tests/results",
  validateRequest(uploadLabTestResultsSchema),
  uploadLabTestResults,
);

export default labTechRouter;
