import React from "react";
import ActionButton from "@/components/ui/action-button";
import ArrowDown from "@/assets/arrow-down.svg";
import { Play } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface AnimePosterSectionProps {
  poster: string;
  name: string;
  isLoading?: boolean;
}

const AnimePosterSection: React.FC<AnimePosterSectionProps> = ({
  poster,
  name,
  isLoading = false,
}) => (
  <div className="flex flex-col items-center gap-4 min-w-[260px]">
    {isLoading ? (
      <Skeleton height={360} width={260} borderRadius={16} />
    ) : (
      <img
        src={poster}
        alt={name}
        className="rounded-2xl w-full h-[500px] md:w-[260px] md:h-[400px] object-cover shadow-xl border border-zinc-700"
      />
    )}
    <div className="flex flex-col gap-3 w-full mt-2">
      {isLoading ? (
        <>
          <Skeleton
            height={44}
            width={220}
            borderRadius={12}
            className="w-full"
          />
          <Skeleton
            height={44}
            width={220}
            borderRadius={12}
            className="w-full"
          />
        </>
      ) : (
        <>
          <ActionButton
            text="Додати до списку"
            icon={<ArrowDown size={22} />}
            colorClass="bg-zinc-700 text-white hover:bg-zinc-800"
            className="w-full"
          />
          <ActionButton
            text="Дивитись трейлер"
            icon={<Play size={18} />}
            colorClass="bg-zinc-700 text-white hover:bg-zinc-800"
            className="w-full"
          />
        </>
      )}
    </div>
  </div>
);

export default AnimePosterSection;
