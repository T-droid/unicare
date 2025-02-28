import express, { Response, Request } from "express";

const labTechRouter = express.Router();

labTechRouter.post("/", (req: Request, res: Response) => {
  res.send("lab tech adds test results");
});
