CREATE TYPE "public"."status" AS ENUM('pending', 'in session', 'done');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('doctor', 'nurse', 'receptionist', 'lab_technician');--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reg_no" varchar(15) NOT NULL,
	"doctor_id" uuid NOT NULL,
	"appointment_date" timestamp NOT NULL,
	"status" "status" DEFAULT 'pending'
);
--> statement-breakpoint
CREATE TABLE "departments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drugs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inpatients" (
	"reg_no" varchar(15),
	"room_id" uuid,
	"admission_date" timestamp DEFAULT now(),
	"discharge_date" timestamp,
	CONSTRAINT "inpatients_reg_no_room_id_pk" PRIMARY KEY("reg_no","room_id")
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"available_beds" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "medical_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reg_no" varchar(15) NOT NULL,
	"prescription" varchar(400),
	"prescribed_by_id" uuid,
	"lab_results" varchar(400),
	"tested_by_id" uuid,
	"doctor_recommendation" varchar(400)
);
--> statement-breakpoint
CREATE TABLE "students" (
	"name" varchar(200) NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"reg_no" varchar(15) PRIMARY KEY NOT NULL,
	CONSTRAINT "students_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "students_reg_no_unique" UNIQUE("reg_no")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"work_id" varchar(100) NOT NULL,
	"department_id" uuid NOT NULL,
	"role" "user_role" NOT NULL,
	"email" varchar(70) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "users_work_id_unique" UNIQUE("work_id")
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_reg_no_students_reg_no_fk" FOREIGN KEY ("reg_no") REFERENCES "public"."students"("reg_no") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_users_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inpatients" ADD CONSTRAINT "inpatients_reg_no_students_reg_no_fk" FOREIGN KEY ("reg_no") REFERENCES "public"."students"("reg_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inpatients" ADD CONSTRAINT "inpatients_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medical_records" ADD CONSTRAINT "medical_records_reg_no_students_reg_no_fk" FOREIGN KEY ("reg_no") REFERENCES "public"."students"("reg_no") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "medical_records" ADD CONSTRAINT "medical_records_prescribed_by_id_users_id_fk" FOREIGN KEY ("prescribed_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medical_records" ADD CONSTRAINT "medical_records_tested_by_id_users_id_fk" FOREIGN KEY ("tested_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;