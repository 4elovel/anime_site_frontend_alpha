import React from "react";
import { ChartSpline } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

// Dummy data for the bars. Values between 0 and 1 represent the "fill" percentage.
const activityData = [
  0.4, 0.2, 0.2, 0.2, 0.6, 0.5, 0.7, 0.3, 0.5, 0.7, 0.2, 0.5,
];

export default function ActivityBarChart({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <div className="hidden max-h-28 max-w-120 flex-col items-start justify-center gap-1 rounded-xl border border-white bg-transparent p-3 md:flex lg:w-90">
      <div className="flex items-center gap-2">
        <ChartSpline className="h-6 w-6 text-[#787880]" />
        <span className="text-[1rem] font-[500] text-[#787880]">
          Активність
        </span>
      </div>
      {isLoading ? (
        <Skeleton className="h-12 w-full bg-stone-500" />
      ) : (
        <div className="flex w-full justify-between">
          {activityData.map((value, i) => (
            <div
              key={i}
              className="relative flex h-12 w-2.5 flex-col items-center justify-end lg:w-3"
            >
              <div className="h-full w-full rounded-full bg-[#23242b] transition-all" />
              <div
                className="absolute bottom-0 w-full rounded-full bg-[#46618E] transition-all duration-500"
                style={{ height: `${Math.round(value * 64)}px` }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
