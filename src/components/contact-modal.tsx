"use client";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-200">
            Contact Building Management
          </h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-2">
              ISS Building Management
            </h3>
            
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              For maintenance requests, building inquiries, or assistance with any issues, please contact our management team.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">Phone Number:</p>
              <a
                href="tel:+41792453639"
                className="text-2xl font-bold text-stone-800 dark:text-stone-200 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors"
              >
                +41 79 245 36 39
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+41792453639"
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              
              <a
                href="sms:+41792453639"
                className="flex-1 bg-stone-600 hover:bg-stone-700 dark:bg-stone-700 dark:hover:bg-stone-600 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Send SMS
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
            Available during business hours. For emergencies outside business hours, please contact emergency services.
          </p>
        </div>
      </div>
    </div>
  );
}