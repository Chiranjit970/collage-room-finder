export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  department?: string;
  collegeId?: string;
}

export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  status: 'free' | 'occupied';
  schedule: {
    [key: string]: {
      isOccupied: boolean;
      occupiedBy?: string;
      startTime: string;
      endTime: string;
    }[];
  };
}

export type TimeSlot = 'morning' | 'afternoon' | 'evening';
