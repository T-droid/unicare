import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// role ENUM
export const userRoleEnum = pgEnum("user_role", [
  "doctor",
  "nurse",
  "receptionist",
  "lab_technician",
]);

// Departments Table
export const DepartmentsTable = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
});

// Departments Relations
export const DepartmentsTableRelations = relations(
  DepartmentsTable,
  ({ many }) => ({
    users: many(UserTable),
  }),
);

// Users Table
export const UserTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  phone_number: varchar("phone_number", { length: 15 }).notNull().unique(),
  work_id: varchar("work_id", { length: 100 }).notNull().unique(),
  department_id: uuid("department_id").references(() => DepartmentsTable.id, {
    onDelete: "cascade",
  }),
  role: userRoleEnum("role").notNull(),
  email: varchar("email", { length: 70 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

// Users Relations
export const UserTableRelations = relations(UserTable, ({ one }) => ({
  department: one(DepartmentsTable, {
    fields: [UserTable.department_id],
    references: [DepartmentsTable.id],
  }),
}));

// Students Table
export const StudentTable = pgTable("students", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  phone_number: varchar("phone_number", { length: 15 }).unique().notNull(),
});

// Appointments Table
export const AppointmentsTable = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  student_id: uuid("student_id")
    .references(() => StudentTable.id, { onDelete: "cascade" })
    .notNull(),
  doctor_id: uuid("doctor_id")
    .references(() => UserTable.id, { onDelete: "cascade" })
    .notNull(),
  appointment_date: timestamp("appointment_date").notNull(),
  status: varchar("status", { length: 50 }).default("scheduled").notNull(),
});

// Appointments Relations
export const AppointmentsTableRelations = relations(
  AppointmentsTable,
  ({ one }) => ({
    student: one(StudentTable, {
      fields: [AppointmentsTable.student_id],
      references: [StudentTable.id],
    }),
    doctor: one(UserTable, {
      fields: [AppointmentsTable.doctor_id],
      references: [UserTable.id],
    }),
  }),
);

// Students - Appointments Relations
export const StudentTableRelations = relations(StudentTable, ({ many }) => ({
  appointments: many(AppointmentsTable),
}));
