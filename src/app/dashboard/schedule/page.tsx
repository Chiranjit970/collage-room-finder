'use client';

import { useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useClassroomStore } from '@/lib/store';

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

export default function ScheduleView() {
  const { user } = useAuth();
  const { classrooms } = useClassroomStore();

  const schedule = useMemo(() => {
    return timeSlots.map((timeSlot) => ({
      time: timeSlot,
      bookings: classrooms.map((classroom) => ({
        classroom,
        isBooked: classroom.schedule[timeSlot]?.isOccupied || false,
        bookedBy: classroom.schedule[timeSlot]?.bookedBy || null,
      })),
    }));
  }, [classrooms]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <p className="mt-2 text-gray-600">View all classroom bookings</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Time
              </th>
              {classrooms.map((classroom) => (
                <th
                  key={classroom.id}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {classroom.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {schedule.map((slot) => (
              <tr key={slot.time}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {slot.time}
                </td>
                {slot.bookings.map(({ classroom, isBooked, bookedBy }) => (
                  <td
                    key={classroom.id}
                    className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                  >
                    {isBooked ? (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        Booked
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Available
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
