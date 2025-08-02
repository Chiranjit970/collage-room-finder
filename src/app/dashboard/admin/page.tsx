'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useClassroomStore } from '@/lib/store';
import { Classroom } from '@/types';
import Button from '@/components/shared/Button';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { classrooms, addClassroom, updateClassroom, deleteClassroom } = useClassroomStore();
  const [isAddingClassroom, setIsAddingClassroom] = useState(false);
  const [newClassroom, setNewClassroom] = useState({
    name: '',
    capacity: 0,
    equipment: [] as string[],
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You need admin access to view this page.</p>
        </div>
      </div>
    );
  }

  const handleAddClassroom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingClassroom(true);

    try {
      await addClassroom({
        name: newClassroom.name,
        capacity: newClassroom.capacity,
        equipment: newClassroom.equipment,
        status: 'free',
        schedule: {},
      });
      toast.success('Classroom added successfully!');
      setNewClassroom({ name: '', capacity: 0, equipment: [] });
    } catch (error) {
      toast.error('Failed to add classroom');
      console.error('Add classroom error:', error);
    } finally {
      setIsAddingClassroom(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage classrooms and bookings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Classroom Management */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900">Add New Classroom</h2>
          <form onSubmit={handleAddClassroom} className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Classroom Name
              </label>
              <input
                type="text"
                id="name"
                value={newClassroom.name}
                onChange={(e) => setNewClassroom({ ...newClassroom, name: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                Capacity
              </label>
              <input
                type="number"
                id="capacity"
                value={newClassroom.capacity}
                onChange={(e) => setNewClassroom({ ...newClassroom, capacity: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
                min={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Equipment</label>
              <div className="mt-2 space-y-2">
                {['computer', 'projector', 'speakers', 'wifi'].map((item) => (
                  <label key={item} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newClassroom.equipment.includes(item)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewClassroom({
                            ...newClassroom,
                            equipment: [...newClassroom.equipment, item],
                          });
                        } else {
                          setNewClassroom({
                            ...newClassroom,
                            equipment: newClassroom.equipment.filter((eq) => eq !== item),
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600"
                    />
                    <span className="ml-2 capitalize">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit" disabled={isAddingClassroom}>
              {isAddingClassroom ? 'Adding...' : 'Add Classroom'}
            </Button>
          </form>
        </div>

        {/* Classroom List */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900">Existing Classrooms</h2>
          <div className="mt-4 space-y-4">
            {classrooms.map((classroom) => (
              <div
                key={classroom.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
              >
                <div>
                  <h3 className="font-medium">{classroom.name}</h3>
                  <p className="text-sm text-gray-500">Capacity: {classroom.capacity}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewClassroom({
                        name: classroom.name,
                        capacity: classroom.capacity,
                        equipment: classroom.equipment,
                      });
                      // TODO: Add edit mode
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this classroom?')) {
                        try {
                          await deleteClassroom(classroom.id);
                          toast.success('Classroom deleted successfully');
                        } catch (error) {
                          toast.error('Failed to delete classroom');
                        }
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
