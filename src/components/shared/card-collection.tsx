import React from "react";
import AnimeCard, { AnimeCardProps } from "@/components/shared/anime-card";
import ArrowRightIcon from "@/components/ui/arrow-right-icon";
import VoiceActorCard from "../shared/voice-actor-card";
import { Anek_Malayalam } from "next/font/google";

interface CardCollectionProps {
  title?: string;
  items: any[];
  cardType: string;
  showArrowRightIcon?: boolean;
  arrowRightIconUrl?: string;
}

const CardCollection: React.FC<CardCollectionProps> = ({
  title = "Аніме",
  items,
  showArrowRightIcon = false,
  arrowRightIconUrl = "#",
  cardType = "anime",
}) => {
  return (
    <section className="w-full sm:max-w-screen">
      <div className="mb-8 flex items-center">
        <h2 className="xs:text-lg text-4xl font-bold tracking-tight text-white sm:text-2xl">
          {title}
        </h2>
        {showArrowRightIcon && (
          <button className="ml-auto rounded-xl border border-blue-400 p-2 text-white transition-colors hover:bg-blue-900">
            <ArrowRightIcon href={arrowRightIconUrl} className="h-7 w-7" />
          </button>
        )}
      </div>
      <div className="flex w-full flex-col sm:flex-row sm:flex-wrap max-md:sm:justify-center">
        {items.map((anime, idx) => (
          <div
            key={anime.slug || idx}
            className="w-full p-2 max-md:sm:w-1/2 md:w-1/4"
          >
            {cardType === "anime" && <AnimeCard {...anime} />}
            {cardType === "voice-actor" && <VoiceActorCard {...anime} />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardCollection;
