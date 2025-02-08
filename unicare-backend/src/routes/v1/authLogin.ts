import { Router } from "express";
import { loginUser } from "../../controllers/user/loginUser";

const authLogin = Router();

authLogin.post("/login", loginUser);

export default authLogin;