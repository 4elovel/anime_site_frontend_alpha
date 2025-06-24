import React from "react";
import TopAnimeCard from "./top-anime-card";

interface Anime {
  image: string;
  title: string;
  year: number;
  type: string;
  rating: number;
}

interface TopAnimeListProps {
  items: Anime[];
  filterLabel?: string;
  showRank: boolean;
}

const TopAnimeList: React.FC<TopAnimeListProps> = ({
  items,
  filterLabel = "За сьогодні",
  showRank = true,
}) => {
  return (
    <section className="w-full max-w-[1400px] mx-auto py-10 xs:py-4">
      <div className="flex flex-col items-center mb-8 xs:mb-4 px-2">
        <h2 className="text-white text-4xl sm:text-2xl xs:text-lg font-bold tracking-tight text-center">
          Топ <span className="text-blue-400">10</span> аніме
        </h2>

        <div className="w-full flex justify-center mt-4">
          <div
            className="w-full h-0 border-t-[2px]"
            style={{
              borderImageSource:
                "linear-gradient(90deg, rgba(73, 99, 138, 0) 0%, rgba(73, 99, 138, 0.5) 50%, rgba(73, 99, 138, 0) 100%)",
              borderImageSlice: 1,
            }}
          />
        </div>
      </div>

      <div className="flex justify-end mb-8 xs:mb-4 px-2">
        <button className="flex items-center gap-2 text-white px-4 py-2 rounded-xl border border-[#918C8C80] text-lg xs:text-sm">
          {filterLabel}
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M6 9l6 6 6-6"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="w-full px-2">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-6 gap-y-10 xs:gap-x-4 xs:gap-y-6">
          {items.map((anime, idx) => (
            <TopAnimeCard
              key={anime.title + idx}
              image={anime.image}
              title={anime.title}
              year={anime.year}
              type={anime.type}
              rank={idx + 1}
              rating={anime.rating}
              showRank={showRank}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAnimeList;
