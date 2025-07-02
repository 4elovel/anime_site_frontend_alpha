import React from "react";
import CardCollection from "@/components/card-collection";

interface AnimeCardData {
  image: string;
  title: string;
  year?: number;
  media_type?: string;
  slug?: string;
}

interface CharacterAnimeListProps {
  animes: AnimeCardData[];
}

const CharacterAnimeList: React.FC<CharacterAnimeListProps> = ({ animes }) => {
  if (!animes || animes.length === 0) return null;
  return (
    <div className="mt-8">
      <CardCollection title="Аніме персонажа" items={animes} cardType="anime" />
    </div>
  );
};

export default CharacterAnimeList;
