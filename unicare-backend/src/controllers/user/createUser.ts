import { Request, Response } from "express";

export const createUser = (req: Request, res: Response) => {
  const userData = req.body;
  res.status(201).json({ message: "User created", user: userData });
};
