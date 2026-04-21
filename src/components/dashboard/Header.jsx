"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  IoNotificationsOutline,
  IoBookOutline,
  IoCalendarOutline,
  IoStatsChartOutline,
  IoCheckmarkCircleOutline,
  IoPersonOutline,
  IoShieldCheckmarkOutline,
  IoLogOutOutline,
  IoChevronDown,
  IoDiamondOutline,
  IoSparklesSharp,
} from "react-icons/io5";
import { useLogoutMutation } from "@/redux/features/login";
import { useStoredAuth } from "@/redux/authStorage";
import { useGetProfileQuery } from "@/redux/features/profile";
import { selectCurrentUser } from "@/redux/slices/authSlice";

const getProfilePayload = (response) => response?.data ?? response ?? null;

const getDisplayName = (user) => user?.fullName || user?.name || "Profile";

const getAvatarUrl = (user) => {
  const avatar = user?.avatar || user?.profilePic;

  if (avatar) {
    return avatar;
  }

  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    getDisplayName(user),
  )}`;
};

export default function Header() {
  const { token } = useStoredAuth();
  const authUser = useSelector(selectCurrentUser);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { data } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  const notificationsRef = useRef(null);
  const profileMenuRef = useRef(null);
  const currentUser = getProfilePayload(data) || authUser;
  const avatarUrl = getAvatarUrl(currentUser);

  const notifications = [
    {
      id: 1,
      type: "homework",
      title: "Homework Assignment",
      description: "Breathwork practice added for your evening routine.",
      time: "2 mins ago",
      unread: true,
      icon: <IoBookOutline className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      type: "session",
      title: "Preparation Reminder",
      description: "Start your pre-session grounding in 45 minutes.",
      time: "1 hour ago",
      unread: true,
      icon: <IoCalendarOutline className="w-5 h-5" />,
      color: "bg-purple-500",
    },
    {
      id: 3,
      type: "milestone",
      title: "New Milestone!",
      description: "Congratulations! You've maintained consistency for 7 days.",
      time: "5 hours ago",
      unread: false,
      icon: <IoStatsChartOutline className="w-5 h-5" />,
      color: "bg-amber-500",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
    } finally {
      setShowProfileMenu(false);
      router.replace("/authentication/login");
    }
  };

  return (
    <header className="flex items-center justify-end px-8 py-4 bg-transparent relative z-[100]">
      <div className="flex items-center gap-4">
        {/* Glow Container */}
        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-[20px] rounded-[30px] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-white/60 relative group">
          {/* Notifications Button */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-1.5 rounded-2xl transition-all duration-500 cursor-pointer relative group/bell ${showNotifications
                ? "bg-[#5a7c5a] text-white"
                : "text-stone-400 hover:text-[#5a7c5a] hover:bg-white"
                }`}
            >
              {/* <IoNotificationsOutline
                className={`w-5 h-5 transition-transform duration-300 ${showNotifications ? "" : "group-hover/bell:rotate-[15deg]"}`}
              /> */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.6">
                  <path d="M15.5 18.5C15.5 20.433 13.933 22 12 22C10.067 22 8.5 20.433 8.5 18.5" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M19 11V12.7558C19 13.5514 19.3161 14.3145 19.8787 14.8771L20.4819 15.4803C20.8136 15.8121 21 16.262 21 16.7311C21 17.708 20.208 18.5 19.2311 18.5H4.76887C3.79195 18.5 3 17.708 3 16.7311C3 16.262 3.18636 15.8121 3.51809 15.4803L4.12132 14.8771C4.68393 14.3145 5 13.5514 5 12.7558V10C5 6.13401 8.13401 3 12 3" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <path d="M20.6404 5.12C20.6404 3.39687 19.2435 2 17.5204 2C15.7973 2 14.4004 3.39687 14.4004 5.12C14.4004 6.84313 15.7973 8.24 17.5204 8.24C19.2435 8.24 20.6404 6.84313 20.6404 5.12Z" fill="#FF3D3D" />
                <path d="M20.6404 5.12C20.6404 3.39687 19.2435 2 17.5204 2C15.7973 2 14.4004 3.39687 14.4004 5.12C14.4004 6.84313 15.7973 8.24 17.5204 8.24C19.2435 8.24 20.6404 6.84313 20.6404 5.12Z" fill="black" fill-opacity="0.05" />
              </svg>

              {/* <AnimatePresence>
                {notifications.some((n) => n.unread) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-sm"
                  />
                )}
              </AnimatePresence> */}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 15, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 10, x: 10 }}
                  className="absolute top-full right-0 mt-6 w-[380px] bg-white/95 backdrop-blur-[30px] rounded-[35px] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.25)] border border-white/50 overflow-hidden origin-top-right"
                >
                  <div className="p-7 bg-stone-50/50 flex items-center justify-between border-b border-stone-100/50">
                    <h3 className="text-stone-800  text-xl font-semibold">
                      Notification
                    </h3>
                  </div>

                  <div className="p-3 max-h-[450px] overflow-y-auto space-y-2">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-5 rounded-[28px] transition-all duration-500 cursor-pointer relative ${notification.unread
                          ? "bg-[#5a7c5a]/5"
                          : "bg-transparent hover:bg-stone-50"
                          }`}
                      >
                        <div className="flex gap-4">
                          <div
                            className={`w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0 shadow-lg shadow-black/5 ${notification.color} text-white`}
                          >
                            {notification.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-0.5">
                              <h4 className="text-[14px] font-black text-stone-800">
                                {notification.title}
                              </h4>
                              <span className="text-[9px] text-stone-300 font-bold uppercase tracking-wider">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-2 italic">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* <div className="w-[1px] h-4 bg-stone-200" /> */}


          <div className="">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.6">
                <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="black" stroke-width="1.25" />
                <path d="M20.7906 9.15201C21.5969 10.5418 22 11.2366 22 12C22 12.7634 21.5969 13.4582 20.7906 14.848L18.8669 18.1638C18.0638 19.548 17.6623 20.2402 17.0019 20.6201C16.3416 21 15.5402 21 13.9373 21H10.0627C8.45982 21 7.6584 21 6.99807 20.6201C6.33774 20.2402 5.93619 19.548 5.13311 18.1638L3.20942 14.848C2.40314 13.4582 2 12.7634 2 12C2 11.2366 2.40314 10.5418 3.20942 9.152L5.13311 5.83621C5.93619 4.45196 6.33774 3.75984 6.99807 3.37992C7.6584 3 8.45982 3 10.0627 3H13.9373C15.5402 3 16.3416 3 17.0019 3.37992C17.6623 3.75984 18.0638 4.45197 18.8669 5.83622L20.7906 9.15201Z" stroke="black" stroke-width="1.25" />
              </g>
            </svg>
          </div>


          {/* Unique Profile Trigger */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2  bg-white/20 hover:bg-white rounded-[22px] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer border border-transparent hover:border-[#5a7c5a]/10"
            >
              <div className="relative">
                <div className="relative w-10 h-10 bg-stone-200 rounded-full overflow-hidden border border-white shadow-inner">
                  <Image
                    src={avatarUrl}
                    alt={getDisplayName(currentUser)}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              </div>

            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 10 }}
                  className="absolute top-full right-0 mt-6 w-[280px] bg-white/95 backdrop-blur-[30px] rounded-[35px] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.25)] border border-white/50 overflow-hidden origin-top-right p-3"
                >
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "rgb(250, 250, 249)",
                        }}
                        className="flex items-center gap-4 p-2 rounded-[25px] transition-all group cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
                          <IoPersonOutline size={14} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-black text-stone-800">
                            My Sanctum
                          </p>
                          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-tighter italic">
                            Personal Workspace
                          </p>
                        </div>
                      </motion.div>
                    </Link>

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "rgb(250, 250, 249)",
                        }}
                        className="flex items-center gap-4 p-4 rounded-[25px] transition-all group cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-[#5a7c5a]/10 text-[#5a7c5a] rounded-2xl flex items-center justify-center transition-transform group-hover:-rotate-12">
                          <IoShieldCheckmarkOutline size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-black text-stone-800">
                            Security Core
                          </p>
                          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-tighter italic">
                            Auth & Privacy
                          </p>
                        </div>
                      </motion.div>
                    </Link>

                    {/* <div className="p-4 mt-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[28px] relative overflow-hidden group cursor-pointer">
                      <div className="relative z-10 flex items-center justify-between text-white">
                        <div>
                          <p className="text-[12px] font-black">Elite Hub</p>
                          <p className="text-[9px] font-bold opacity-70">Expand access</p>
                        </div>
                        <IoSparklesSharp className="animate-pulse" />
                      </div>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl group-hover:scale-150 transition-transform duration-700" />
                    </div> */}

                    <div className="mt-2 pt-2 border-t border-stone-100 px-2 pb-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center justify-between px-6 py-4 rounded-[22px] hover:bg-rose-50 text-stone-400 hover:text-rose-500 transition-all font-black text-[11px] uppercase tracking-[1.5px] group cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isLoggingOut ? "Logging out" : "Logout"}
                        <IoLogOutOutline
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
