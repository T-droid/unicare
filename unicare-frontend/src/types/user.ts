export interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'doctor' | 'pharmacist' | 'labtech' | 'receptionist';
  }
  
  export interface Staff extends User {
    department?: string;
    phone?: string;
  }
  