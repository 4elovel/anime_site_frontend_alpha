'use client'
import React, { useState } from "react";
import GenreCard from "@/components/main-page/genre-card";
import Navbar from "@/components/nav/navbar";

const tags = [
  {
    title: "Суперсили",
    description: (
      <>
        Аніме з тегом <span className="text-blue-400">суперсили</span>{" "}
        розповідають про персонажів, які володіють надзвичайними здібностями, що
        змінюють хід подій та дозволяють долати неймовірні труднощі.
      </>
    ),
    animeImages: [
      "/assets/profile/mock-history-anime-card.png",
      "/assets/profile/mock-history-anime-card2.png",
      "/assets/mock-user-logo.png",
      "/assets/user-profile-banner.png",
    ],
    href: "/anime/tag/superpowers",
    animeCount: 80,
    popularity: 6,
  },
  {
    title: "Школа",
    description: (
      <>
        Тег <span className="text-blue-400">школа</span> об'єднує аніме, події
        яких розгортаються у шкільному середовищі, зосереджуючись на житті,
        стосунках та пригодах учнів.
      </>
    ),
    animeImages: [
      "/assets/profile/mock-history-anime-card2.png",
      "/assets/profile/mock-history-anime-card.png",
      "/assets/user-profile-banner.png",
      "/assets/mock-user-logo.png",
    ],
    href: "/anime/tag/school",
    animeCount: 120,
    popularity: 7,
  },
  {
    title: "Дружба",
    description: (
      <>
        Аніме з тегом <span className="text-blue-400">дружба</span> підкреслюють
        важливість підтримки, взаєморозуміння та спільного подолання труднощів
        між персонажами.
      </>
    ),
    animeImages: [
      "/assets/profile/mock-history-anime-card.png",
      "/assets/profile/mock-history-anime-card2.png",
      "/assets/user-profile-banner.png",
      "/assets/mock-user-logo.png",
    ],
    href: "/anime/tag/friendship",
    animeCount: 60,
    popularity: 5,
  },
];

const sortOptions = [
  { label: "A-Я", value: "az" },
  { label: "Кількість аніме", value: "count" },
  { label: "Популярність", value: "popularity" },
];

export default function TagsPage() {
  const [sort, setSort] = useState("az");

  const sortedTags = [...tags].sort((a, b) => {
    if (sort === "az") return a.title.localeCompare(b.title, "uk");
    if (sort === "count") return b.animeCount - a.animeCount;
    if (sort === "popularity") return b.popularity - a.popularity;
    return 0;
  });

  return (
    <>
      <div className="min-h-screen px-2 xs:px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-16 transition-all">
        <h1 className="text-white text-3xl xs:text-4xl font-bold mb-8">
          Список всіх <span className="text-[#4B7FCC]">тегів</span> аніме
        </h1>
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
        <div className="flex justify-end mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#232b45] mt-6">
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
        <div className="flex flex-col gap-12 w-full">
          {sortedTags.map((tag) => (
            <GenreCard
              key={tag.title}
              title={tag.title}
              description={tag.description}
              animeImages={tag.animeImages}
              href={tag.href}
            />
          ))}
        </div>
      </div>
    </>
  );
}
