import { Router } from "express";
import { getUsers } from "../../controllers/user/allUsers";
import { createUser } from "../../controllers/user/createUser";
import validateRequest from "../../middleware/validateRequest";
import * as userValidator from "../../validation/userValidation";

const userRouter = Router();

userRouter.get("", getUsers);

userRouter.post(
  "/create",
  validateRequest(userValidator.registerSchema), // pass kwa middleware kuvalidate data
  createUser,
);
export default userRouter;
