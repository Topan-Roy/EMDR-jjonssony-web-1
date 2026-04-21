"use client";
import React, { useEffect, useState } from "react";
import { useStoredAuth } from "@/redux/authStorage";

const BILATERAL_ICON_CATEGORY_NAME = "bilateral stimulation visual icon";

export const getBilateralIcons = async (token) => {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.VITE_BASE_URL || "";
  const baseUrl = rawBaseUrl.endsWith("/")
    ? rawBaseUrl.slice(0, -1)
    : rawBaseUrl;

  if (!baseUrl) {
    throw new Error("Image service is not configured.");
  }

  if (!token) {
    throw new Error("Please sign in again to load visual icons.");
  }

  const response = await fetch(`${baseUrl}/api/media?page=1&limit=20`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  if (!response.ok || !result?.success) {
    throw new Error("Failed to fetch visual icons.");
  }

  return (result?.data?.media || [])
    .filter(
      (item) =>
        item?.mediaType === "image" &&
        item?.status === "active" &&
        item?.categoryId?.categoryName?.trim()?.toLowerCase() ===
          BILATERAL_ICON_CATEGORY_NAME
    )
    .map((item, index) => ({
      id: item?._id,
      name: item?.name || `Icon ${index + 1}`,
      img: item?.url,
    }));
};

export default function VisualIconSelector({ selectedId, onSelect }) {
  const { token } = useStoredAuth();
  const [icons, setIcons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        setIsLoading(true);
        setError("");

        const items = await getBilateralIcons(token);
        setIcons(items);
      } catch (fetchError) {
        console.error("Error fetching bilateral icons:", fetchError);
        setError(fetchError.message || "Unable to load visual icons.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIcons();
  }, [token]);

  useEffect(() => {
    if (!selectedId && icons[0]?.id) {
      onSelect(icons[0].id);
    }
  }, [icons, onSelect, selectedId]);

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-white/20">
      <h3 className="text-lg sm:text-xl font-serif text-[#0F1912] mb-4">
        Visual
      </h3>

      {isLoading ? (
        <div className="rounded-2xl bg-white/70 px-4 py-8 text-center text-stone-700">
          Loading visual icons...
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-red-50 px-4 py-8 text-center text-red-600">
          {error}
        </div>
      ) : icons.length === 0 ? (
        <div className="rounded-2xl bg-white/70 px-4 py-8 text-center text-stone-700">
          No visual icons found.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {icons.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl p-4 transition-all ${
                selectedId === item.id
                  ? "border-2 border-dashed border-blue-400 bg-white shadow-md"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            >
              <div className="mb-1 flex h-8 w-8 items-center justify-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <span className="text-sm font-bold text-stone-900">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
