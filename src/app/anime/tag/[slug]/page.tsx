"use client";
import React, { useEffect, useState } from "react";
import TopAnimeCard from "@/components/main-page/TopAnimeList/top-anime-card";
import Navbar from "@/components/nav/navbar";
import { useParams } from "next/navigation";

interface Anime {
  id: string;
  slug: string;
  name: string;
  poster: string;
  first_air_date: string;
  kind: string;
  imdb_score: number;
}

const sortOptions = [
  { label: "A-Я", value: "az" },
  { label: "Рейтинг", value: "rating" },
  { label: "Рік", value: "year" },
];

export default function TagPage() {
  const params = useParams();
  const tagSlug = params?.slug?.toString() || "";

  const [sort, setSort] = useState("az");
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tagSlug) return;

    setLoading(true);
    setError(null);

    const apiSortMap: Record<string, string> = {
      az: "name",
      rating: "rating",
      year: "year",
    };

    const sortParam = apiSortMap[sort] || "name";

    fetch(`http://127.0.0.1:8000/api/v1/tags/${tagSlug}?sort_anime=${sortParam}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => {
        setAnimes(json.data.animes || []);
      })
      .catch((e) => {
        setError(e.message || "Помилка при завантаженні");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tagSlug, sort]);

  return (
    <>
      <div className="min-h-screen px-2 xs:px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-16 transition-all">
        <h1 className="text-white text-2xl xs:text-3xl font-bold mb-4">
          Тег - <span className="text-[#4B7FCC]">{tagSlug.toUpperCase()}</span>
        </h1>

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

        {loading && <p className="text-white">Завантаження...</p>}
        {error && <p className="text-red-500">Помилка: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6 transition-all">
            {animes.length > 0 ? (
              animes.map((anime) => (
                <TopAnimeCard
                  key={anime.slug}
                  image={anime.poster}
                  title={anime.name}
                  year={new Date(anime.first_air_date).getFullYear()}
                  type={anime.kind}
                  rank={0} // якщо потрібно, можна додати рейтинг/ранг
                  rating={anime.imdb_score}
                  showRank={false}
                  href={`/anime/${anime.slug}`}
                />
              ))
            ) : (
              <p className="text-white">Аніме не знайдено.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
