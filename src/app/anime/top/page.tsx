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

const getSortIcon = (dir: "asc" | "desc") =>
  dir === "asc" ? (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      className="ml-1 inline align-middle"
      viewBox="0 0 16 16"
    >
      <path d="M8 4l4 6H4l4-6z" />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      className="ml-1 inline align-middle"
      viewBox="0 0 16 16"
    >
      <path d="M8 12l-4-6h8l-4 6z" />
    </svg>
  );

const TopAnimePage: FC = () => {
  const [sort, setSort] = useState("rating");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const sortedAnime = [...topAnime].sort((a, b) => {
    let result = 0;
    if (sort === "az") result = a.title.localeCompare(b.title, "uk");
    if (sort === "rating") result = b.rating - a.rating;
    if (sort === "year") result = b.year - a.year;
    return direction === "asc" ? -result : result;
  });

  return (
    <>
      <div className="min-h-screen px-1 pt-8 pb-10 sm:px-4 md:px-8 md:pt-12 md:pb-16">
        <div className="mx-auto max-w-[1440px]">
          <h1 className="xs:text-3xl mb-2 text-center text-2xl leading-tight font-bold text-white drop-shadow-lg sm:text-4xl">
            Топ <span className="text-blue-400">100</span> аніме
          </h1>
          <p className="xs:text-lg mb-6 text-center text-base leading-snug font-medium text-neutral-400 sm:mb-8">
            Сотні <span className="text-blue-400">видатних</span> аніме, які
            варто подивитися <span className="text-blue-400">кожному</span>
          </p>
          <div className="mt-4 flex w-full justify-center">
            <div
              className="h-0 w-full border-t-[2px]"
              style={{
                borderImageSource:
                  "linear-gradient(90deg, rgba(73, 99, 138, 0) 0%, rgba(73, 99, 138, 0.5) 50%, rgba(73, 99, 138, 0) 100%)",
                borderImageSlice: 1,
              }}
            />
          </div>
          <div className="scrollbar-thin scrollbar-thumb-[#232b45] mt-6 mb-4 flex items-center justify-end gap-2 overflow-x-auto">
            <div className="relative flex items-center">
              <button
                className="mr-2 text-white transition-colors hover:text-blue-400"
                onClick={() =>
                  setDirection((dir) => (dir === "asc" ? "desc" : "asc"))
                }
                aria-label="Змінити напрям сортування"
                type="button"
              >
                {getSortIcon(direction)}
              </button>
              <select
                className="xs:min-w-[140px] min-w-[120px] rounded-lg border border-[#232b45] bg-[#181f33] px-3 py-2 text-white focus:outline-none"
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
            <div className="xs:grid-cols-2 grid min-w-[320px] grid-cols-2 justify-items-center gap-x-4 gap-y-6 transition-all sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
