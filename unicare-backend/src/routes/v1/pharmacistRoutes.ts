import express, { Request, Response } from "express";
import {
  createDrug,
  listDrugs,
  handleAdministerDrug,
} from "../../controllers/pharmacist/pharmacyController";
import validateRequest from "../../middleware/validateRequest";
import {
  drugSchema,
  administerDrugSchema,
} from "../../validation/pharmacistValidation";
import authenticateUser from "../../middleware/auth";

const pharmacistRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Pharmacist
 *   description: Pharmacist drug management
 */

/**
 * @swagger
 * /v1/drug/add:
 *   post:
 *     summary: Add a new drug
 *     tags: [Pharmacist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Paracetamol"
 *               quantity:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Drug added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 name:
 *                   type: string
 *                   example: "Paracetamol"
 *                 quantity:
 *                   type: integer
 *                   example: 100
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "\"name\" is required"
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "name"
 *       401:
 *         description: Unauthorized
 */
pharmacistRouter.post(
  "/add",
  authenticateUser,
  validateRequest(drugSchema),
  (req: Request, res: Response) => {
    createDrug(req, res);
  },
);

/**
 * @swagger
 * /v1/drug/list:
 *   get:
 *     summary: Get all available drugs
 *     tags: [Pharmacist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of drugs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   name:
 *                     type: string
 *                     example: "Paracetamol"
 *                   quantity:
 *                     type: integer
 *                     example: 100
 *       401:
 *         description: Unauthorized
 */
pharmacistRouter.get(
  "/list",
  authenticateUser,
  (req: Request, res: Response) => {
    listDrugs(req, res);
  },
);

/**
 * @swagger
 * /v1/drug/administer:
 *   post:
 *     summary: Administer a drug (reduce stock)
 *     tags: [Pharmacist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Paracetamol"
 *               amount:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Drug stock updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 name:
 *                   type: string
 *                   example: "Paracetamol"
 *                 quantity:
 *                   type: integer
 *                   example: 95
 *       400:
 *         description: Validation error or server failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server failed to administer drug"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "\"amount\" must be greater than or equal to 1"
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "amount"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 */
pharmacistRouter.post(
  "/administer",
  authenticateUser,
  validateRequest(administerDrugSchema),
  (req: Request, res: Response) => {
    handleAdministerDrug(req, res);
  },
);

export default pharmacistRouter;
