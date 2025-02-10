import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { jwtConfig } from "../config/config";

export const hashPassword = async(password: string): Promise<string> => {
    const result = bcrypt.hash(password, 10);
    return result;
};

export const comparePassword = async(passwordProvided: string, storedPassword: string): Promise<boolean> => {
    const result = await bcrypt.compare(passwordProvided, storedPassword);
    return result;
}

export const  generateToken = (user: { id: string; email: string; role: string }) : string => {
    return jwt.sign(
      { id: user.id, email: user.email, role:user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiry }
    );
}