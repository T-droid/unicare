import express from "express";
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

const pharmacistRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Pharmacist
 *   description: Pharmacist drug management
 */

/**
 * @swagger
 * /pharmacist/add:
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
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
pharmacistRouter.post("/add", validateRequest(drugSchema), createDrug);

/**
 * @swagger
 * /pharmacist/list:
 *   get:
 *     summary: Get all available drugs
 *     tags: [Pharmacist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of drugs
 *       401:
 *         description: Unauthorized
 */

pharmacistRouter.get("/list", listDrugs);
/**
 * @swagger
 * /pharmacist/administer:
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
 *               - id
 *               - amount
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               amount:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Drug stock updated
 *       400:
 *         description: Not enough stock or invalid ID
 *       401:
 *         description: Unauthorized
 */

pharmacistRouter.post(
  "/administer",
  validateRequest(administerDrugSchema),
  handleAdministerDrug,
);

export default pharmacistRouter;
