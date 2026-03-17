export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Welcome to RKS Project
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Your NestJS Backend with Next.js Frontend is ready!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/register"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Register
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
