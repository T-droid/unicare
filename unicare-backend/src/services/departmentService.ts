import { eq } from "drizzle-orm";
import { db } from "../db";
import { DepartmentsTable, UserTable } from "../db/schema";

export const findDepartmentByName = async (departmentName: string) => {
  return await db
    .select()
    .from(DepartmentsTable)
    .where(eq(DepartmentsTable.name, departmentName));
};

export const saveDepartment = async (payload: any) => {
  return await db.insert(DepartmentsTable).values(payload).returning();
};

export const getDepartments = async () => {
  return await db.select().from(DepartmentsTable);
};
