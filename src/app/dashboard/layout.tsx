import { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Schedule', href: '/dashboard/schedule', icon: CalendarIcon },
    ...(user?.role === 'admin' ? [{ name: 'Admin', href: '/dashboard/admin', icon: Cog6ToothIcon }] : []),
    { name: 'Schedule', href: '/dashboard/schedule', icon: CalendarIcon },
    ...(user?.role === 'admin'
      ? [
          { name: 'Users', href: '/dashboard/users', icon: UsersIcon },
          { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 transform bg-white/80 backdrop-blur-lg transition-transform duration-200 ease-in-out dark:bg-gray-800/80 md:translate-x-0">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Classroom Finder
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <item.icon
                  className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User profile */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.fullName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                </p>
              </div>
              <button
                onClick={() => logout()}
                className="ml-2 rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <main className="min-h-screen py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
