import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { db } from "../../db";
import { UserTable } from "../../db/schema";
import { eq } from "drizzle-orm";

// Define JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Explicitly type as Express request handler
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  try {
    // Fetch user from the database
    const user = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email));

    if (user.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Extract user details
    const { id, email: userEmail, password: hashedPassword } = user[0];

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if (!isValidPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true , sameSite: "none", secure: false });

    res.status(200).json({
      data: user[0], // return one user since it return an Array
      token,
    });
    console.log(res);
    
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
