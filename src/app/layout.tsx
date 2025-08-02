import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/shared/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Classroom Finder',
  description: 'Find available classrooms in your college building',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
