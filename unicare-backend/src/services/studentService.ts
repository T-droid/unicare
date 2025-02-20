import { eq } from "drizzle-orm";
import { db } from "../db";
import { StudentTable } from "../db/schema";

export const addStudent = async (payload: any) => {
  // Check if a student with the given reg_no already exists
  const existingStudent = await db
    .select()
    .from(StudentTable)
    .where(eq(StudentTable.reg_no, payload.reg_no));

  if (existingStudent.length > 0) {
    throw new Error("Student with this registration number already exists.");
  }

  // Insert new student if no duplicate found
  return await db.insert(StudentTable).values(payload).returning();
};
