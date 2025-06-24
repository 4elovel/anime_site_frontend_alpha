"use client";
import React, { useState } from "react";
import TopAnimeCard from "@/components/main-page/TopAnimeList/top-anime-card";
import Navbar from "@/components/nav/navbar";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockAnime = [
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Проводжальники весни",
    year: 2023,
    type: "TV Серіал",
    rank: 1,
    rating: 9.12,
    slug: "provodzhalnyky-vesny",
  },
  {
    image: "/assets/mock-user-logo.png",
    title: "Сталевий алхімік",
    year: 2009,
    type: "TV Серіал",
    rank: 2,
    rating: 9.1,
    slug: "stalevyy-alkhimik",
  },
];

const sortOptions = [
  { label: "A-Я", value: "az" },
  { label: "Рейтинг", value: "rating" },
  { label: "Рік", value: "year" },
];

export default function GenrePage() {
  const params = useParams();
  const genre =
    (params && params["slug"] ? params["slug"].toString() : "") || "";
  const [sort, setSort] = useState("az");

  //TODO: GET FROM API
  const genreDescription = (
    <>
      <span className="text-white text-2xl xs:text-3xl font-bold block">
        Жанр -{" "}
        <span className="text-[#4B7FCC]">{genre.toUpperCase() || "Жанр"}</span>
      </span>
      <p className="mt-3 xs:mt-4 text-neutral-200 text-base xs:text-lg">
        Цей жанр в аніме зосереджується на{" "}
        <span className="text-blue-300">емоційних</span> та{" "}
        <span className="text-blue-300">психологічних</span> переживаннях
        персонажів. Такі історії часто торкаються серйозних тем — втрат,
        особистісного зростання, стосунків, внутрішніх конфліктів. Головна мета
        — викликати у глядача{" "}
        <span className="text-blue-300">
          співпереживання, емоції та змусити замислитися
        </span>
        . Драматичне аніме зазвичай має повільніший темп і приділяє велику увагу
        розвитку персонажів та атмосфері.
      </p>
    </>
  );

  const sortedAnime = [...mockAnime].sort((a, b) => {
    if (sort === "az") return a.title.localeCompare(b.title, "uk");
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "year") return b.year - a.year;
    return 0;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-2 xs:px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-16 transition-all">
        <div className="mb-6">
          <div className="max-w-full sm:max-w-4xl">{genreDescription}</div>
        </div>
        <div className="flex justify-end mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#232b45]">
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
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6 transition-all">
          {sortedAnime.map((anime) => (
            <TopAnimeCard
              key={anime.slug}
              image={anime.image}
              title={anime.title}
              year={anime.year}
              type={anime.type}
              rank={anime.rank}
              rating={anime.rating}
              showRank={false}
              href={`/anime/${anime.slug}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
