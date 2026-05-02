"use client";
import React from "react";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export default function AssessmentChart() {
  const assessments = [
    {
      title: "Anxiety Scale",
      color: "#4A7373",
      fillId: "anxietyFill",
      data: [
        { month: "May", value: 26 },
        { month: "Jun", value: 23 },
        { month: "Jul", value: 20 },
        { month: "Aug", value: 19 },
        { month: "Sep", value: 18 },
        { month: "Oct", value: 16 },
      ],
    },
    {
      title: "Depression Scale",
      color: "#6B4D5F",
      fillId: "depressionFill",
      data: [
        { month: "May", value: 24 },
        { month: "Jun", value: 22 },
        { month: "Jul", value: 19 },
        { month: "Aug", value: 17 },
        { month: "Sep", value: 16 },
        { month: "Oct", value: 14 },
      ],
    },
    {
      title: "Anger",
      color: "#A8553D",
      fillId: "angerFill",
      data: [
        { month: "May", value: 20 },
        { month: "Jun", value: 18 },
        { month: "Jul", value: 21 },
        { month: "Aug", value: 16 },
        { month: "Sep", value: 14 },
        { month: "Oct", value: 12 },
      ],
    },
    {
      title: "Social Phobia",
      color: "#5C5E8B",
      fillId: "socialPhobiaFill",
      data: [
        { month: "May", value: 28 },
        { month: "Jun", value: 25 },
        { month: "Jul", value: 22 },
        { month: "Aug", value: 20 },
        { month: "Sep", value: 18 },
        { month: "Oct", value: 15 },
      ],
    },
    {
      title: "OCD",
      color: "#6B7F5F",
      fillId: "ocdFill",
      data: [
        { month: "May", value: 25 },
        { month: "Jun", value: 24 },
        { month: "Jul", value: 22 },
        { month: "Aug", value: 19 },
        { month: "Sep", value: 17 },
        { month: "Oct", value: 15 },
      ],
    },
    {
      title: "Specific Phobia",
      color: "#7D5A3D",
      fillId: "specificPhobiaFill",
      data: [
        { month: "May", value: 21 },
        { month: "Jun", value: 20 },
        { month: "Jul", value: 18 },
        { month: "Aug", value: 16 },
        { month: "Sep", value: 14 },
        { month: "Oct", value: 11 },
      ],
    },
    {
      title: "Pain",
      color: "#9B5D52",
      fillId: "painFill",
      data: [
        { month: "May", value: 23 },
        { month: "Jun", value: 24 },
        { month: "Jul", value: 21 },
        { month: "Aug", value: 20 },
        { month: "Sep", value: 18 },
        { month: "Oct", value: 17 },
      ],
    },
    {
      title: "Stress & Burnout",
      color: "#A07238",
      fillId: "stressFill",
      data: [
        { month: "May", value: 29 },
        { month: "Jun", value: 27 },
        { month: "Jul", value: 24 },
        { month: "Aug", value: 23 },
        { month: "Sep", value: 19 },
        { month: "Oct", value: 16 },
      ],
    },
    {
      title: "Addiction",
      color: "#5C4438",
      fillId: "addictionFill",
      data: [
        { month: "May", value: 19 },
        { month: "Jun", value: 22 },
        { month: "Jul", value: 20 },
        { month: "Aug", value: 17 },
        { month: "Sep", value: 15 },
        { month: "Oct", value: 13 },
      ],
    },
    {
      title: "Self-Esteem",
      color: "#A38442",
      fillId: "selfEsteemFill",
      data: [
        { month: "May", value: 11 },
        { month: "Jun", value: 14 },
        { month: "Jul", value: 16 },
        { month: "Aug", value: 18 },
        { month: "Sep", value: 21 },
        { month: "Oct", value: 24 },
      ],
    },
    {
      title: "Worry",
      color: "#4F627A",
      fillId: "worryFill",
      data: [
        { month: "May", value: 27 },
        { month: "Jun", value: 25 },
        { month: "Jul", value: 22 },
        { month: "Aug", value: 20 },
        { month: "Sep", value: 17 },
        { month: "Oct", value: 15 },
      ],
    },
    {
      title: "Trauma",
      color: "#3F3F47",
      fillId: "traumaFill",
      data: [
        { month: "May", value: 30 },
        { month: "Jun", value: 28 },
        { month: "Jul", value: 24 },
        { month: "Aug", value: 21 },
        { month: "Sep", value: 19 },
        { month: "Oct", value: 16 },
      ],
    },
  ];

  return (
    <div className="mt-2">
      <div className="space-y-6">
        {assessments.map((assessment) => (
          <div
            key={assessment.title}
            className="rounded-[28px] border border-stone-200/80 bg-[#F8F7F3] p-6 shadow-[0_18px_40px_rgba(28,25,23,0.08)] md:p-8"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="font-serif text-[22px] font-normal leading-tight text-stone-900 md:text-[26px]">
                {assessment.title}
              </h2>
              <div className="mt-1 flex items-center gap-2 text-[12px] text-stone-500 md:text-[13px]">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: assessment.color }}
                ></div>
                <span>Last 6 months</span>
              </div>
            </div>

            <div className="h-[180px] md:h-[210px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={assessment.data}
                  margin={{ top: 10, right: 8, left: -18, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={assessment.fillId}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={assessment.color}
                        stopOpacity={0.22}
                      />
                      <stop
                        offset="95%"
                        stopColor={assessment.color}
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="0"
                    stroke="#E7E5E4"
                    vertical={true}
                    horizontal={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    dy={12}
                    tick={{ fill: "#78716C", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    dx={-6}
                    tick={{ fill: "#A8A29E", fontSize: 11 }}
                    domain={[0, 40]}
                    ticks={[0, 10, 20, 30, 40]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={assessment.color}
                    strokeWidth={1.5}
                    fill={`url(#${assessment.fillId})`}
                    dot={false}
                    activeDot={{ r: 3, fill: assessment.color, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
