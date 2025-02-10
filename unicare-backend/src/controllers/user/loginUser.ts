import { Request, Response } from "express";
import bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { db } from "../../config/drizzle/db";
import { UserTable } from "../../config/drizzle/schema";
import { eq } from "drizzle-orm";

// Define JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Explicitly type as Express request handler
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Fetch user from the database
        const user = await db.select().from(UserTable).where(eq(UserTable.email, email));

        if (user.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Extract user details
        const { id, email: userEmail, password: hashedPassword } = user[0];

        // Compare passwords
        const isValidPassword = await bcrypt.compare(password, hashedPassword);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            data: user,
            token
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
