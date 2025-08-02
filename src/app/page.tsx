export const metadata = {
  title: 'Welcome to Classroom Finder',
  description: 'Find available classrooms in your college building',
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-600">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white/80 backdrop-blur-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Welcome to Classroom Finder
        </h1>
        <p className="text-center text-gray-600">
          Find and manage available classrooms in your college building
        </p>
      </div>
    </div>
  );
}
