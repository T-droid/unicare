import { UserTable, StudentTable, StaffTable } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { hashPassword } from "../util/password";
import { Staff, User } from "../types/userTypes";
import { UUIDTypes } from "uuid";

export const findUserByEmail = async (email: string) => {
  return await db.select().from(UserTable).where(eq(UserTable.email, email));
};

export const findUserById = async (id: string) => {
  return await db.select().from(UserTable).where(eq(UserTable.id, id));
};

export const findStudentByRegNo = async (regNo: string) => {
  return await db
    .select()
    .from(StudentTable)
    .where(eq(StudentTable.reg_no, regNo));
};

export const findAllUsers = async () => {
  // return all users but omit password field from the response

  return await db
    .select({
      id: UserTable.id,
      name: UserTable.name,
      phone_number: UserTable.phone_number,
      work_id: UserTable.work_id,
      role: UserTable.role,
      email: UserTable.email,
    })
    .from(UserTable);
};

export const saveUser = async (payload: User) => {
  const hashedPassword = await hashPassword(payload.password);
  console.log("payload", payload);

  return await db
    .insert(UserTable)
    .values({
      ...payload,
      password: hashedPassword,
    })
    .returning({
      id: UserTable.id,
      department_id: UserTable.department_id,
      name: UserTable.name,
      phone_number: UserTable.phone_number,
      work_id: UserTable.work_id,
      role: UserTable.role,
      email: UserTable.email,
    });
};

export const createStaff = async (payload: Staff) => {
  return await db.insert(StaffTable).values(payload).returning({
    department_id: StaffTable.department_id,
  });
};

export const deleteUserById = async (userId: string): Promise<void> => {
  await db.delete(UserTable).where(eq(UserTable.id, userId));
};
