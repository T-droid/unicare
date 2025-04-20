import express, { Request, Response } from "express";
import {
  assignPatientRoom,
  dischargePatient,
  getRooms,
  getStudent,
} from "../../controllers/receptionist/receptionistController";
import validateRequest from "../../middleware/validateRequest";
import { receptionistSchema } from "../../validation/receptionist";

const receptionistRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Receptionist
 *   description: Receptionist management routes
 */

/**
 * @swagger
 * /v1/receptionist/student/{regNo}:
 *   get:
 *     summary: Get student details by registration number
 *     tags: [Receptionist]
 *     parameters:
 *       - in: path
 *         name: regNo
 *         schema:
 *           type: string
 *         required: true
 *         description: Registration number of the student
 *     responses:
 *       200:
 *         description: Student details retrieved successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/receptionist/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Receptionist]
 *     responses:
 *       200:
 *         description: List of rooms retrieved successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/receptionist/room:
 *   post:
 *     summary: Assign a room to a patient
 *     tags: [Receptionist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               regNo:
 *                 type: string
 *                 description: Registration number of the student
 *               roomId:
 *                 type: string
 *                 description: ID of the room to assign
 *     responses:
 *       200:
 *         description: Room assigned successfully
 *       404:
 *         description: Room or student not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update room details for a patient
 *     tags: [Receptionist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               regNo:
 *                 type: string
 *                 description: Registration number of the student
 *               roomId:
 *                 type: string
 *                 description: ID of the new room
 *     responses:
 *       200:
 *         description: Room details updated successfully
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Discharge a patient and reassign their room
 *     tags: [Receptionist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               regNo:
 *                 type: string
 *                 description: Registration number of the student
 *     responses:
 *       201:
 *         description: Patient discharged successfully
 *       500:
 *         description: Failed to reassign room or internal server error
 */

receptionistRouter
  .get(
    "/student/:regNo",
    validateRequest(receptionistSchema),
    (req: Request, res: Response) => {
      getStudent(req, res);
    },
  )
  .get(
    "/rooms",
    validateRequest(receptionistSchema),
    (req: Request, res: Response) => {
      getRooms(req, res);
    },
  )
  .post(
    "/room",
    validateRequest(receptionistSchema),
    (req: Request, res: Response) => {
      assignPatientRoom(req, res);
    },
  )
  .patch(
    "/room",
    validateRequest(receptionistSchema),
    (req: Request, res: Response) => {
      res.send("receptionist updates student room details");
    },
  )
  .delete(
    "/room",
    validateRequest(receptionistSchema),
    (req: Request, res: Response) => {
      dischargePatient(req, res);
    },
  );

export default receptionistRouter;
