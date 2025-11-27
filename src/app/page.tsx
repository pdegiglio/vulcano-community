import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-gray-100">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-stone-800">Vulcano Community</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signin"
                className="text-stone-600 hover:text-stone-800 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-stone-800 mb-4">
            Welcome to Vulcano Towers Community
          </h2>
          <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
            Your home in the heart of the city. Stay connected with your neighbors, 
            get updates on building events, and be part of our thriving residential community.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-stone-800 mb-3">🏢 Building Updates</h3>
              <p className="text-stone-600">
                Stay informed about maintenance, amenities, and important announcements affecting all three towers.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-stone-800 mb-3">🎉 Community Events</h3>
              <p className="text-stone-600">
                Join social gatherings, holiday celebrations, and neighborhood activities with your fellow residents.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-stone-800 mb-3">🤝 Neighbor Connect</h3>
              <p className="text-stone-600">
                Meet your neighbors, share resources, and build lasting friendships within our towers.
              </p>
            </div>
          </div>

          <div className="mt-12 space-x-4">
            <Link
              href="/auth/signup"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-block"
            >
              Join Community
            </Link>
            <Link
              href="/auth/signin"
              className="bg-stone-600 hover:bg-stone-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-block"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
