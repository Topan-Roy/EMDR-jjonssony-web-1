"use client";
import React from "react";

export default function StoryPage() {
  return (
    <div className="min-h-screen relative px-6 py-12 ">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl"></div>
      <div className="relative ">
        <h1 className="text-4xl font-serif text-[#292524] mb-8 text-center">
          My Story
        </h1>
        <div className="bg-[#E3E6F0] backdrop-blur-md rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=100&h=100&fit=crop"
                alt="Tree icon"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-serif text-[#0F1912]">Thoughts</h2>
              <p className="text-[#7A7A7A] text-sm">
                Creating distance from our thoughts helps us see them clearly.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-[#4A7C59]/10 rounded-2xl p-4 flex items-center justify-between hover:bg-teal-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="text-stone-900 font-medium">
                  ACT Thoughts Exercise
                </span>
              </div>
              <span className="text-sm text-stone-600 font-medium">Text</span>
            </div>
            <div className="bg-[#4A7C59]/10 rounded-2xl p-4 flex items-center justify-between hover:bg-teal-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-stone-900 font-medium">
                  Thanking the Mind
                </span>
              </div>
              <span className="text-sm text-stone-600 font-medium">Video</span>
            </div>
            <div className="bg-[#4A7C59]/10 rounded-2xl p-4 flex items-center justify-between hover:bg-teal-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
                <span className="text-stone-900 font-medium">
                  Leaves on a Stream
                </span>
              </div>
              <span className="text-sm text-stone-600 font-medium">Audio</span>
            </div>
          </div>
        </div>
        <div className="bg-[#E3E6F0] backdrop-blur-md rounded-3xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
                alt="Person icon"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-serif text-[#0F1912]">Emotions</h2>
              <p className="text-[#7A7A7A] text-sm">
                Learning to feel and manage emotions safely.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-[#4A7C59]/10 rounded-2xl p-4 flex items-center justify-between hover:bg-teal-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="text-stone-900 font-medium">
                  ACT Thoughts Exercise
                </span>
              </div>
              <span className="text-sm text-stone-600 font-medium">Text</span>
            </div>
            <div className="bg-[#4A7C59]/10 rounded-2xl p-4 flex items-center justify-between hover:bg-teal-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
                <span className="text-stone-900 font-medium">
                  Leaves on a Stream
                </span>
              </div>
              <span className="text-sm text-stone-600 font-medium">Audio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
