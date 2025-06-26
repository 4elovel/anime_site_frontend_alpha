"use client";
import React, { useState } from "react";
import GenreCard from "@/components/main-page/genre-card";
import Navbar from "@/components/nav/navbar";

const genres = [
  {
    title: "Драма",
    description: (
      <>
        Цей жанр зосереджується на{" "}
        <span className="text-blue-400">емоційних</span> та{" "}
        <span className="text-blue-400">психологічних</span> переживаннях
        персонажів. Такі історії часто торкаються серйозних тем — втрат,
        особистісного зростання, стосунків, внутрішніх конфліктів.
      </>
    ),
    animeImages: [
      "/assets/profile/mock-history-anime-card.png",
      "/assets/profile/mock-history-anime-card2.png",
      "/assets/mock-user-logo.png",
      "/assets/user-profile-banner.png",
    ],
    href: "/anime/genre/drama",
    animeCount: 120,
    popularity: 5,
  },
  {
    title: "Бойовик",
    description: (
      <>
        Аніме-бойовики - це <span className="text-blue-400">динамічні</span>{" "}
        історії із захопливими битвами, яскравими персонажами та постійною
        напругою. Тут важлива не лише фізична сила, а й воля до перемоги,
        стратегія та емоційна боротьба героїв.
      </>
    ),
    animeImages: [
      "/assets/profile/mock-history-anime-card2.png",
      "/assets/profile/mock-history-anime-card.png",
      "/assets/mock-user-logo.png",
      "/assets/user-profile-banner.png",
    ],
    href: "/anime/genre/action",
    animeCount: 200,
    popularity: 8,
  },
  {
    title: "Комедія",
    description: (
      <>
        Комедійне аніме - це <span className="text-blue-400">вибух гумору</span>
        , яскравих ситуацій і кумедних персонажів, які потрапляють у
        найабсурдніші обставини. Сатира, гротеск, повсякденні жарти чи повний
        абсурд – тут головне викликати усмішку, коли світ довкола похмурий.
      </>
    ),
    animeImages: [
      "/assets/profile/mock-history-anime-card.png",
      "/assets/profile/mock-history-anime-card2.png",
      "/assets/user-profile-banner.png",
      "/assets/mock-user-logo.png",
    ],
    href: "/anime/genre/comedy",
    animeCount: 150,
    popularity: 7,
  },
];

const sortOptions = [
  { label: "A-Я", value: "az" },
  { label: "Кількість аніме", value: "count" },
  { label: "Популярність", value: "popularity" },
];

export default function GenresPage() {
  const [sort, setSort] = useState("az");

  const sortedGenres = [...genres].sort((a, b) => {
    if (sort === "az") return a.title.localeCompare(b.title, "uk");
    if (sort === "count") return b.animeCount - a.animeCount;
    if (sort === "popularity") return b.popularity - a.popularity;
    return 0;
  });

  return (
    <>
      <div className="min-h-screen px-2 xs:px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-16 transition-all">
        <h1 className="text-white text-3xl xs:text-4xl font-bold mb-8">
          Список всіх <span className="text-[#4B7FCC]">жанрів</span> аніме
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
        <div className="flex justify-end mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#49638A33] mt-6">
          <select
            className="bg-[#49638A33] text-white px-3 py-2 rounded-lg border border-[#232b45] focus:outline-none min-w-[120px] xs:min-w-[140px]"
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
        <div className="flex flex-col gap-12">
          {sortedGenres.map((genre) => (
            <GenreCard
              key={genre.title}
              title={genre.title}
              description={genre.description}
              animeImages={genre.animeImages}
              href={genre.href}
            />
          ))}
        </div>
      </div>
    </>
  );
}
