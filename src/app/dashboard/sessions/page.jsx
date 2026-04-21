"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SESSION_COUNT = 12;

const createInitialSessions = () =>
  Array.from({ length: SESSION_COUNT }, (_, index) => ({
    id: index + 1,
    title: `Session ${index + 1}`,
    focus:
      index === 0
        ? "Grounding and settling into the work"
        : index < 4
          ? "Building emotional safety and awareness"
          : index < 8
            ? "Processing patterns and responses"
            : "Integration, reflection, and strengthening progress",
    status: index === 0 ? "available" : "locked",
    completedAt: null,
  }));

const formatCompletedAt = (value) => {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsedDate);
};

const getStorageKey = (journeyId) => `journey-session-progress:${journeyId || "default"}`;
const getBaseSessionsPath = (journeyId, journeyTitle) =>
  `/dashboard/sessions?journeyId=${encodeURIComponent(
    journeyId
  )}&title=${encodeURIComponent(journeyTitle)}`;
const getSessionRoute = (journeyId, journeyTitle, sessionId) => {
  const encodedJourneyId = encodeURIComponent(journeyId);
  const encodedJourneyTitle = encodeURIComponent(journeyTitle);

  if (sessionId === 2) {
    return `/dashboard/EMDRCompanion?journeyId=${encodedJourneyId}&title=${encodedJourneyTitle}&sessionId=${sessionId}`;
  }

  if (sessionId === 3) {
    return `/dashboard/EMDRCompanion/session/next?journeyId=${encodedJourneyId}&title=${encodedJourneyTitle}&sessionId=${sessionId}`;
  }

  if (sessionId === 4) {
    return `/dashboard/EMDRCompanion/session/next/calm-space?journeyId=${encodedJourneyId}&title=${encodedJourneyTitle}&sessionId=${sessionId}`;
  }

  return `/dashboard/EMDRCompanion/session?journeyId=${encodedJourneyId}&title=${encodedJourneyTitle}&sessionId=${sessionId}`;
};

