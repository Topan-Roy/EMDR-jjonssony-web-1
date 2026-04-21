"use client";
import React from "react";
import {
  MoveHorizontal,
  MoveVertical,
  MoveUpRight,
  MoveDownRight,
} from "lucide-react";

const directions = [
  { id: "horizontal", name: "Horizontal", Icon: MoveHorizontal },
  { id: "vertical", name: "Vertical", Icon: MoveVertical },
  { id: "diagonal-up", name: "Diagonal Up", Icon: MoveUpRight },
  { id: "diagonal-down", name: "Diagonal Down", Icon: MoveDownRight },
];

export default function BilateralDirectionSelector({ selectedId, onSelect }) {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/20 h-full">
      <h3 className="text-xl font-serif text-[#0F1912] mb-4">Direction</h3>
      <div className="flex gap-4">
        {directions.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex-1 flex flex-col items-center justify-center p-4 aspect-square rounded-2xl cursor-pointer transition-all ${
              selectedId === item.id
                ? "bg-white shadow-md scale-95 border-transparent"
                : "bg-white/50 hover:bg-white/80 border-transparent"
            }`}
          >
            <item.Icon
              size={24}
              className={`mb-2 ${
                selectedId === item.id ? "text-stone-900" : "text-stone-300"
              }`}
            />
            <span className="text-stone-900 text-xs font-bold leading-tight text-center">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
