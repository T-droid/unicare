import { eq } from "drizzle-orm";
import { db } from "../config/drizzle/db";
import { DepartmentsTable, UserTable } from "../config/drizzle/schema";

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

export const createDepartment = async (payload: any) => {
  try {
    return await db.insert(UserTable).values(payload);
  } catch (error) {
    throw error;
  }
};
