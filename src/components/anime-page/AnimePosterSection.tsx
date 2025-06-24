import React from "react";
import ActionButton from "@/components/ui/action-button";
import ArrowDown from "@/assets/arrow-down.svg";
import { Play } from "lucide-react";

interface AnimePosterSectionProps {
  poster: string;
  name: string;
}

const AnimePosterSection: React.FC<AnimePosterSectionProps> = ({
  poster,
  name,
}) => (
  <div className="flex flex-col items-center gap-4 min-w-[260px]">
    <img
      src={poster}
      alt={name}
      className="rounded-2xl w-[260px] h-[360px] object-cover shadow-xl border border-zinc-700"
    />
    <div className="flex flex-col gap-3 w-full mt-2">
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
    </div>
  </div>
);

export default AnimePosterSection;
