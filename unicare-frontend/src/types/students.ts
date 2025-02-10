import { BaseUser } from "./common";

export interface Student extends BaseUser {
    studentId: string;
    course: string;
    batch: string;
    enrollmentDate: Date;
  }