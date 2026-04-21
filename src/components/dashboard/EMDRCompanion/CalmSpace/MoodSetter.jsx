import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import MoodSelector from "./MoodSelector";

const MoodSetter = () => {
  const [showSelector, setShowSelector] = useState(false);

  if (showSelector) {
    return <MoodSelector onClose={() => setShowSelector(false)} />;
  }

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-3 shadow-xl border border-white/20">
      <h2 className="text-xl font-serif mb-3 text-[#0F1912] tracking-tight">
        Set the mood
      </h2>
      <AudioPlayer
        title="Calm_place.mp3"
        durationInSeconds={200}
        isReplaceable={true}
        onReplace={() => setShowSelector(true)}
      />
    </div>
  );
};

export default MoodSetter;