export default function JourneySessionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const journeyId = searchParams.get("journeyId") || "default";
  const journeyTitle = searchParams.get("title") || "My Healing Journey";
  const completedSessionIdFromQuery = Number.parseInt(
    searchParams.get("completeSessionId") || "",
    10
  );

  const [sessions, setSessions] = useState(createInitialSessions);
  const [selectedSessionId, setSelectedSessionId] = useState(1);
  const [activityLog, setActivityLog] = useState([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  const completeSessionProgress = (currentSessions, currentLog, sessionId) => {
    const targetSession = currentSessions.find((session) => session.id === sessionId);

    if (!targetSession || targetSession.status === "locked") {
      return {
        sessions: currentSessions,
        activityLog: currentLog,
        nextSelectedSessionId:
          currentSessions.find((session) => session.status === "available")?.id ||
          targetSession?.id ||
          1,
      };
    }

    if (targetSession.status === "completed") {
      return {
        sessions: currentSessions,
        activityLog: currentLog,
        nextSelectedSessionId: targetSession.id,
      };
    }

    const completedTimestamp = new Date().toISOString();
    let unlockedSessionId = null;

    const updatedSessions = currentSessions.map((session, index) => {
      if (session.id === sessionId) {
        return {
          ...session,
          status: "completed",
          completedAt: completedTimestamp,
        };
      }

      if (
        session.status === "locked" &&
        currentSessions[index - 1]?.id === sessionId &&
        unlockedSessionId === null
      ) {
        unlockedSessionId = session.id;

        return {
          ...session,
          status: "available",
        };
      }

      return session;
    });

    return {
      sessions: updatedSessions,
      activityLog: [
        {
          id: `${Date.now()}-${sessionId}`,
          message: `Session ${sessionId} completed`,
          timestamp: completedTimestamp,
        },
        ...currentLog,
      ],
      nextSelectedSessionId: unlockedSessionId || sessionId,
    };
  };

  useEffect(() => {
    const storedValue = window.localStorage.getItem(getStorageKey(journeyId));
    let timeoutId = null;

    timeoutId = window.setTimeout(() => {
      if (storedValue) {
        try {
          const parsedValue = JSON.parse(storedValue);
          setSessions(parsedValue.sessions || createInitialSessions());
          setActivityLog(parsedValue.activityLog || []);

          const firstAvailable =
            (parsedValue.sessions || []).find(
              (session) => session.status === "available"
            )?.id ||
            (parsedValue.sessions || []).find(
              (session) => session.status === "completed"
            )?.id ||
            1;

          setSelectedSessionId(firstAvailable);
        } catch {
          setSessions(createInitialSessions());
          setActivityLog([]);
          setSelectedSessionId(1);
        }
      } else {
        setSessions(createInitialSessions());
        setActivityLog([]);
        setSelectedSessionId(1);
      }

      setHasHydrated(true);
    }, 0);

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [journeyId]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(
      getStorageKey(journeyId),
      JSON.stringify({
        sessions,
        activityLog,
      })
    );
  }, [activityLog, hasHydrated, journeyId, sessions]);

  useEffect(() => {
    if (
      !hasHydrated ||
      Number.isNaN(completedSessionIdFromQuery) ||
      completedSessionIdFromQuery < 1
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const progressUpdate = completeSessionProgress(
        sessions,
        activityLog,
        completedSessionIdFromQuery
      );

      setSessions(progressUpdate.sessions);
      setActivityLog(progressUpdate.activityLog);
      setSelectedSessionId(progressUpdate.nextSelectedSessionId);
      router.replace(getBaseSessionsPath(journeyId, journeyTitle));
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    activityLog,
    completedSessionIdFromQuery,
    hasHydrated,
    journeyId,
    journeyTitle,
    router,
    sessions,
  ]);

  const completedCount = useMemo(
    () => sessions.filter((session) => session.status === "completed").length,
    [sessions]
  );

  const currentAvailableSession = useMemo(
    () => sessions.find((session) => session.status === "available") || null,
    [sessions]
  );

  const selectedSession =
    sessions.find((session) => session.id === selectedSessionId) || sessions[0];

  const handleSessionSelect = (session) => {
    if (session.status === "locked") {
      return;
    }

    setSelectedSessionId(session.id);
    router.push(getSessionRoute(journeyId, journeyTitle, session.id));
  };

  const handleCompleteSession = () => {
    if (!selectedSession || selectedSession.status !== "available") {
      return;
    }
    router.push(getSessionRoute(journeyId, journeyTitle, selectedSession.id));
  };

  if (!hasHydrated) {
    return (
      <div className="rounded-3xl border border-white/40 bg-white/20 px-6 py-16 text-center text-stone-700 shadow-xl backdrop-blur-md">
        Loading session plan...
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-3xl border border-white/45 bg-white/18 p-6 shadow-[0_30px_80px_rgba(15,25,18,0.12)] backdrop-blur-md">
      <div className="flex flex-col gap-4 rounded-[28px] border border-white/45 bg-white/35 p-6 shadow-sm backdrop-blur-md lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6E756E]">
            Journey Session Tracker
          </p>
          <h1 className="text-3xl font-serif text-[#0F1912]">{journeyTitle}</h1>
          <p className="mt-2 text-sm text-[#4E5A51]">
            Complete one session at a time. When a session is completed, the next
            one unlocks automatically.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="rounded-full bg-white/80 px-5 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-white"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[28px] border border-white/45 bg-white/35 p-6 shadow-sm backdrop-blur-md">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-[#0F1912]">Your 12 Sessions</h2>
              <p className="text-sm text-[#4E5A51]">
                Progress {completedCount}/{SESSION_COUNT}
              </p>
            </div>
            <div className="min-w-[180px]">
              <div className="mb-2 flex justify-between text-xs text-[#4E5A51]">
                <span>Overall Progress</span>
                <span>{Math.round((completedCount / SESSION_COUNT) * 100)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/70">
                <div
                  className="h-full rounded-full bg-[#4A7C59] transition-all duration-500"
                  style={{ width: `${(completedCount / SESSION_COUNT) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sessions.map((session) => {
              const isSelected = selectedSessionId === session.id;
              const isLocked = session.status === "locked";
              const isCompleted = session.status === "completed";

              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => handleSessionSelect(session)}
                  disabled={isLocked}
                  className={`rounded-2xl border p-5 text-left transition-all ${
                    isSelected
                      ? "border-[#4A7C59] bg-white shadow-md"
                      : "border-white/45 bg-white/70"
                  } ${
                    isLocked
                      ? "cursor-not-allowed opacity-55"
                      : "cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-[#EDF4EF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4A7C59]">
                      Session {session.id}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isCompleted
                          ? "text-[#4A7C59]"
                          : isLocked
                            ? "text-stone-400"
                            : "text-amber-600"
                      }`}
                    >
                      {isCompleted
                        ? "Completed"
                        : isLocked
                          ? "Locked"
                          : "Unlocked"}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#0F1912]">
                    {session.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#4E5A51]">
                    {session.focus}
                  </p>
                  {session.completedAt ? (
                    <p className="mt-3 text-xs text-stone-500">
                      Completed {formatCompletedAt(session.completedAt)}
                    </p>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/45 bg-white/35 p-6 shadow-sm backdrop-blur-md">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E756E]">
              Selected Session
            </p>
            <h2 className="text-2xl font-serif text-[#0F1912]">
              {selectedSession?.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#4E5A51]">
              {selectedSession?.focus}
            </p>

            <div className="mt-6 space-y-3 rounded-2xl bg-white/70 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#4E5A51]">Status</span>
                <span className="font-semibold text-[#0F1912]">
                  {selectedSession?.status === "available"
                    ? "Ready to work"
                    : selectedSession?.status === "completed"
                      ? "Completed"
                      : "Locked"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#4E5A51]">Completed Sessions</span>
                <span className="font-semibold text-[#0F1912]">
                  {completedCount}/{SESSION_COUNT}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#4E5A51]">Next Unlock</span>
                <span className="font-semibold text-[#0F1912]">
                  {currentAvailableSession
                    ? currentAvailableSession.title
                    : "All sessions unlocked"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCompleteSession}
              disabled={selectedSession?.status === "locked"}
              className="mt-6 w-full rounded-2xl bg-[#4A7C59] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#3d6649] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {selectedSession?.status === "completed"
                ? "Open Completed Session"
                : selectedSession?.status === "locked"
                  ? "Session Locked"
                  : "Open Session"}
            </button>
          </div>

          <div className="rounded-[28px] border border-white/45 bg-white/35 p-6 shadow-sm backdrop-blur-md">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E756E]">
              Session Log
            </p>

            {activityLog.length === 0 ? (
              <div className="rounded-2xl bg-white/70 px-4 py-8 text-center text-sm text-[#4E5A51]">
                No session has been completed yet. Finish Session 1 to start the log.
              </div>
            ) : (
              <div className="space-y-3">
                {activityLog.map((logItem) => (
                  <div
                    key={logItem.id}
                    className="rounded-2xl bg-white/75 px-4 py-4"
                  >
                    <p className="font-medium text-[#0F1912]">{logItem.message}</p>
                    <p className="mt-1 text-xs text-stone-500">
                      {formatCompletedAt(logItem.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
