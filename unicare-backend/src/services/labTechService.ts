import { desc, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { labTestRequestTable, UserTable } from "../db/schema";
import { CustomError } from "../util/customerError";

export const createLabResultsInDB = async (
  labResults: string,
  labTechId: string,
  regNo: string,
) => {
  try {
    // Check if lab technician exists
    const labTech = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, labTechId));
    if (labTech.length === 0) {
      throw new CustomError("Lab technician not found", 404);
    }

    // Check if the lab test request exists for the given regNo
    const labTestRequest = await db
      .select()
      .from(labTestRequestTable)
      .where(eq(labTestRequestTable.reg_no, regNo));
    if (labTestRequest.length === 0) {
      throw new CustomError(
        "Lab test request not found for the given registration number",
        404,
      );
    }
    console.log("labeResults", labResults);

    const today = new Date().toISOString().split("T")[0];
    const result = await db
      .update(labTestRequestTable)
      .set({
        test_result: labResults,
        tested_by_id: labTechId,
        test_status: "completed",
        completed_at: new Date(),
      })
      .where(
        sql`DATE(${labTestRequestTable.requested_at}) = ${today} AND ${labTestRequestTable.reg_no} = ${regNo}`,
      )
      .returning();
    return result;
  } catch (error: any) {
    console.error("Error creating lab results:", error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError("Internal server error", 500);
  }
};

export const getLabTechTestRequestsFromDB = async (labTechId: string) => {
  try {
    const testRequests = await db
      .select({
        id: labTestRequestTable.id,
        reg_no: labTestRequestTable.reg_no,
        test_name: labTestRequestTable.test_name,
        test_description: labTestRequestTable.test_description,
        requested_at: labTestRequestTable.requested_at,
        test_status: labTestRequestTable.test_status,
      })
      .from(labTestRequestTable)
      .orderBy(desc(labTestRequestTable.requested_at))
      .where(eq(labTestRequestTable.tested_by_id, labTechId));
    return testRequests;
  } catch (error: any) {
    console.error("Error fetching lab technician test requests:", error);
    throw new CustomError("Internal server error", 500);
  }
};

export const getAllTestRequestsFromDB = async () => {
  try {
    const testRequests = await db
      .select({
        id: labTestRequestTable.id,
        reg_no: labTestRequestTable.reg_no,
        test_name: labTestRequestTable.test_name,
        test_description: labTestRequestTable.test_description,
        requested_at: labTestRequestTable.requested_at,
        test_status: labTestRequestTable.test_status,
      })
      .from(labTestRequestTable)
      .orderBy(desc(labTestRequestTable.requested_at));
    return testRequests;
  } catch (error: any) {
    console.error("Error fetching all test requests:", error);
    throw new CustomError("Internal server error", 500);
  }
};
