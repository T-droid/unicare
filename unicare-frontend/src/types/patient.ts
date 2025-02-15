import { Patient } from "@/pages/receptionist/types";


export interface QueuedPatient extends Partial<Patient> {
	time: string;
	reason: string;
	waited: string;
}
