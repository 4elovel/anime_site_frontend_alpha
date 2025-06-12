import React from "react";
import AnimeCard, { AnimeCardProps } from "@/components/anime-card";
import ArrowRightIcon from "@/components/ui/arrow-right-icon";

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
          <ArrowRightIcon href="#" className="w-7 h-7" />
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
