import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { db } from "../../db";
import { UserTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { comparePassword, generateToken } from "../../util/password";

// Define JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";

// Explicitly type as Express request handler
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

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
    const { id, email: userEmail, password: hashedPassword, role } = user[0];

    // Compare passwords
    const isValidPassword = await comparePassword(password, hashedPassword);
    if (!isValidPassword) {
      console.log(`User pwd: ${password}`);
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    // Generate JWT token
    const token = generateToken({ id, email: userEmail , role});

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

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
