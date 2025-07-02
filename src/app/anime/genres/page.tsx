"use client";
import React, { useEffect, useState, useRef } from "react";
import GenreCard from "@/components/main-page/genre-card";
import Navbar from "@/components/nav/navbar";

import InfiniteScroll from "react-infinite-scroll-component";
//TODO PAGE QUERY MANNUALLY SET
type Genre = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  is_genre: boolean;
  aliases: string[];
  animes_count: number;
  selections_count: number;
  people_count: number;
  created_at: string;
  updated_at: string;
  anime_posters: string[];
  person_avatars: string[];
};

const sortOptions = [
  { label: "A-Я", value: "az" },
  //{ label: "Кількість аніме", value: "count" },
  { label: "Популярність", value: "popularity" },
];

import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/config";

export default function GenresPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // Remove manual observer, handled by InfiniteScroll
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [page, setPage] = useState(Number(searchParams?.get("page")) || 1);
  const [sort, setSort] = useState(searchParams?.get("sort") || "az");
  const [direction, setDirection] = useState<"asc" | "desc">(
    searchParams?.get("direction") === "desc" ? "desc" : "asc",
  );

  // Map frontend sort keys to backend fields
  const sortMap: Record<string, string> = {
    az: "name",
    //count: 'animes_count',
    popularity: "created_at",
  };

  function updateUrl(
    newSort: string,
    newDirection: "asc" | "desc",
    newPage: number,
  ) {
    const params = new URLSearchParams();
    params.set("sort", newSort);
    params.set("direction", newDirection);
    params.set("page", String(newPage));
    router.replace(`?${params.toString()}`);
  }

  // Reset genres and page when sort or direction changes
  useEffect(() => {
    setGenres([]);
    setPage(1);
    setHasMore(true);
    updateUrl(sort, direction, 1);
  }, [sort, direction]);

  // Fetch genres when page, sort, or direction changes
  useEffect(() => {
    let ignore = false;
    async function fetchGenres() {
      setLoading(true);
      setError(null);
      try {
        const backendSort = sortMap[sort] || "name";
        const res = await fetch(
          `${API_BASE_URL}genres?sort=${backendSort}&direction=${direction}&page=${page}`,
        );
        if (!res.ok) throw new Error("Failed to fetch genres");
        const data = await res.json();
        if (ignore) return;
        setTotal(data.meta?.total || 0);
        setPerPage(data.meta?.per_page || 15);
        setHasMore(
          (data.meta?.current_page || 1) < (data.meta?.last_page || 1),
        );
        if (page === 1) {
          setGenres(data.data);
        } else {
          setGenres((prev) => [...prev, ...data.data]);
        }
      } catch (e: any) {
        if (!ignore) setError(e.message || "Unknown error");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchGenres();
    return () => {
      ignore = true;
    };
  }, [sort, direction, page]);

  // Infinite scroll handler for library
  const fetchMoreGenres = () => {
    if (!hasMore || loading) return;
    setPage((prev) => {
      const nextPage = prev + 1;
      // Update the URL without rerendering or navigation
      const params = new URLSearchParams(window.location.search);
      params.set("page", String(nextPage));
      router.replace(`?${params.toString()}`, { scroll: false });
      return nextPage;
    });
  };

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

  // Pagination logic
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className="xs:px-4 min-h-screen px-2 pt-6 pb-16 transition-all sm:px-6 sm:pt-8 md:px-12">
        <h1 className="xs:text-4xl mb-8 text-3xl font-bold text-white">
          Список всіх <span className="text-[#4B7FCC]">жанрів</span> аніме
        </h1>
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
                updateUrl(sort, newDir, 1);
                setPage(1);
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
                updateUrl(e.target.value, direction, 1);
                setPage(1);
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
        {error ? (
          <div className="mt-8 text-center text-red-500">{error}</div>
        ) : (
          <>
            <InfiniteScroll
              dataLength={genres.length}
              next={fetchMoreGenres}
              hasMore={hasMore}
              loader={
                <div className="mt-8 text-center text-white">
                  Завантаження...
                </div>
              }
              scrollThreshold={0.95}
              style={{ overflow: "visible" }}
            >
              <div className="flex w-full flex-col gap-12">
                {genres.map((genre) => {
                  // Compose up to 5 images: first from anime_posters, then fill with person_avatars
                  let images: string[] = [];
                  if (Array.isArray(genre.anime_posters))
                    images = [...genre.anime_posters];
                  if (
                    images.length < 5 &&
                    Array.isArray(genre.person_avatars)
                  ) {
                    images = images.concat(
                      genre.person_avatars.slice(0, 5 - images.length),
                    );
                  }
                  images = images.slice(0, 5);
                  return (
                    <div key={genre.id}>
                      <GenreCard
                        title={genre.name}
                        description={genre.description}
                        animeImages={images}
                        href={`/anime/genre/${genre.slug}`}
                      />
                    </div>
                  );
                })}
              </div>
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  );
}
