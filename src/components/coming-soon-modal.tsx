"use client";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export default function ComingSoonModal({ isOpen, onClose, featureName = "This feature" }: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-200">
            Coming Soon
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4">
              {featureName} is Coming Soon!
            </h3>
            
            <p className="text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
              We're working hard to bring you this feature. It will be available in a future update to enhance your Vulcano Community experience.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">Expected Timeline:</p>
              <p className="text-lg font-semibold text-stone-800 dark:text-stone-200">
                Coming Q1 2026
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-4 py-3 rounded-lg transition-colors"
            >
              Got It
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
            Stay tuned for updates and new features as we continue to improve your community portal.
          </p>
        </div>
      </div>
    </div>
  );
}