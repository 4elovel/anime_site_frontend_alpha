"use client";

import TopAnimeCard from "@/components/main-page/TopAnimeList/top-anime-card";
import Navbar from "@/components/nav/navbar";
import { FC, useState, useEffect } from "react";

interface Anime {
  id: string;
  slug: string;
  name: string;
  poster: string;
  kind: string;
  rank: number;
  imdb_score: number;
  first_air_date: string;
}

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

const sortMap: Record<string, string> = {
  az: "name",
  rating: "imdb_score",
  year: "first_air_date",
};

import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/config";

const TopAnimePage: FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [sort, setSort] = useState("rating");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update URL when sort or direction changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("sort", sort);
    params.set("direction", direction);
    router.replace(`?${params.toString()}`);
  }, [sort, direction, router]);

  useEffect(() => {
    const backendSort = sortMap[sort] || "imdb_score";
    const url = `${API_BASE_URL}animes/top100?sort=${backendSort}&direction=${direction}`;
    console.log("Fetching:", url);
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAnimes(data.data);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sort, direction]);

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
                onClick={() => {
                  const newDir = direction === "asc" ? "desc" : "asc";
                  setDirection(newDir);
                }}
                aria-label="Змінити напрям сортування"
                type="button"
              >
                {getSortIcon(direction)}
              </button>
              <select
                className="xs:min-w-[140px] min-w-[120px] rounded-lg border border-[#232b45] bg-[#181f33] px-3 py-2 text-white focus:outline-none"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
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
            {loading ? (
              <div className="text-center text-white">Завантаження...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <div className="xs:grid-cols-2 grid min-w-[320px] grid-cols-2 justify-items-center gap-x-4 gap-y-6 transition-all sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {animes.map((anime, idx) => (
                  <TopAnimeCard
                    key={anime.id}
                    image={anime.poster}
                    title={anime.name}
                    year={
                      anime.first_air_date
                        ? Number(anime.first_air_date.slice(0, 4))
                        : 0
                    }
                    type={anime.kind}
                    rank={anime.rank}
                    rating={anime.imdb_score}
                    showRank={idx < 5}
                    href={"/anime/" + anime.slug}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopAnimePage;
