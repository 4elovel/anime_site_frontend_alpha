"use client";

import TopAnimeCard from "@/components/main-page/TopAnimeList/top-anime-card";
import Navbar from "@/components/nav/navbar";
import { FC, useState } from "react";

const topAnime = [
  {
    image: "/assets/profile/mock-history-anime-card.png",
    title: "Проводжальниця Фр...",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.3,
    href: "#",
  },
  {
    image: "/assets/profile/mock-history-anime-card2.png",
    title: "Тільки я візьму новий...",
    year: 2025,
    type: "TV Серіал",
    rank: 2,
    rating: 8.75,
    href: "#",
  },
  {
    image: "/assets/profile/mock-history-anime-card3.png",
    title: "Ван Піс",
    year: 1999,
    type: "TV Серіал",
    rank: 3,
    rating: 8.73,
    href: "#",
  },
  {
    image: "/assets/profile/mock-history-anime-card.png",
    title: "Доктор Стоун",
    year: 2019,
    type: "TV Серіал",
    rank: 4,
    rating: 8.27,
    href: "#",
  },
  {
    image: "/assets/profile/mock-history-anime-card2.png",
    title: "Полум'яні вогнеборці",
    year: 2025,
    type: "TV Серіал",
    rank: 5,
    rating: 7.96,
    href: "#",
  },
  {
    image: "/assets/profile/mock-history-anime-card3.png",
    title: "Кланнад: Після...",
    year: 2008,
    type: "TV Серіал",
    rank: 6,
    rating: 0,
    href: "#",
  },
  {
    image: "/assets/profile/mock-history-anime-card.png",
    title: "Форма голосу",
    year: 2016,
    type: "Фільм",
    rank: 7,
    rating: 0,
    href: "#",
  },
  {
    image: "/assets/profile/mock-history-anime-card2.png",
    title: "Березневий лев...",
    year: 2017,
    type: "TV Серіал",
    rank: 8,
    rating: 0,
    href: "#",
  },
  {
    image: "/assets/profile/mock-history-anime-card3.png",
    title: "Код Ґіас: Повст...",
    year: 2008,
    type: "TV Серіал",
    rank: 9,
    rating: 0,
    href: "#",
  },
  {
    image: "/assets/profile/mock-history-anime-card.png",
    title: "Монстр",
    year: 2004,
    type: "TV Серіал",
    rank: 10,
    rating: 0,
    href: "#",
  },
];

const sortOptions = [
  { label: "A-Я", value: "az" },
  { label: "Рейтинг", value: "rating" },
  { label: "Рік", value: "year" },
];


const getSortIcon = (dir: 'asc' | 'desc') => dir === 'asc' ? (
  <svg width="16" height="16" fill="currentColor" className="inline ml-1 align-middle" viewBox="0 0 16 16"><path d="M8 4l4 6H4l4-6z"/></svg>
) : (
  <svg width="16" height="16" fill="currentColor" className="inline ml-1 align-middle" viewBox="0 0 16 16"><path d="M8 12l-4-6h8l-4 6z"/></svg>
);

const TopAnimePage: FC = () => {
  const [sort, setSort] = useState("rating");
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');

  const sortedAnime = [...topAnime].sort((a, b) => {
    let result = 0;
    if (sort === "az") result = a.title.localeCompare(b.title, "uk");
    if (sort === "rating") result = b.rating - a.rating;
    if (sort === "year") result = b.year - a.year;
    return direction === 'asc' ? -result : result;
  });

  return (
    <>
    <div className="min-h-screen px-1 sm:px-4 md:px-8 pt-8 md:pt-12 pb-10 md:pb-16">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white text-center mb-2 drop-shadow-lg leading-tight">
          Топ <span className="text-blue-400">100</span> аніме
        </h1>
        <p className="text-center text-neutral-400 mb-6 sm:mb-8 text-base xs:text-lg font-medium leading-snug">
          Сотні <span className="text-blue-400">видатних</span> аніме, які варто подивитися <span className="text-blue-400">кожному</span>
        </p>
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
        <div className="flex justify-end mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#232b45] mt-6 gap-2 items-center">
          <div className="relative flex items-center">
            <button
              className="mr-2 text-white hover:text-blue-400 transition-colors"
              onClick={() => setDirection(dir => dir === 'asc' ? 'desc' : 'asc')}
              aria-label="Змінити напрям сортування"
              type="button"
            >
              {getSortIcon(direction)}
            </button>
            <select
              className="bg-[#181f33] text-white px-3 py-2 rounded-lg border border-[#232b45] focus:outline-none min-w-[120px] xs:min-w-[140px]"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full overflow-x-auto pb-2">
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6 transition-all justify-items-center min-w-[320px]">
            {sortedAnime.map((anime, idx) => (
              <TopAnimeCard
                key={anime.rank}
                image={anime.image}
                title={anime.title}
                year={anime.year}
                type={anime.type}
                rank={anime.rank}
                rating={anime.rating}
                showRank={idx < 5}
                href={anime.href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TopAnimePage; 