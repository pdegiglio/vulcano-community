"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ChatModal from "@/components/chat-modal";
import UserManagementModal from "@/components/user-management-modal";
import ContactModal from "@/components/contact-modal";
import ComingSoonModal from "@/components/coming-soon-modal";

export default function MembersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState("");

  const handleComingSoon = (featureName: string) => {
    setComingSoonFeature(featureName);
    setIsComingSoonOpen(true);
  };

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
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-stone-800 dark:text-stone-200 text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-stone-800 dark:text-stone-200 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">
                Vulcano Community
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-stone-600 dark:text-stone-400">
                Welcome, {session.user?.name} (Apt. {session.user?.apartmentNumber})
              </span>
              <Link
                href="/"
                className="text-stone-600 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
              >
                Home
              </Link>
              <button
                onClick={() => setIsUserManagementOpen(true)}
                className="text-stone-600 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition-colors p-2"
                title="User Settings"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-stone-600 hover:bg-stone-700 dark:bg-stone-700 dark:hover:bg-stone-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-200 mb-4">
            Resident Portal
          </h2>
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Welcome to your Vulcano Towers resident dashboard. Access building information, 
            connect with neighbors, and stay updated on community happenings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* First row - 3 items */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg hover:border-yellow-500 dark:hover:border-yellow-500 transition-all opacity-60 hover:opacity-80">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-3">📋 Building Services</h3>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              Access maintenance requests, amenity bookings, and building policies.
            </p>
            <button 
              onClick={() => handleComingSoon("Building Services")}
              className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors w-full"
            >
              View Services
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg hover:border-yellow-500 dark:hover:border-yellow-500 transition-all">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-3">💬 Resident Chat</h3>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              Connect with neighbors, ask questions, and share recommendations.
            </p>
            <button 
              onClick={() => setIsChatModalOpen(true)}
              className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors w-full"
            >
              Join Discussion
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg hover:border-yellow-500 dark:hover:border-yellow-500 transition-all opacity-60 hover:opacity-80">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-3">📅 Community Events</h3>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              Upcoming social events, meetings, and community activities.
            </p>
            <button 
              onClick={() => handleComingSoon("Community Events")}
              className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors w-full"
            >
              View Events
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg hover:border-yellow-500 dark:hover:border-yellow-500 transition-all opacity-60 hover:opacity-80">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-3">🏠 Neighbor Directory</h3>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              Connect with residents across all three Vulcano towers.
            </p>
            <button 
              onClick={() => handleComingSoon("Neighbor Directory")}
              className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors w-full"
            >
              Browse Neighbors
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg hover:border-yellow-500 dark:hover:border-yellow-500 transition-all opacity-60 hover:opacity-80">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-3">🔧 Maintenance Hub</h3>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              Report issues, track requests, and view scheduled maintenance.
            </p>
            <button 
              onClick={() => handleComingSoon("Maintenance Hub")}
              className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors w-full"
            >
              Manage Requests
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg hover:border-yellow-500 dark:hover:border-yellow-500 transition-all opacity-60 hover:opacity-80">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-3">📢 Announcements</h3>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              Important notices, updates, and news from building management.
            </p>
            <button 
              onClick={() => handleComingSoon("Announcements")}
              className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors w-full"
            >
              View Updates
            </button>
          </div>
          
          {/* Second row - 3 items */}
        </div>

        {/* Third row - centered single item */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-sm">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg hover:border-yellow-500 dark:hover:border-yellow-500 transition-all">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-3">📚 Resources & Tools</h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">
                Share and borrow tools, games, and knowledge about the building and surroundings.
              </p>
              <a
                href="https://drive.google.com/drive/folders/1kHZMrxfc_Xq56oghet2OLwMqT1VF2Pig?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors w-full justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748L12.545 10.239z"/>
                </svg>
                Access Shared Resources
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-4">Need Assistance?</h3>
          <p className="text-stone-600 dark:text-stone-400 mb-6">
            Contact building management (ISS) for help with any issues.
          </p>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="bg-stone-600 hover:bg-stone-700 dark:bg-stone-700 dark:hover:bg-stone-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Contact Management
          </button>
        </div>
      </main>

      <ChatModal 
        isOpen={isChatModalOpen} 
        onClose={() => setIsChatModalOpen(false)} 
      />
      
      <UserManagementModal
        isOpen={isUserManagementOpen}
        onClose={() => setIsUserManagementOpen(false)}
      />
      
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        featureName={comingSoonFeature}
      />
    </div>
  );
}