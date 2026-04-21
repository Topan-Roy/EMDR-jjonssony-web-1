import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
const AudioPlayer = ({
  title,
  durationInSeconds,
  isReplaceable,
  onReplace,
  isCompact,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const currentTime = (progress / 100) * durationInSeconds;
  const handleReplace = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onReplace) {
      onReplace();
    }
  };
  return (
    <div
      className={`flex items-center gap-6 rounded-2xl p-5 ${
        isCompact
          ? "bg-[#999999]/50"
          : "bg-white/40 backdrop-blur-md shadow-sm border border-white/30"
      } group transition-all`}
    >
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-14 h-14 bg-[#4A7C59] hover:bg-[#3d6649] rounded-full flex items-center justify-center transition-all duration-300 shadow-lg active:scale-90 flex-shrink-0"
      >
        {isPlaying ? (
          <Pause className="w-12 h-6 text-white" fill="currentColor" />
        ) : (
          <Play className="w-12 h-6 text-white ml-0.5" fill="currentColor" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-end mb-1">
          <p
            className={`font-serif text-[#0F1912] truncate ${
              isCompact ? "text-sm" : "text-base"
            }`}
          >
            {title}
          </p>
        </div>
        <div className="relative h-2.5 bg-green-200/30 rounded-full overflow-hidden group-hover:h-3 transition-all">
          <div
            className="absolute h-full bg-[#4A7C59] transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] font-sans text-[#1E3224] font-medium opacity-80">
            {formatTime(Math.floor(currentTime))}
          </span>
          <span className="text-[10px] font-sans text-[#1E3224] font-medium opacity-80">
            {formatTime(durationInSeconds)}
          </span>
        </div>
      </div>
      {isReplaceable && (
        <button
          onClick={handleReplace}
          className="px-5 py-2.5 bg-[#4A7C59] hover:bg-[#3d6649] text-white rounded-xl text-sm font-serif transition-colors shadow-md active:scale-95"
        >
          Replace
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;
