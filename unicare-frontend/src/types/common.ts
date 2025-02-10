export interface BaseUser {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    status: 'active' | 'inactive';
  }