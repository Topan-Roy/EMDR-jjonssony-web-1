"use client";
import React from "react";

export default function HealingJourney() {
  const milestones = [
    {
      date: "Dec 5, 2024",
      title: "7-Day Streak Milestone",
      description: "Completed all daily exercises for a week",
      color: "teal",
    },
    {
      date: "Dec 5, 2024",
      title: "7-Day Streak Milestone",
      description: "Completed all daily exercises for a week",
      color: "blue",
    },
    {
      date: "Dec 5, 2024",
      title: "7-Day Streak Milestone",
      description: "Completed all daily exercises for a week",
      color: "blue",
    },
  ];

  return (
    <div className="w-full py-6">
      <div className="w-full">
        {/* Card Container */}
        <div className=" backdrop-blur-xl rounded-3xl shadow-xl p-8 lg:p-12 border border-white/50">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif text-[#0F172B] mb-2">
                Your Healing Journey
              </h1>
              <p className="text-[#45556C] text-base">
                Recent milestones and achievements
              </p>
            </div>
            <button className="bg-[#F1F5F9] hover:bg-stone-50 text-[#314158] px-6 py-3 rounded-xl font-medium shadow-sm border border-stone-200 transition-colors duration-200 cursor-pointer">
              View All
            </button>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4">
                {/* Timeline Dot and Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      milestone.color === "teal" ? "bg-teal-600" : "bg-blue-600"
                    } flex-shrink-0 mt-2`}
                  ></div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-stone-300 mt-2"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <p className="text-sm text-[#1E3224] mb-1">
                    {milestone.date}
                  </p>
                  <h3 className="text-xl font-semibold text-[#0F172B] mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-[#45556C] text-sm">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
