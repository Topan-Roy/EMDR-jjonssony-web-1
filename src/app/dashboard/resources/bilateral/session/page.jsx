"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";
import { getBilateralEnvironments } from "@/components/dashboard/bilateral/VisualEnvironmentSelector";
import { getBilateralIcons } from "@/components/dashboard/bilateral/VisualIconSelector";
import { getBilateralSounds } from "@/components/dashboard/bilateral/SoundSelector";
import { useStoredAuth } from "@/redux/authStorage";

function SessionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token } = useStoredAuth();
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(25);
  const [environments, setEnvironments] = useState([]);
  const [icons, setIcons] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [environmentError, setEnvironmentError] = useState("");
  const [iconError, setIconError] = useState("");
  const [soundError, setSoundError] = useState("");
  const [isLoadingEnvironments, setIsLoadingEnvironments] = useState(true);
  const [isLoadingIcons, setIsLoadingIcons] = useState(true);
  const [isLoadingSounds, setIsLoadingSounds] = useState(true);
  const audioRef = useRef(null);
  const isPausedRef = useRef(false);
  const totalSteps = 34;

  const envId = searchParams.get("environment") || "";
  const selectedEnv =
    environments.find((e) => e.id === envId) || environments[0];

  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        setIsLoadingEnvironments(true);
        setEnvironmentError("");
        const items = await getBilateralEnvironments(token);
        setEnvironments(items);
      } catch (error) {
        console.error("Error loading bilateral session environment:", error);
        setEnvironmentError(
          error.message || "Unable to load the selected environment."
        );
      } finally {
        setIsLoadingEnvironments(false);
      }
    };

    fetchEnvironments();
  }, [token]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        setIsLoadingIcons(true);
        setIconError("");
        const items = await getBilateralIcons(token);
        setIcons(items);
      } catch (error) {
        console.error("Error loading bilateral session icons:", error);
        setIconError(error.message || "Unable to load the selected icon.");
      } finally {
        setIsLoadingIcons(false);
      }
    };

    fetchIcons();
  }, [token]);

  useEffect(() => {
    const fetchSounds = async () => {
      try {
        setIsLoadingSounds(true);
        setSoundError("");
        const items = await getBilateralSounds(token);
        setSounds(items);
      } catch (error) {
        console.error("Error loading bilateral session sounds:", error);
        setSoundError(error.message || "Unable to load the selected sound.");
      } finally {
        setIsLoadingSounds(false);
      }
    };

    fetchSounds();
  }, [token]);

  const settings = {
    icon: searchParams.get("icon") || "",
    sound: searchParams.get("sound") || "",
    speed: searchParams.get("speed") || "medium",
    direction: searchParams.get("direction") || "horizontal",
  };

  const speedDurations = {
    slow: 8,
    medium: 4,
    fast: 2,
  };
  const duration = speedDurations[settings.speed] || 4;
  const selectedIcon = icons.find((i) => i.id === settings.icon) || icons[0];
  const selectedSound = sounds.find((s) => s.id === settings.sound) || sounds[0];

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (!selectedSound?.url) {
      return undefined;
    }

    const audio = new Audio(selectedSound.url);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 1;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error("Error playing bilateral sound:", error);
      }
    };

    if (!isPausedRef.current) {
      playAudio();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [selectedSound]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPaused) {
      audio.pause();
      return;
    }

    audio.play().catch((error) => {
      console.error("Error resuming bilateral sound:", error);
    });
  }, [isPaused]);

  if (isLoadingEnvironments || isLoadingIcons || isLoadingSounds) {
    return (
      <div className="w-screen h-screen bg-[#F5F3EF] flex items-center justify-center font-serif">
        Loading your sanctuary...
      </div>
    );
  }

  if (environmentError || !selectedEnv) {
    return (
      <div className="w-screen h-screen bg-[#F5F3EF] flex items-center justify-center px-6">
        <div className="max-w-md rounded-3xl bg-white/80 px-6 py-8 text-center shadow-lg">
          <h2 className="text-2xl font-serif text-[#0F1912] mb-3">
            Environment unavailable
          </h2>
          <p className="text-stone-700 mb-6">
            {environmentError || "No bilateral stimulation background was found."}
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#4A7C59] text-white rounded-xl font-medium hover:bg-[#3d6649] transition-all"
          >
            Back to settings
          </button>
        </div>
      </div>
    );
  }

  if (iconError || icons.length === 0) {
    return (
      <div className="w-screen h-screen bg-[#F5F3EF] flex items-center justify-center px-6">
        <div className="max-w-md rounded-3xl bg-white/80 px-6 py-8 text-center shadow-lg">
          <h2 className="text-2xl font-serif text-[#0F1912] mb-3">
            Visual icon unavailable
          </h2>
          <p className="text-stone-700 mb-6">
            {iconError || "No bilateral stimulation icon was found."}
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#4A7C59] text-white rounded-xl font-medium hover:bg-[#3d6649] transition-all"
          >
            Back to settings
          </button>
        </div>
      </div>
    );
  }

  if (soundError || sounds.length === 0) {
    return (
      <div className="w-screen h-screen bg-[#F5F3EF] flex items-center justify-center px-6">
        <div className="max-w-md rounded-3xl bg-white/80 px-6 py-8 text-center shadow-lg">
          <h2 className="text-2xl font-serif text-[#0F1912] mb-3">
            Sound unavailable
          </h2>
          <p className="text-stone-700 mb-6">
            {soundError || "No bilateral stimulation sound was found."}
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#4A7C59] text-white rounded-xl font-medium hover:bg-[#3d6649] transition-all"
          >
            Back to settings
          </button>
        </div>
      </div>
    );
  }

  const variants = {
    horizontal: {
      x: ["-48vw", "48vw"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "linear",
        },
      },
    },
    vertical: {
      y: ["-45vh", "45vh"],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "linear",
        },
      },
    },
    "diagonal-up": {
      x: ["-48vw", "48vw"],
      y: ["45vh", "-45vh"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "linear",
        },
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "linear",
        },
      },
    },
    "diagonal-down": {
      x: ["-48vw", "48vw"],
      y: ["-45vh", "45vh"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "linear",
        },
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F5F3EF] flex flex-col">
      <div className="absolute inset-0 z-0">
        <img
          src={selectedEnv.image}
          alt={selectedEnv.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      <div className="relative z-50 flex justify-between items-start p-8 w-full pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-widest text-white/80 drop-shadow-md font-serif">
            THE UK INKIND PSYCHOLOGY CLINIC
          </span>
          <h2 className="text-2xl font-serif text-white drop-shadow-lg leading-tight uppercase tracking-wide">
            {selectedEnv.name}
          </h2>
        </div>
        <div className="font-serif text-white/80 drop-shadow-md text-sm mt-2">
          {progress} of {totalSteps}
        </div>
      </div>

      <div className="flex-1 relative z-40 flex items-center justify-center">
        {!isPaused && (
          <motion.div
            animate={variants[settings.direction] || variants.horizontal}
            className="w-16 h-16 flex items-center justify-center"
          >
            <img
              src={selectedIcon.img}
              alt={selectedIcon.name}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
        )}
        {isPaused && (
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              src={selectedIcon.img}
              alt={selectedIcon.name}
              className="w-full h-full object-contain drop-shadow-lg opacity-50"
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-10 right-6 z-50 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center rounded-full border border-white/30 bg-white/20 p-3 text-white backdrop-blur-md transition-all hover:bg-white/40 active:scale-95"
          aria-label="Exit session"
        >
          <X size={18} />
        </button>
        <button
          onClick={() => setIsPaused((current) => !current)}
          className="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-8 py-2.5 text-xs font-serif uppercase tracking-widest text-white shadow-sm backdrop-blur-md transition-all hover:bg-white/40 active:scale-95 cursor-pointer"
        >
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
          {isPaused ? "resume" : "pause"}
        </button>
      </div>
    </div>
  );
}

export default function BilateralSessionPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-[#F5F3EF] flex items-center justify-center font-serif">
          Loading your sanctuary...
        </div>
      }
    >
      <SessionContent />
    </Suspense>
  );
}
