import { UserTable, StudentTable } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { hashPassword } from "../util/password";

export const findUserByEmail = async (email: string) => {
  try {
    return await db.select().from(UserTable).where(eq(UserTable.email, email));
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (id: string) => {
  try {
    return await db.select().from(UserTable).where(eq(UserTable.id, id));
  } catch (error) {
    throw error;
  }
};

export const findStudentByRegNo = async (regNo: string) => {
  try {
    return await db
      .select()
      .from(StudentTable)
      .where(eq(StudentTable.reg_no, regNo));
  } catch (error) {
    throw error;
  }
};

export const saveUser = async (payload: any) => {
  try {
    const hashedPassword = await hashPassword(payload.password);
    return await db
      .insert(UserTable)
      .values({
        ...payload,
        password: hashedPassword,
      })
      .returning({
        id: UserTable.id,
        name: UserTable.name,
        phone_number: UserTable.phone_number,
        work_id: UserTable.phone_number,
        role: UserTable.role,
        email: UserTable.email,
      });
  } catch (error) {
    throw error;
  }
};
