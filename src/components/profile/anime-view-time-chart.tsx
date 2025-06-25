import React from "react";
import { ChartPie } from "lucide-react";

// Mock data
const months = 2;
const days = 4;
const totalHours = 1523;
// The progress (0.45 = 45% of the bar is filled)
const progress = 0.45;

export default function AnimeViewTimeChart() {
  return (
    <div className="hidden rounded-xl md:flex flex-col items-start justify-center p-3 border border-white bg-transparent gap-1 w-90 max-h-28">
      <div className="flex items-center gap-2">
        <ChartPie className="w-6 h-6 text-[#787880]" />
        <span className="text-[1rem] font-[500] text-[#787880]">Час аніме</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="text-[1.25rem] font-bold text-white leading-tight">
          {months} місяці {days} дні
        </span>
        <span className="text-[1rem] font-[500] text-[#787880]">
          {totalHours} години
        </span>
      </div>
      <div className="w-full mt-2">
        <div className="relative w-full h-2.5">
          {/* Bar background */}
          <div className="absolute top-0 left-0 w-full h-2.5 rounded-full bg-[#23242b]" />
          {/* Bar foreground */}
          <div
            className="absolute top-0 left-0 h-2.5 rounded-full bg-[#46618E] transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
