import { BaseUser } from "./common";

export interface Staff extends BaseUser {
    department: string;
    specialization?: string;
    joinDate: Date;
  }