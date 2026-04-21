"use client";
import React from "react";

export default function WelcomeSection() {
  return (
    <div className="w-full py-6">
      <div className="w-full">
        <div className="bg-[#6E967A]/10 rounded-3xl shadow-sm border border-[#6E967A] p-12 text-center">
          <h1 className="text-3xl lg:text-5xl font-serif text-[#000000] mb-6">
            Welcome to Your Journey
          </h1>
          <p className="text-[#000000] text-base lg:text-lg leading-relaxed max-w-6xl mx-auto">
            Choose an area below to access your personalized EMDR homework
            exercises. Each section contains carefully crafted activities to
            support your healing process.
          </p>
        </div>
      </div>
    </div>
  );
}
