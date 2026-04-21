"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import VisualSelector from "@/components/dashboard/EMDRCompanion/CalmSpace/VisualSelector";
import PlaceDescription from "@/components/dashboard/EMDRCompanion/CalmSpace/PlaceDescription";
import MoodSetter from "@/components/dashboard/EMDRCompanion/CalmSpace/MoodSetter";
import PreviewPane from "@/components/dashboard/EMDRCompanion/CalmSpace/PreviewPane";
const MeditationSpaceApp = () => {
  const router = useRouter();
  const [selectedVisual, setSelectedVisual] = useState({
    id: 2,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&fit=crop",
    alt: "Mountains",
  });
  const [description, setDescription] = useState();
  const visuals = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&h=200&fit=crop",
      alt: "Group",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      alt: "Mountains",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=200&fit=crop",
      alt: "Galaxy",
      label: "Behaviours",
    },
  ];
  return (
    <div className="min-h-screen relative p-4 md:p-8 font-serif overflow-x-hidden rounded-2xl">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-xl pointer-events-none rounded-2xl" />
      <div className="relative z-10  flex flex-col">
        <div className="rounded-3xl  text-center">
          <h1 className="text-3xl  font-serif text-[#0F1912] mb-2 tracking-tight">
            Create Your Calm Space
          </h1>
          <p className="text-stone-700 text-base lg:text-lg leading-relaxed max-w-2xl mb-2 mx-auto font-sans">
            Customize your personal sanctuary for moments of stress. Choose a
            visual that resonates with you.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          <div className="space-y-3 h-full">
            <VisualSelector
              visuals={visuals}
              selectedVisualId={selectedVisual?.id}
              onSelectVisual={setSelectedVisual}
            />
            <PlaceDescription
              description={description}
              onDescriptionChange={setDescription}
            />
            <MoodSetter />
          </div>
          <div className="h-full min-h-[600px] flex flex-col">
            <PreviewPane
              description={description}
              backgroundUrl={selectedVisual?.image}
            />
          </div>
        </div>
        <div className="mt-12 flex justify-end gap-6 pb-8">
          <button
            onClick={() => router.back()}
            className="px-10 py-4 bg-[#4A7C59]/60 hover:bg-white/80 backdrop-blur-md text-[#0F1912] rounded-2xl font-serif text-lg tracking-wide transition-all shadow-lg border border-white/20 active:scale-95"
          >
            Back
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-10 py-4 bg-[#4A7C59] hover:bg-[#3d6649] text-white rounded-2xl font-serif text-xl tracking-wide transition-all shadow-xl shadow-[#4A7C59]/20 active:scale-95"
          >
            Save & Enter Space
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeditationSpaceApp;
