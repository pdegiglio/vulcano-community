import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Vulcano Community</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/members"
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Resident Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome to Vulcano Towers Community
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Your home in the heart of the city. Stay connected with your neighbors, 
            get updates on building events, and be part of our thriving residential community.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-3">🏢 Building Updates</h3>
              <p className="text-slate-300">
                Stay informed about maintenance, amenities, and important announcements affecting all three towers.
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-3">🎉 Community Events</h3>
              <p className="text-slate-300">
                Join social gatherings, holiday celebrations, and neighborhood activities with your fellow residents.
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-3">🤝 Neighbor Connect</h3>
              <p className="text-slate-300">
                Meet your neighbors, share resources, and build lasting friendships within our towers.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/members"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-block"
            >
              Resident Portal
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
