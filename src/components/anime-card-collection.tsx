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
    <section className="w-full pl-2 sm:pl-6">
      <div className="flex items-center mb-8">
        <h2 className="text-4xl font-bold text-white mr-6">{title}</h2>
        <button className="ml-auto flex items-center justify-center w-10 h-10 rounded-lg border border-[#49638A] bg-transparent p-0 hover:bg-blue-900 transition-colors">
          <ArrowRightIcon href="#" />
        </button>
      </div>
      <div className="flex flex-row gap-12">
        {items.map((anime, idx) => (
          <AnimeCard key={anime.slug || idx} {...anime} />
        ))}
      </div>
    </section>
  );
};

export default AnimeCardCollection;
