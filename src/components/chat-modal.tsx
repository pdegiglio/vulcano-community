"use client";

import { useState } from "react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  if (!isOpen) return null;

  const chatGroups = [
    {
      name: "Main Group",
      description: "General community discussions and announcements",
      url: "https://chat.whatsapp.com/COVki48HqZNJjw0lSYUhD2",
      icon: "🏢"
    },
    {
      name: "Help & Tips",
      description: "Get help and share useful tips with neighbors",
      url: "https://chat.whatsapp.com/HRtEjRVQ25aB0oPD8pVBTz",
      icon: "💡"
    },
    {
      name: "Activities & Events",
      description: "Community events, social activities, and gatherings",
      url: "https://chat.whatsapp.com/JwR4O8f5QsEJxTLHaUIlNM",
      icon: "🎉"
    },
    {
      name: "Move & Sell",
      description: "Buy, sell, and moving assistance within the community",
      url: "https://chat.whatsapp.com/EXxC8TCSzko7IAcIvmtala",
      icon: "📦"
    }
  ];

  return (
    <div className="fixed inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-200">
            VulcanoConnects Chat Groups
          </h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 text-xl"
          >
            ✕
          </button>
        </div>
        
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          Join our WhatsApp community groups to connect with your neighbors and stay updated.
        </p>

        <div className="space-y-4">
          {chatGroups.map((group, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-2">
                    {group.icon} {group.name}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm mb-3">
                    {group.description}
                  </p>
                  <a
                    href={group.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.079"/>
                    </svg>
                    Join WhatsApp Group
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
            By joining these groups, you agree to follow our community guidelines and respect your neighbors.
          </p>
        </div>
      </div>
    </div>
  );
}