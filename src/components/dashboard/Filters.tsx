import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  FunnelIcon,
  CheckIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useClassroomStore } from '@/lib/store';
import clsx from 'clsx';

const timeSlots = [
  { id: 'morning', name: 'Morning' },
  { id: 'afternoon', name: 'Afternoon' },
  { id: 'evening', name: 'Evening' },
];

const equipmentOptions = [
  { id: 'computer', name: 'Computer' },
  { id: 'projector', name: 'Projector' },
  { id: 'speakers', name: 'Speakers' },
  { id: 'wifi', name: 'WiFi' },
];

export default function Filters() {
  const {
    selectedTimeSlot,
    selectedEquipment,
    selectedStatus,
    setSelectedTimeSlot,
    setSelectedEquipment,
    setSelectedStatus,
  } = useClassroomStore();

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Time Slot Filter */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedTimeSlot ? (
              timeSlots.find((slot) => slot.id === selectedTimeSlot)?.name
            ) : (
              'Time Slot'
            )}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {timeSlots.map((slot) => (
                <Menu.Item key={slot.id}>
                  {({ active }) => (
                    <button
                      className={clsx(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                      onClick={() => setSelectedTimeSlot(slot.id)}
                    >
                      <span className="flex items-center">
                        {selectedTimeSlot === slot.id && (
                          <CheckIcon className="mr-2 h-4 w-4" />
                        )}
                        {slot.name}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                    onClick={() => setSelectedTimeSlot(null)}
                  >
                    Clear
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Equipment Filter */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Equipment
            {selectedEquipment.length > 0 && (
              <span className="ml-1 rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-700">
                {selectedEquipment.length}
              </span>
            )}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {equipmentOptions.map((option) => (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <button
                      className={clsx(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                      onClick={() => {
                        if (selectedEquipment.includes(option.id)) {
                          setSelectedEquipment(
                            selectedEquipment.filter((eq) => eq !== option.id)
                          );
                        } else {
                          setSelectedEquipment([...selectedEquipment, option.id]);
                        }
                      }}
                    >
                      <span className="flex items-center">
                        {selectedEquipment.includes(option.id) && (
                          <CheckIcon className="mr-2 h-4 w-4" />
                        )}
                        {option.name}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              ))}
              {selectedEquipment.length > 0 && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                      onClick={() => setSelectedEquipment([])}
                    >
                      Clear all
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Status Filter */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedStatus ? selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1) : 'Status'}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {['free', 'occupied'].map((status) => (
                <Menu.Item key={status}>
                  {({ active }) => (
                    <button
                      className={clsx(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                      onClick={() => setSelectedStatus(status as 'free' | 'occupied')}
                    >
                      <span className="flex items-center">
                        {selectedStatus === status && (
                          <CheckIcon className="mr-2 h-4 w-4" />
                        )}
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                    onClick={() => setSelectedStatus(null)}
                  >
                    Clear
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Clear all filters */}
      {(selectedTimeSlot || selectedEquipment.length > 0 || selectedStatus) && (
        <button
          className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
          onClick={() => {
            setSelectedTimeSlot(null);
            setSelectedEquipment([]);
            setSelectedStatus(null);
          }}
        >
          <FunnelIcon className="-ml-0.5 h-4 w-4" />
          Clear filters
        </button>
      )}
    </div>
  );
}
