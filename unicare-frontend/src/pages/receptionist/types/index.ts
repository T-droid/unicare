
export interface Student {
    id: string;
    name: string;
    reg_no: string;
    course: string;
    yearOfStudy?: number;
  }
  
  export interface Patient extends Partial<Student> {
    student_details: any;
    doctor_details: any;
    id: string;
    reg_no: string;
    patientId: string;
    appointment_date: Date
    status: 'Waiting' | 'Ready' | 'In Treatment' | 'Pending Discharge' | 'Discharged';
    assignedTo?: string;
    type?: 'Outpatient' | 'Inpatient';
    room?: string;  
  }
  
  export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    availability: boolean;
    department: string;
  }
  
  export interface Appointment {
    id: string;
    patientId: string;
    doctorId: string;
    date: string;
    time: string;
    status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
    type: 'Regular' | 'Emergency';
  }
  
  export interface Room {
    id: string;
    number: string;
    name: String
    available_beds: number;
    total_beds: number;
    type: 'Ward' | 'Private';
    status: 'Available' | 'Occupied' | 'Maintenance';
    currentPatientId?: string;
  }