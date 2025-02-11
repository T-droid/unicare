import { eq } from "drizzle-orm";
import { db } from "../db";
import { DepartmentsTable, UserTable } from "../db/schema";

export const findDepartmentByName = async (departmentName: string) => {
  try {
    return await db
      .select()
      .from(DepartmentsTable)
      .where(eq(DepartmentsTable.name, departmentName));
  } catch (error) {
    throw error;
  }
};

export const saveDepartment = async (payload: any) => {
  try {
    return await db.insert(DepartmentsTable).values(payload).returning();
  } catch (error) {
    throw error;
  }
};
