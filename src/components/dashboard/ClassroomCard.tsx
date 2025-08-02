import { Classroom } from '@/types';
import {
  ComputerDesktopIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  WifiIcon,
} from '@heroicons/react/24/outline';

interface ClassroomCardProps {
  classroom: Classroom;
  onClick?: () => void;
}

const equipmentIcons = {
  computer: ComputerDesktopIcon,
  projector: VideoCameraIcon,
  speakers: SpeakerWaveIcon,
  wifi: WifiIcon,
};

export default function ClassroomCard({ classroom, onClick }: ClassroomCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-lg transition-all hover:shadow-xl dark:bg-gray-800/80"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {classroom.name}
        </h3>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            classroom.status === 'free'
              ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400'
          }`}
        >
          {classroom.status}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Capacity: {classroom.capacity} students
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {classroom.equipment.map((eq) => {
            const Icon = equipmentIcons[eq as keyof typeof equipmentIcons];
            return Icon ? (
              <div
                key={eq}
                className="rounded-full bg-gray-100 p-1 dark:bg-gray-700"
                title={eq}
              >
                <Icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </div>
            ) : null;
          })}
        </div>
      </div>

      {classroom.schedule && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Next Available
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {classroom.status === 'free'
              ? 'Available now'
              : Object.entries(classroom.schedule)
                  .find(([_, slots]) => slots.some((slot) => !slot.isOccupied))
                  ?.[0] || 'No availability today'}
          </p>
        </div>
      )}
    </div>
  );
}
