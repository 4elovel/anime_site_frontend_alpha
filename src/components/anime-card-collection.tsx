import React from "react";
import AnimeCard, { AnimeCardProps } from "@/components/anime-card";

interface AnimeCardCollectionProps {
  title?: string;
  items: AnimeCardProps[];
}

const AnimeCardCollection: React.FC<AnimeCardCollectionProps> = ({
  title = "Аніме",
  items,
}) => {
  return (
    <section className="w-full pl-2 sm:max-w-screen sm:pl-6">
      <div className="flex items-center mb-8">
        <h2 className="text-4xl font-bold text-white mr-6">{title}</h2>
        <button className="ml-auto rounded-xl border border-blue-400 p-2 text-white hover:bg-blue-900 transition-colors">
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col w-full gap-6 sm:flex-row sm:gap-12">
        {items.map((anime, idx) => (
          <div key={anime.slug || idx} className="w-full  p-7 sm:p-0">
            <AnimeCard {...anime} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimeCardCollection;
