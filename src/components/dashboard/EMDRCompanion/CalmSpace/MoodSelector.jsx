import React from "react";
import AudioPlayer from "./AudioPlayer";

const MoodSelector = ({ onClose }) => {
  const moods = [
    { title: "Calm_place.mp3", duration: 200 },
    { title: "Ocean_waves.mp3", duration: 180 },
    { title: "Forest_rain.mp3", duration: 240 },
    { title: "Gentle_wind.mp3", duration: 150 },
    { title: "Soft_piano.mp3", duration: 300 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 " onClick={onClose} />

      {/* Modal Content */}
      <div className="bg-white/60 rounded-[40px] p-8 shadow-2xl relative w-full max-w-lg max-h-[80vh] overflow-y-auto z-10 border border-white/20">
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-2xl font-serif text-white tracking-tight">
            Select Mood
          </h2>
          <button
            onClick={onClose}
            className="text-white text-3xl hover:scale-110 transition-transform p-2"
          >
            ×
          </button>
        </div>

        <div className="space-y-2">
          {moods.map((mood, index) => (
            <div
              key={index}
              className="bg-white/60 border border-white/30 rounded-2xl overflow-hidden shadow-lg hover:border-white transition-colors"
            >
              <AudioPlayer
                title={mood.title}
                durationInSeconds={mood.duration}
                isReplaceable={false}
                isCompact={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;
