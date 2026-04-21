"use client";
import React from "react";
import Link from "next/link";
export default function EMDRCategories() {
  const categories = [
    {
      title: "Behaviours",
      description: "Transform what you're doing or not doing",
      image: "/homeImage/gril.jpg",
      link: "/dashboard/behaviours",
    },
    {
      title: "Thoughts",
      description: "Understanding and reshaping your thinking",
      image: "/homeImage/thu.jpg",
      link: "/dashboard/thoughts",
    },
    {
      title: "Emotions",
      description: "Tools to manage bigger emotions",
      image: "/homeImage/gril.jpg",
      link: "/dashboard/emotions",
    },
  ];
  return (
    <div className="w-full rounded-3xl shadow-xl border border-white/50  p-3">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link key={index} href={category.link || "#"}>
              <div className="bg-[#FBFBFC] backdrop-blur-md rounded-3xl shadow-sm hover:shadow-lg p-10 text-center transition-all duration-300 cursor-pointer border border-white/40 group active:scale-95">
                <div className="mb-8 flex justify-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-[#6E967A] transition-colors duration-300">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-serif text-[#000000] mb-3 font-semibold">
                  {category.title}
                </h3>
                <p className="text-stone-600 text-base leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
