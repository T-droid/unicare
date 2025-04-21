import { eq, sql, ilike } from "drizzle-orm";
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

export const getStudents = async (
  filters: Record<string, any>,
  offset?: number,
  limit?: number,
) => {
  let query = db.select().from(StudentTable);
  if (filters.reg_no) {
    query.where(ilike(StudentTable.reg_no, `%${filters.reg_no}%`));
  }
  if (filters.name) {
    query.where(ilike(StudentTable.name, `%${filters.name}%`));
  }

  if (limit && offset) {
    query.limit(limit).offset(offset);
  }
  const studentsList = await query;
  const total = await db
    .select({ count: sql<number>`count(*)` })
    .from(StudentTable)
    .then((res) => res[0]?.count || 0);

  return { students: studentsList, total };
};

export const getStudentByregNo = async (reg_no: string) => {
  return await db
    .select()
    .from(StudentTable)
    .where(eq(StudentTable.reg_no, reg_no));
};

