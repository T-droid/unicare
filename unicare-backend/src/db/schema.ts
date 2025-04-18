import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
  text,
} from "drizzle-orm/pg-core";

// role ENUM
export const userRoleEnum = pgEnum("user_role", [
  "doctor",
  "nurse",
  "receptionist",
  "lab_technician",
  "admin",
]);
export const appontmentStatus = pgEnum("status", [
  "pending",
  "in session",
  "done",
]);

// Patient Type ENUM
export const patientTypeEnum = pgEnum("patient_type", [
  "inpatient",
  "outpatient",
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
  department_id: uuid("department_id")
    .notNull()
    .references(() => DepartmentsTable.id, {
      onDelete: "cascade",
    }),
  role: userRoleEnum("role").notNull(),
  email: varchar("email", { length: 70 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

// Users Relations
export const UserTableRelations = relations(UserTable, ({ one, many }) => ({
  department: one(DepartmentsTable, {
    fields: [UserTable.department_id],
    references: [DepartmentsTable.id],
  }),
  medical_records: many(PatientMedicalRecords),
}));

// Students Table
export const StudentTable = pgTable("students", {
  name: varchar("name", { length: 200 }).notNull(),
  phone_number: varchar("phone_number", { length: 15 }).unique().notNull(),
  reg_no: varchar("reg_no", { length: 15 }).unique().notNull().primaryKey(),
  emergency_contact: varchar("emergency_contact", { length: 15 }), // Optional emergency contact
  special_conditions: text("special_conditions"),
});

// Students  Relations
export const StudentTableRelations = relations(StudentTable, ({ many }) => ({
  patients: many(PatientsTable),
}));

// Patients Table
export const PatientsTable = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  reg_no: varchar("reg_no", { length: 15 })
    .references(() => StudentTable.reg_no, { onDelete: "cascade" })
    .notNull(),
  patient_type: patientTypeEnum("patient_type").notNull(),
  admission_date: timestamp("admission_date").defaultNow(),
  discharge_date: timestamp("discharge_date"),
});

// Patients Relations
export const PatientsTableRelations = relations(
  PatientsTable,
  ({ one, many }) => ({
    student: one(StudentTable, {
      fields: [PatientsTable.reg_no],
      references: [StudentTable.reg_no],
    }),
    appointments: many(AppointmentsTable),
    medical_records: many(PatientMedicalRecords),
  }),
);

// Appointments Table
export const AppointmentsTable = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  reg_no: varchar("reg_no", { length: 15 })
    .references(() => PatientsTable.reg_no, { onDelete: "cascade" })
    .notNull(),
  doctor_id: uuid("doctor_id")
    .references(() => UserTable.id, { onDelete: "cascade" })
    .notNull(),
  appointment_date: timestamp("appointment_date").notNull(),
  status: appontmentStatus("status").default("pending"),
});

// Appointments Relations
export const AppointmentsTableRelations = relations(
  AppointmentsTable,
  ({ one }) => ({
    patient: one(PatientsTable, {
      fields: [AppointmentsTable.reg_no],
      references: [PatientsTable.reg_no],
    }),
    doctor: one(UserTable, {
      fields: [AppointmentsTable.doctor_id],
      references: [UserTable.id],
    }),
  }),
);

// student medical records table
export const PatientMedicalRecords = pgTable("medical_records", {
  id: uuid("id").defaultRandom().primaryKey(),
  reg_no: varchar("reg_no", { length: 15 })
    .notNull()
    .references(() => PatientsTable.reg_no, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  prescription: varchar("prescription", { length: 400 }),
  prescribed_by_id: uuid("prescribed_by_id").references(() => UserTable.id),
  lab_results: varchar("lab_results", { length: 400 }),
  tested_by_id: uuid("tested_by_id").references(() => UserTable.id),
  doctor_recommendation: varchar("doctor_recommendation", { length: 400 }),
});

// medical records relations
export const PatientMedicalRecordsRelations = relations(
  PatientMedicalRecords,
  ({ one }) => ({
    patient: one(PatientsTable, {
      fields: [PatientMedicalRecords.reg_no],
      references: [PatientsTable.reg_no],
    }),
    prescribing_doctor: one(UserTable, {
      fields: [PatientMedicalRecords.prescribed_by_id],
      references: [UserTable.id],
    }),
    lab_technician: one(UserTable, {
      fields: [PatientMedicalRecords.tested_by_id],
      references: [UserTable.id],
    }),
  }),
);

// rooms tabel
export const RoomsTable = pgTable("rooms", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  available_beds: integer("available_beds").default(0),
});

// inpatients table relations
export const RoomsTableRelations = relations(RoomsTable, ({ many }) => ({
  inpatients: many(InpatientTable),
}));

// inpatients table
export const InpatientTable = pgTable(
  "inpatients",
  {
    reg_no: varchar("reg_no", { length: 15 }).references(
      () => PatientsTable.reg_no,
    ),
    room_id: uuid("room_id").references(() => RoomsTable.id),
    admission_date: timestamp("admission_date").defaultNow(),
    discharge_date: timestamp("discharge_date"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.reg_no, table.room_id] }),
    };
  },
);

// inpatients table relations
export const InpatientTableRelations = relations(InpatientTable, ({ one }) => ({
  room: one(RoomsTable, {
    fields: [InpatientTable.room_id],
    references: [RoomsTable.id],
  }),
  patient: one(PatientsTable, {
    fields: [InpatientTable.reg_no],
    references: [PatientsTable.reg_no],
  }),
}));

// drugs table
export const DrugsTable = pgTable("drugs", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  quantity: integer("quantity").notNull(),
});
