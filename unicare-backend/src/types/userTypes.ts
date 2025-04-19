import { StaffTable, UserTable } from "../db/schema";

export type User = typeof UserTable.$inferInsert;
export type Staff = typeof StaffTable.$inferInsert;
