import { Request, Response } from "express";
import { findAllUsers } from "../../services/userService";
import { User } from "../../types/userTypes";

export const getUsers = (req: Request, res: Response) => {
  findAllUsers()
    .then((result: any) => {
      res.status(200).json({
        message: "Users fetched successfully",
        err: false,
        data: result,
      });
    })
    .catch((err: any) => {
      res.status(500).json({
        message: "Error fetching users",
        err: true,
        data: err,
      });
    });
};
