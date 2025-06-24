import React from "react";
import { Filter, MoreVertical } from "lucide-react";

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
}

const AnimeEpisodesSection: React.FC<AnimeEpisodesSectionProps> = ({
  episodes,
  episodeOrder,
  setEpisodeOrder,
}) => {
  const filteredEpisodes = [...episodes];
  if (episodeOrder === "newest") filteredEpisodes.reverse();

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold">
          {filteredEpisodes[0]?.animeTitle || "Епізоди"}
        </h2>
        <div className="flex items-center gap-6">
          <button
            className="flex items-center gap-2 text-white text-sm font-medium cursor-pointer"
            onClick={() =>
              setEpisodeOrder(episodeOrder === "oldest" ? "newest" : "oldest")
            }
          >
            <Filter className="w-6 h-6" />
            {episodeOrder === "oldest" ? "Спочатку старі" : "Спочатку нові"}
          </button>
          <MoreVertical className="w-8 h-8 text-white cursor-pointer" />
          <span className="text-white text-sm font-medium">Опції</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredEpisodes.map((ep) => (
          <div key={ep.id} className="flex flex-col">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3">
              <img
                src={ep.preview}
                alt={ep.title}
                className="w-full h-full object-cover"
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
            <div className="text-[#B6B6B6] text-sm mb-1">{ep.animeTitle}</div>
            <div className="text-white text-sm font-bold mb-1">{ep.title}</div>
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
