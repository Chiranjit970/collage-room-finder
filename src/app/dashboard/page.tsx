'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useClassroomStore } from '@/lib/store';
import { useAuth } from '@/hooks/useAuth';
import { Classroom } from '@/types';
import ClassroomCard from '@/components/dashboard/ClassroomCard';
import ClassroomModal from '@/components/dashboard/ClassroomModal';
import Filters from '@/components/dashboard/Filters';

export default function DashboardPage() {
  const { user } = useAuth();
  const { setClassrooms, filteredClassrooms, bookClassroom } = useClassroomStore();
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'classrooms'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const classrooms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Classroom[];
      setClassrooms(classrooms);
    });

    return () => unsubscribe();
  }, [setClassrooms]);

  const classrooms = filteredClassrooms();

  const handleBooking = async (timeSlot: string) => {
    if (!user || !selectedClassroom) return;
    try {
      await bookClassroom(selectedClassroom.id, timeSlot, user.id);
      setSelectedClassroom(null);
    } catch (error) {
      console.error('Error booking classroom:', error);
      // TODO: Add proper error handling
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Classrooms</h1>
        <p className="mt-1 text-sm text-gray-500">
          Find and manage available classrooms
        </p>
      </div>

      <div className="mb-6">
        <Filters />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classrooms.map((classroom) => (
          <ClassroomCard
            key={classroom.id}
            classroom={classroom}
            onClick={() => setSelectedClassroom(classroom)}
          />
        ))}
      </div>

      {classrooms.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-500">No classrooms match your filters</p>
        </div>
      )}

      <ClassroomModal
        classroom={selectedClassroom}
        isOpen={!!selectedClassroom}
        onClose={() => setSelectedClassroom(null)}
        onBooking={handleBooking}
      />
    </div>
  );
}
