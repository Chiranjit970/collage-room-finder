import { create } from 'zustand';
import { Classroom } from '@/types';
import { 
  doc, 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';

interface ClassroomStore {
  classrooms: Classroom[];
  selectedTimeSlot: string | null;
  selectedEquipment: string[];
  selectedStatus: 'free' | 'occupied' | null;
  isLoading: boolean;
  error: string | null;
  setClassrooms: (classrooms: Classroom[]) => void;
  setSelectedTimeSlot: (timeSlot: string | null) => void;
  setSelectedEquipment: (equipment: string[]) => void;
  setSelectedStatus: (status: 'free' | 'occupied' | null) => void;
  bookClassroom: (classroomId: string, timeSlot: string, userId: string) => Promise<void>;
  addClassroom: (classroom: Omit<Classroom, 'id'>) => Promise<void>;
  updateClassroom: (id: string, updates: Partial<Classroom>) => Promise<void>;
  deleteClassroom: (id: string) => Promise<void>;
  filteredClassrooms: () => Classroom[];
}

export const useClassroomStore = create<ClassroomStore>((set, get) => ({
  classrooms: [],
  selectedTimeSlot: null,
  selectedEquipment: [],
  selectedStatus: null,
  isLoading: false,
  error: null,

  setClassrooms: (classrooms) => set({ classrooms }),
  setSelectedTimeSlot: (timeSlot) => set({ selectedTimeSlot: timeSlot }),
  setSelectedEquipment: (equipment) => set({ selectedEquipment: equipment }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),

  bookClassroom: async (classroomId, timeSlot, userId) => {
    set({ isLoading: true, error: null });
    try {
      await updateDoc(doc(db, 'classrooms', classroomId), {
        [`schedule.${timeSlot}`]: {
          isOccupied: true,
          bookedBy: userId,
          bookedAt: new Date().toISOString(),
        },
      });
      // State will be updated by the Firestore listener
    } catch (error) {
      set({ error: 'Failed to book classroom' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  addClassroom: async (classroom) => {
    set({ isLoading: true, error: null });
    try {
      const timeSlots = [
        '8:00 AM - 9:00 AM',
        '9:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '12:00 PM - 1:00 PM',
        '1:00 PM - 2:00 PM',
        '2:00 PM - 3:00 PM',
        '3:00 PM - 4:00 PM',
        '4:00 PM - 5:00 PM',
      ];

      const schedule = timeSlots.reduce((acc, slot) => ({
        ...acc,
        [slot]: { isOccupied: false },
      }), {});

      await addDoc(collection(db, 'classrooms'), {
        ...classroom,
        schedule,
        status: 'free',
        createdAt: new Date().toISOString(),
      });
      // State will be updated by the Firestore listener
    } catch (error) {
      set({ error: 'Failed to add classroom' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateClassroom: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      await updateDoc(doc(db, 'classrooms', id), updates);
      // State will be updated by the Firestore listener
    } catch (error) {
      set({ error: 'Failed to update classroom' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteClassroom: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteDoc(doc(db, 'classrooms', id));
      // State will be updated by the Firestore listener
    } catch (error) {
      set({ error: 'Failed to delete classroom' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  filteredClassrooms: () => {
    const { classrooms, selectedTimeSlot, selectedEquipment, selectedStatus } = get();

    return classrooms.filter((classroom) => {
      // Filter by time slot
      if (selectedTimeSlot && classroom.schedule[selectedTimeSlot]?.some((slot) => slot.isOccupied)) {
        return false;
      }

      // Filter by equipment
      if (selectedEquipment.length > 0 && !selectedEquipment.every((eq) => classroom.equipment.includes(eq))) {
        return false;
      }

      // Filter by status
      if (selectedStatus && classroom.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  },
}));
