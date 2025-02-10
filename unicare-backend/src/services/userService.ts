import { UserTable } from "../config/drizzle/schema";
import { db } from "../config/drizzle/db";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email: string) => {
  try {
    return await db.select().from(UserTable).where(eq(UserTable.email, email));
  } catch (error) {
    throw error;
  }
};

export const saveUser = async (payload: any) => {
  try {
    return await db.insert(UserTable).values(payload).returning();
  } catch (error) {
    throw error;
  }
};
