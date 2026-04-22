"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Session5Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center rounded-2xl">
      <div className=" w-full bg-white rounded-3xl shadow-xl p-8 border border-stone-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#3e4e44] mb-4">Session 5: Deep Processing</h1>
          <p className="text-stone-600">Please watch the following video to continue your EMDR journey.</p>
        </div>

        {/* Placeholder Video */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl mb-10">
          <video
            className="w-full h-full object-cover"
            controls
            src="https://www.w3schools.com/html/mov_bbb.mp4" // Temporary demonstration video
          />
        </div>

        <div className="flex justify-between items-center bg-[#F6F7F4] p-6 rounded-2xl border border-stone-100">
          <div>
            <h3 className="font-semibold text-stone-800 text-lg">Congratulations on finishing Session 5!</h3>
            <p className="text-stone-500 text-sm">You are making great progress. Continue to your therapy roadmap.</p>
          </div>
          <button
            onClick={() => router.push("/dashboard/resources/bilateral")}
            className="bg-[#41594d] hover:bg-[#354a3f] text-white px-8 py-3 rounded-xl font-medium transition-all shadow-lg active:scale-95"
          >
            Next Session
          </button>
        </div>
      </div>
    </div>
  );
}
