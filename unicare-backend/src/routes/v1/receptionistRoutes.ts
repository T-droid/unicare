import express, { Request, Response } from "express";
import { assignPatientRoom, getStudent } from "../../controllers/receptionist/receptionistController";

const receptionistRouter = express.Router();

receptionistRouter
  .get("/", (req: Request, res: Response) => {
    getStudent(req, res);
  })
  .post("/", (req: Request, res: Response) => {
    assignPatientRoom(req, res);
  })
  .patch("/", (req: Request, res: Response) => {
    res.send("receptionist updates student room details");
  })
  .delete("/", (req: Request, res: Response) => {
    res.send("receptionist deletes room assignment");
  });

export default receptionistRouter;
