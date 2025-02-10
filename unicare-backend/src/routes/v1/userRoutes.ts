import { Router } from "express";
import { getUsers } from "../../controllers/user/allUsers";
import { createUser } from "../../controllers/user/createUser";
import validateRequest from "../../middleware/validateRequest";
import * as userValidator from "../../validation/userValidation";
import { loginUser } from "../../controllers/user/loginUser";

const userRouter = Router();

userRouter.get("", getUsers);

userRouter.post(
  "/create",
  validateRequest(userValidator.registerSchema), // pass kwa middleware kuvalidate data
  createUser,
);

userRouter.post(
  "/login",
  validateRequest(userValidator.loginSchema),
  loginUser,
);

export default userRouter;
