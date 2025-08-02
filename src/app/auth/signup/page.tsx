import { Metadata } from 'next';
import SignupForm from '@/components/auth/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up - Classroom Finder',
  description: 'Create a new account to use Classroom Finder',
};

export default function SignupPage({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const role = searchParams.role || 'student';
  return <SignupForm role={role as 'student' | 'faculty' | 'admin'} />;
}
