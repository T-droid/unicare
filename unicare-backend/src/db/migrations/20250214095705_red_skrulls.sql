ALTER TABLE "appointments" RENAME COLUMN "student_id" TO "reg_no";--> statement-breakpoint
ALTER TABLE "inpatients" RENAME COLUMN "student_id" TO "reg_no";--> statement-breakpoint
ALTER TABLE "medical_records" RENAME COLUMN "student_id" TO "reg_no";--> statement-breakpoint
ALTER TABLE "students" RENAME COLUMN "id" TO "reg_no";--> statement-breakpoint
ALTER TABLE "students" DROP CONSTRAINT "students_regNo_unique";--> statement-breakpoint
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_student_id_students_id_fk";
--> statement-breakpoint
ALTER TABLE "inpatients" DROP CONSTRAINT "inpatients_student_id_students_id_fk";
--> statement-breakpoint
ALTER TABLE "medical_records" DROP CONSTRAINT "medical_records_student_id_students_id_fk";
--> statement-breakpoint
ALTER TABLE "inpatients" DROP CONSTRAINT "inpatients_student_id_room_id_pk";--> statement-breakpoint
ALTER TABLE "inpatients" ADD CONSTRAINT "inpatients_reg_no_room_id_pk" PRIMARY KEY("reg_no","room_id");--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_reg_no_students_reg_no_fk" FOREIGN KEY ("reg_no") REFERENCES "public"."students"("reg_no") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inpatients" ADD CONSTRAINT "inpatients_reg_no_students_reg_no_fk" FOREIGN KEY ("reg_no") REFERENCES "public"."students"("reg_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medical_records" ADD CONSTRAINT "medical_records_reg_no_students_reg_no_fk" FOREIGN KEY ("reg_no") REFERENCES "public"."students"("reg_no") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "regNo";--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_reg_no_unique" UNIQUE("reg_no");