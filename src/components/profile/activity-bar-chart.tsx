import React from "react";
import { ChartSpline } from "lucide-react";

// Dummy data for the bars. Values between 0 and 1 represent the "fill" percentage.
const activityData = [
  0.4, 0.2, 0.2, 0.2, 0.6, 0.5, 0.7, 0.3, 0.5, 0.7, 0.2, 0.5,
];

export default function ActivityBarChart() {
  return (
    <div className="hidden rounded-xl md:flex flex-col items-start justify-center p-3 border border-white bg-transparent gap-1 max-w-120 max-h-28">
      <div className="flex items-center gap-2">
        <ChartSpline className="w-6 h-6 text-[#787880]" />
        <span className="text-[1rem] font-[500] text-[#787880]">
          Активність
        </span>
      </div>
      <div className="flex gap-3 justify-between">
        {activityData.map((value, i) => (
          <div
            key={i}
            className="relative flex flex-col justify-end items-center"
            style={{ height: 49, width: 10 }}
          >
            {/* Bar background */}
            <div className="w-full h-full rounded-full bg-[#23242b]" />
            {/* Bar foreground */}
            <div
              className="absolute bottom-0 w-full rounded-full transition-all duration-500 bg-[#46618E]"
              style={{ height: `${Math.round(value * 64)}px` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
