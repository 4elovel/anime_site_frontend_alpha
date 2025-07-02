import React from "react";
import { Filter, MoreVertical } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

interface Episode {
  id: number;
  animeTitle: string;
  title: string;
  preview: string;
  audio: string;
  subs: string;
}

interface AnimeEpisodesSectionProps {
  episodes: Episode[];
  episodeOrder: "newest" | "oldest";
  setEpisodeOrder: (order: "newest" | "oldest") => void;
  isLoading?: boolean;
}

const AnimeEpisodesSection: React.FC<AnimeEpisodesSectionProps> = ({
  episodes,
  episodeOrder,
  setEpisodeOrder,
  isLoading = false,
}) => {
  const filteredEpisodes = [...episodes];
  if (episodeOrder === "newest") filteredEpisodes.reverse();

  return (
    <div className="mt-4 w-full max-w-[700px]">
      <div className="flex items-center justify-between mb-6">
        {isLoading ? (
          <Skeleton height={32} width={180} />
        ) : (
          <h2 className="text-white text-2xl font-bold">
            {filteredEpisodes[0]?.animeTitle || "Епізоди"}
          </h2>
        )}
        <div className="flex items-center gap-6">
          {isLoading ? (
            <>
              <Skeleton height={36} width={120} />
              <Skeleton height={36} width={36} />
              <Skeleton height={24} width={60} />
            </>
          ) : (
            <>
              <button
                className="flex items-center gap-2 text-white text-sm font-medium cursor-pointer"
                onClick={() =>
                  setEpisodeOrder(
                    episodeOrder === "oldest" ? "newest" : "oldest"
                  )
                }
              >
                <Filter className="w-6 h-6" />
                {episodeOrder === "oldest" ? "Спочатку старі" : "Спочатку нові"}
              </button>
              <MoreVertical className="w-8 h-8 text-white cursor-pointer" />
              <span className="text-white text-sm font-medium">Опції</span>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#44454A] scrollbar-track-transparent">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col min-w-[210px] md:min-w-[220px] max-w-[240px]"
              >
                <Skeleton height={120} className="mb-3" />
                <Skeleton height={18} width={120} className="mb-1" />
                <Skeleton height={18} width={160} className="mb-1" />
                <Skeleton height={18} width={100} />
              </div>
            ))
          : filteredEpisodes.map((ep) => (
              <div
                key={ep.id}
                className="flex flex-col min-w-[210px] md:min-w-[220px] max-w-[240px]"
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3">
                  <Image
                    src={ep.preview}
                    alt={ep.title}
                    fill
                    className="w-full h-full object-cover"
                    style={{objectFit: 'cover'}}
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition cursor-pointer">
                    <svg
                      width="80"
                      height="80"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="30,20 60,40 30,60" />
                    </svg>
                  </button>
                </div>
                <div className="text-[#B6B6B6] text-sm mb-1">
                  {ep.animeTitle}
                </div>
                <div className="text-white text-sm font-bold mb-1">
                  {ep.title}
                </div>
                <div className="text-[#B6B6B6] text-sm flex items-center gap-2">
                  {ep.audio} <span className="mx-2">|</span> {ep.subs}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default AnimeEpisodesSection;
