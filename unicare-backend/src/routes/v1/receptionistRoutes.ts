import express, { Request, Response } from "express";
import {
  assignPatientRoom,
  getStudent,
} from "../../controllers/receptionist/receptionistController";
import validateRequest from "../../middleware/validateRequest";
import { receptionistSchema } from "../../validation/receptionist";

const receptionistRouter = express.Router();

receptionistRouter
  .get(
    "/",
    validateRequest(receptionistSchema),
    (req: Request, res: Response) => {
      getStudent(req, res);
    },
  )
  .post(
    "/",
    validateRequest(receptionistSchema),
    (req: Request, res: Response) => {
      assignPatientRoom(req, res);
    },
  )
  .patch(
    "/",
    validateRequest(receptionistSchema),
    (req: Request, res: Response) => {
      res.send("receptionist updates student room details");
    },
  )
  .delete("/", (req: Request, res: Response) => {
    res.send("receptionist deletes room assignment");
  });

export default receptionistRouter;
