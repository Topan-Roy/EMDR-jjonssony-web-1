"use client";
import React from "react";
import Link from "next/link";

export default function RecentActivityPage() {
  const activities = [
    {
      id: 1,
      title: "PHQ-9 Depression Scale (Session 1)",
      phase: "Phase-1 (15)",
      date: "Oct 24, 2025",
    },
    {
      id: 2,
      title: "GAD-7 Anxiety Scale (Session 2)",
      phase: "Phase-2 (12)",
      date: "Oct 20, 2025",
    },
    {
      id: 3,
      title: "PCL-5 PTSD Checklist (Session 1)",
      phase: "Phase-1 (22)",
      date: "Oct 15, 2025",
    },
    {
      id: 4,
      title: "PCL-5 PTSD Checklist (Session 1)",
      phase: "Phase-1 (22)",
      date: "Oct 15, 2025",
    },
    {
      id: 5,
      title: "PCL-5 PTSD Checklist (Session 1)",
      phase: "Phase-1 (22)",
      date: "Oct 15, 2025",
    },
  ];

  return (
    <div className="bg-[#9a9898] backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20 min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-4xl font-serif text-white">Recent Activity</h1>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-[#E3E6F0] rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#DBE5DE] rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                <svg
                  className="w-7 h-7 text-[#4A7C59]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 13h1m3 0h1m-7-5h5a1 1 0 011 1v12m-6-13h2"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-[18px] font-medium text-stone-900 mb-1">
                  {activity.title}
                </h3>
                <p className="text-[#7A7A7A] text-sm">{activity.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[16px] font-semibold text-[#4A7C59] bg-[#4A7C59]/10 px-4 py-2 rounded-full">
                {activity.phase}
              </span>
              <svg
                className="w-6 h-6 text-stone-400 group-hover:text-stone-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
