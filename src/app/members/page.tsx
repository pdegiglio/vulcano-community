"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function MembersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated" && session) {
      // This will be logged by the middleware, but we can add app-specific logging
      console.log(`[MEMBERS] Portal accessed successfully by: ${session.user.email} (${session.user.name}, Apt: ${session.user.apartmentNumber})`);
    }
  }, [status, router, session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white hover:text-orange-400 transition-colors">
                Vulcano Community
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">
                Welcome, {session.user?.name} (Apt. {session.user?.apartmentNumber})
              </span>
              <Link
                href="/"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Resident Portal
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Welcome to your Vulcano Towers resident dashboard. Access building information, 
            connect with neighbors, and stay updated on community happenings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-orange-500 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-3">📋 Building Services</h3>
            <p className="text-slate-300 mb-4">
              Access maintenance requests, amenity bookings, and building policies.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors w-full">
              View Services
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-orange-500 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-3">💬 Resident Chat</h3>
            <p className="text-slate-300 mb-4">
              Connect with neighbors, ask questions, and share recommendations.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors w-full">
              Join Discussion
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-orange-500 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-3">📅 Community Events</h3>
            <p className="text-slate-300 mb-4">
              Upcoming social events, meetings, and community activities.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors w-full">
              View Events
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-orange-500 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-3">🏠 Neighbor Directory</h3>
            <p className="text-slate-300 mb-4">
              Connect with residents across all three Vulcano towers.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors w-full">
              Browse Neighbors
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-orange-500 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-3">🔧 Maintenance Hub</h3>
            <p className="text-slate-300 mb-4">
              Report issues, track requests, and view scheduled maintenance.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors w-full">
              Manage Requests
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-orange-500 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-3">📢 Announcements</h3>
            <p className="text-slate-300 mb-4">
              Important notices, updates, and news from building management.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors w-full">
              View Updates
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Need Assistance?</h3>
          <p className="text-slate-300 mb-6">
            Contact building management or our concierge team for help with any issues.
          </p>
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors">
            Contact Management
          </button>
        </div>
      </main>
    </div>
  );
}