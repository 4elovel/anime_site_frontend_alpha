import React from "react";
import { ChartPie } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

// Mock data
const months = 2;
const days = 4;
const totalHours = 1523;
// The progress (0.45 = 45% of the bar is filled)
const progress = 0.45;

export default function AnimeViewTimeChart({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <div className="hidden max-h-28 w-90 flex-col items-start justify-center gap-1 rounded-xl border border-white bg-transparent p-3 md:flex">
      <div className="flex items-center gap-2">
        <ChartPie className="h-6 w-6 text-[#787880]" />
        <span className="text-[1rem] font-[500] text-[#787880]">Час аніме</span>
      </div>
      {isLoading ? (
        <Skeleton className="h-12 w-full bg-stone-500" />
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            <span className="text-[1.25rem] leading-tight font-bold text-white">
              {months} місяці {days} дні
            </span>
            <span className="text-[1rem] font-[500] text-[#787880]">
              {totalHours} години
            </span>
          </div>
          <div className="mt-2 w-full">
            <div className="relative h-2.5 w-full">
              {/* Bar background */}
              <div className="absolute top-0 left-0 h-2.5 w-full rounded-full bg-[#23242b]" />
              {/* Bar foreground */}
              <div
                className="absolute top-0 left-0 h-2.5 rounded-full bg-[#46618E] transition-all duration-500"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
