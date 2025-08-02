import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import { UserRole } from '@/types';

export default function RoleSelect() {
  const router = useRouter();

  const handleRoleSelect = (role: UserRole) => {
    router.push(`/auth/${role === 'admin' ? 'admin' : 'user'}/signup`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-600">
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white/80 backdrop-blur-lg p-6 shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Welcome to Classroom Finder
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please select your role to continue
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <Button
              className="w-full"
              onClick={() => handleRoleSelect('student')}
            >
              I am a Student
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => handleRoleSelect('faculty')}
            >
              I am a Faculty Member
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => handleRoleSelect('admin')}
            >
              I am an IT Department Staff
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
