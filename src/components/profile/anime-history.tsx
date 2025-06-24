import { Grid2x2, MoveRight } from "lucide-react";
import AnimeHistoryHeader from "@/components/profile/anime-history-header";
import AnimeCard from "@/components/profile/anime-card";

const animeList = [
  {
    id: 0,
    animeName: "Революціонерка Утена",
    watchedAge: 23,
    url: "/assets/profile/mock-history-anime-card.png",
  },
  {
    id: 1,
    animeName: "Озирнись",
    watchedAge: 23,
    url: "/assets/profile/mock-history-anime-card2.png", // Ensure every item has a url
  },
];

export default function AnimeHistory() {
  return (
    <div className="flex flex-col gap-4">
      <AnimeHistoryHeader />
      {animeList.map((anime) => (
        <AnimeCard
          key={anime.id}
          animeName={anime.animeName}
          watchedAge={anime.watchedAge}
          url={anime.url}
        />
      ))}
    </div>
  );
}
