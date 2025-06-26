import React from "react";
import Image from "next/image";

interface ReleaseCardProps {
  image?: string;
  title?: string;
  engTitle?: string;
  episodes?: number;
  date?: string;
}

function getEpisodesText(episodes: number) {
  const lastTwo = episodes % 100;
  const last = episodes % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${episodes} епізодів`;
  if (last === 1) return `${episodes} епізод`;
  if (last >= 2 && last <= 4) return `${episodes} епізоди`;
  return `${episodes} епізодів`;
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({
  image = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop&crop=faces",
  title = "Від селянина з глухроор.",
  engTitle = "Katainaka no Ossan, Kensei ni Naru",
  episodes = 8,
  date = "20.05",
}) => (
  <div className="w-full h-[140px] rounded-2xl px-4 py-3 flex items-center">
    <div className="w-[120px] h-[180px] rounded-xl overflow-hidden flex-shrink-0 mr-4">
      <Image src={image} alt={title} width={120} height={180} className="w-full h-full object-cover" />
    </div>
    <div className="flex flex-col flex-1 min-w-0">
      <div className="text-white text-lg font-semibold leading-tight whitespace-normal break-words">
        {title}
      </div>
      <div className="text-gray-400 text-xs whitespace-normal break-words">
        {engTitle}
      </div>
      <div className="flex items-center mt-1 gap-3 justify-between w-full">
        <div className="text-gray-400 text-sm">{getEpisodesText(episodes)}</div>
        <span
          className="border border-[#4B7FCC] rounded-xl px-3 py-1 text-[#4B7FCC] font-medium text-sm leading-none"
          style={{ lineHeight: "20px" }}
        >
          {date}
        </span>
      </div>
    </div>
  </div>
);

export default ReleaseCard;
