'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { Classroom } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import Button from '../shared/Button';
import {
  ComputerDesktopIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  WifiIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

interface ClassroomModalProps {
  classroom: Classroom | null;
  isOpen: boolean;
  onClose: () => void;
  onBooking: (timeSlot: string) => Promise<void>;
}

const equipmentIcons = {
  computer: ComputerDesktopIcon,
  projector: VideoCameraIcon,
  speakers: SpeakerWaveIcon,
  wifi: WifiIcon,
};

export default function ClassroomModal({
  classroom,
  isOpen,
  onClose,
  onBooking,
}: ClassroomModalProps) {
  const { user } = useAuth();
  const [isBooking, setIsBooking] = useState(false);

  if (!classroom) return null;

  const isAvailable = (timeSlot: string) => {
    return !classroom.schedule[timeSlot]?.isOccupied;
  };

  const handleBooking = async (timeSlot: string) => {
    if (!user) {
      toast.error('Please login to book a classroom');
      return;
    }

    setIsBooking(true);
    try {
      await onBooking(timeSlot);
      toast.success('Classroom booked successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to book classroom. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  {classroom.name}
                </Dialog.Title>

                <div className="mt-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Capacity:</span>
                    <span className="text-sm font-medium">{classroom.capacity} students</span>
                  </div>

                  <div className="mt-4">
                    <span className="text-sm text-gray-500">Equipment:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {classroom.equipment.map((item) => {
                        const Icon = equipmentIcons[item as keyof typeof equipmentIcons];
                        return (
                          <div
                            key={item}
                            className="flex items-center rounded-full bg-gray-100 px-3 py-1"
                          >
                            {Icon && <Icon className="mr-1.5 h-4 w-4" />}
                            <span className="text-sm capitalize">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium">Available Time Slots</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {Object.keys(classroom.schedule).map((timeSlot) => (
                        <Button
                          key={timeSlot}
                          variant={isAvailable(timeSlot) ? 'outline' : 'secondary'}
                          disabled={!isAvailable(timeSlot) || isBooking}
                          onClick={() => isAvailable(timeSlot) && handleBooking(timeSlot)}
                          className="justify-start"
                        >
                          <span className="flex items-center">
                            <span
                              className={`mr-2 h-2 w-2 rounded-full ${
                                isAvailable(timeSlot) ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            />
                            {timeSlot}
                            {isBooking && <span className="ml-2 animate-pulse">Booking...</span>}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button variant="outline" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
