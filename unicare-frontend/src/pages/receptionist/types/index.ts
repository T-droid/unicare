
export interface Student {
    id: string;
    name: string;
    studentId: string;
    course: string;
    yearOfStudy?: number;
  }
  
  export interface Patient extends Partial<Student> {
    id: string;
    studentId: string;
    patientId: string;
    status: 'Waiting' | 'Ready' | 'In Treatment' | 'Pending Discharge' | 'Discharged';
    assignedTo?: string;
    type?: 'Outpatient' | 'Inpatient';
    room?: string;  // Optional as only inpatients have rooms
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
    type: 'Ward' | 'Private';
    status: 'Available' | 'Occupied' | 'Maintenance';
    currentPatientId?: string;
  }