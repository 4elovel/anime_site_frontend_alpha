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
    <section className="w-full sm:max-w-screen">
      <div className="flex items-center mb-8">
        <h2 className="text-4xl font-bold text-white mr-6">{title}</h2>
        <button className="ml-auto rounded-xl border border-blue-400 p-2 text-white hover:bg-blue-900 transition-colors">
          <ArrowRightIcon href="#" className="w-7 h-7" />
        </button>
      </div>
      <div className="max-md:sm:justify-center flex flex-col sm:flex-wrap w-full sm:flex-row">
        {items.map((anime, idx) => (
          <div
            key={anime.slug || idx}
            className="md:w-1/4 max-md:sm:w-1/2 p-2 w-full"
          >
            <AnimeCard {...anime} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimeCardCollection;
