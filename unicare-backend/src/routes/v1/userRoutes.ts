import { Router } from "express";
import { getUsers } from "../../controllers/user/allUsers";
import validateRequest from "../../middleware/validateRequest";
import * as userValidator from "../../validation/userValidation";
import { loginUser } from "../../controllers/user/loginUser";
import { registerUser } from "../../controllers/user/createUser";

const userRouter = Router();

userRouter.get("", getUsers);

userRouter.post(
  "/register",
  validateRequest(userValidator.registerSchema), // pass kwa middleware kuvalidate data
  registerUser,
);

userRouter.post(
  "/login",
  validateRequest(userValidator.loginSchema),
  loginUser,
);

export default userRouter;

/**
 * @swagger
 * /v1/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided details.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone_number
 *               - email
 *               - password
 *               - work_id
 *               - department
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 40
 *                 example: John Doe
 *               phone_number:
 *                 type: string
 *                 minLength: 9
 *                 maxLength: 13
 *                 example: "1234567890"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 5
 *                 example: secret123
 *               work_id:
 *                 type: string
 *                 example: EMP12345
 *               department:
 *                 type: string
 *                 example: Cardiology
 *               role:
 *                 type: string
 *                 enum: [doctor, nurse, receptionist, lab_technician]
 *                 example: doctor
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /v1/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns an access token.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 30
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: secretpassword
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
