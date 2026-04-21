"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EMDRCompanion() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBeliefs, setSelectedBeliefs] = useState([]);

  const beliefs = [
    "I am not good enough",
    "I am unsafe / I am in danger",
    "I have no control / I am powerless",
    "I am unlovable / unwelcome",
    "I am a failure / I am inadequate",
    "I am responsible for everything bad",
    "I don't belong / I am alone",
  ];

  const toggleBelief = (belief) => {
    setSelectedBeliefs((prev) =>
      prev.includes(belief)
        ? prev.filter((b) => b !== belief)
        : [...prev, belief]
    );
  };

  const [activeMessageIndex, setActiveMessageIndex] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: "Which negative belief(s) do you find yourself thinking most often when you recall the memory?",
      answer: null,
    },
    {
      text: "When you think of that belief and the memory, how much do you believe it now on a scale of 1-7 (where 1 is not at all and 7 is completely)?",
      answer: null,
    },
    {
      text: "What positive belief would you like to have about yourself instead?",
      answer: null,
    },
    {
      text: "Where do you feel this in your body right now as you focus on the memory?",
      answer: null,
    },
  ]);

  const handleMessageClick = (index) => {
    setActiveMessageIndex(index);
    if (messages[index].answer) {
      setSelectedBeliefs(messages[index].answer.split(", "));
    } else {
      setSelectedBeliefs([]);
    }
    setIsModalOpen(true);
  };

  const submitAnswer = () => {
    if (activeMessageIndex === null || selectedBeliefs.length === 0) return;
    const newMessages = [...messages];
    newMessages[activeMessageIndex].answer = selectedBeliefs.join(", ");
    setMessages(newMessages);
    setIsModalOpen(false);
    setActiveMessageIndex(null);
  };

  // Check if all questions are answered
  const allAnswered = messages.every((msg) => msg.answer !== null);

  return (
    <>
      <div className="backdrop-blur-xs border border-white/20 rounded-2xl p-2 relative">
        <div className="text-center pb-6 mt-5">
          <h1 className="text-3xl text-[#000000] font-normal mb-3">
            EMDR Companion
          </h1>
          <p className="text-[#000000] text-base leading-relaxed max-w-2xl mx-auto">
            I'm here to gently guide you through preparing for your first EMDR
            session.
            <br />
            We'll work together at your pace.
          </p>
        </div>

        <div className="p-5">
          <div className="relative backdrop-blur-xs rounded-3xl overflow-hidden shadow-lg border border-white/20">
            <div className="backdrop-blur-md border-b border-stone-200/50 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#0F1912] text-[20px]">
                    EMDR Companion
                  </span>
                  <div className="flex items-center text-[#1EC970]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      className="lucide lucide-badge-check"
                    >
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path
                        d="m9 12 2 2 4-4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-8 ">
              {messages.map((message, index) => (
                <div key={index} className="flex justify-start">
                  <button
                    onClick={() => handleMessageClick(index)}
                    className="text-left bg-[#FBFBFC]/80 backdrop-blur-md rounded-2xl rounded-tl-sm px-6 py-4 shadow-sm border border-white/40 hover:bg-[#FBFBFC] transition-all cursor-pointer group max-w-[80%]"
                  >
                    <p
                      className={`text-stone-800 text-sm leading-relaxed ${
                        message.answer ? "mb-2" : ""
                      }`}
                    >
                      "{message.text}"
                    </p>
                    {message.answer && (
                      <p className="text-[#4A7C59] text-[11px] font-medium italic border-t border-stone-100 pt-2 flex items-center gap-2">
                        <span className="text-stone-400 not-italic">—</span>{" "}
                        {message.answer}
                      </p>
                    )}
                  </button>
                </div>
              ))}

              {/* Continue Button */}
              {allAnswered && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() =>
                      router.push("/dashboard/EMDRCompanion/session/next")
                    }
                    className="bg-[#4A7C59] hover:bg-[#3d6649] text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    Continue to Session
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg my-auto border border-stone-200 overflow-hidden"
          >
            <div className="p-8 pb-4 text-center border-b border-stone-100">
              <h2 className="text-2xl font-serif text-stone-900 mb-2">
                Meet Your EMDR Companion
              </h2>
              <p className="text-stone-600 text-sm">
                Select the negative belief(s) that resonate with you:
              </p>
            </div>
            <div className="px-8 py-6 max-h-[400px] overflow-y-auto space-y-3 bg-stone-50/60">
              {beliefs.map((belief, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleBelief(belief)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center justify-between group ${
                    selectedBeliefs.includes(belief)
                      ? "bg-[#4A7C59]/10 border-[#4A7C59] text-[#4A7C59] shadow-sm"
                      : "bg-white border-stone-200 text-stone-700 hover:border-stone-400"
                  }`}
                >
                  <span className="text-sm font-medium leading-snug">
                    {belief}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                      selectedBeliefs.includes(belief)
                        ? "bg-[#4A7C59] border-[#4A7C59]"
                        : "bg-white border-stone-300"
                    }`}
                  >
                    {selectedBeliefs.includes(belief) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="p-8 space-y-3 border-t border-stone-100 bg-white">
              <button
                disabled={selectedBeliefs.length === 0}
                onClick={submitAnswer}
                className={`w-full py-4 rounded-xl font-bold transition-all uppercase tracking-widest text-xs shadow-md active:scale-[0.98] ${
                  selectedBeliefs.length > 0
                    ? "bg-[#4A7C59] hover:bg-[#3d6649] text-white"
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
              >
                Continue with selected belief
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
