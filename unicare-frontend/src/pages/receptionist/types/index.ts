
export interface Student {
    id: string;
    name: string;
    studentId: string;
    course: string;
    yearOfStudy: number;
  }
  
  export interface Patient {
    id: String;
    studentId: string;
    name: string;
    status: 'Waiting' | 'In Treatment' | 'Pending Discharge';
    assignedTo: string;
    type: 'Outpatient' | 'Inpatient';
    room?: string;  // Optional as only inpatients have rooms
  }
  
  export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    availability: boolean;
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