"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import TopAnimeCard from "@/components/main-page/TopAnimeList/top-anime-card";
import { createPortal } from "react-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import StudioFilter, { RenderFiltersProps } from "@/components/studio-filter";
import Pagination from "@/components/ui/Pagination";

const studioInfo = {
  name: "Arvo Animation",
  description:
    "Arvo Animation — це японська анімаційна студія, заснована в 2017 році. Розташована в Токіо, вона спеціалізується на виробництві телевізійних аніме. Студія відома завдяки таким проектам, як We Never Learn.",
  logo: "/assets/mock-user-logo.png",
};

const statuses = ["Призупинено", "Онґоїнг", "Завершено", "Анонс", "Зупинено"];
const seasons = ["Зима", "Весна", "Літо", "Осінь"];
const types = ["Спешл", "Фільм", "OVA", "ONA", "TV Серіал", "Музика"];
const genres = [
  "Драма",
  "Комедія",
  "Екшн",
  "Романтика",
  "Фентезі",
  "Жахи",
  "Містика",
  "Історія",
];
const sortOptions = [
  "За рейтингом",
  "За роком",
  "За популярністю",
  "За кількістю епізодів",
];
const ageRatings = [
  { label: "G", info: "Для всіх" },
  { label: "PG", info: "Дитяча аудиторія" },
  { label: "PG-13", info: "13+" },
  { label: "R", info: "17+" },
  { label: "R PLUS", info: "17+ (жорсткіше)" },
  { label: "R X", info: "18+" },
];
const studios = [
  { label: "Arvo Animation", value: "arvo-animation-5c0f1b" },
  { label: "MAPPA", value: "mappa-1a2b3c" },
  { label: "Kyoto Animation", value: "kyoto-animation-4d5e6f" },
];
const minYear = 1965;
const maxYear = 2025;

const topAnime = [
  {
    id: 1,
    slug: "hellsing-ova",
    title: "Геллсінґ OVA",
    year: 2006,
    type: "OVA",
    image: "/assets/profile/mock-history-anime-card.png",
    rank: 1,
    rating: 8.7,
  },
  {
    id: 2,
    slug: "i-admire-magical-girls",
    title: "Я захоплюю лорда демона",
    year: 2024,
    type: "TV Серіал",
    image: "/assets/profile/mock-history-anime-card2.png",
    rank: 2,
    rating: 7.9,
  },
  {
    id: 3,
    slug: "paradise-cat",
    title: "Райська кішка",
    year: 2021,
    type: "Спешл",
    image: "/assets/profile/mock-history-anime-card3.png",
    rank: 3,
    rating: 8.2,
  },
  ...Array.from({ length: 37 }, (_, i) => ({
    id: 4 + i,
    slug: `anime-${4 + i}`,
    title: `Аніме ${4 + i}`,
    year: 2000 + ((4 + i) % 25),
    type: ["TV Серіал", "OVA", "Фільм", "ONA", "Спешл"][i % 5],
    image: `/assets/profile/mock-history-anime-card${(i % 3) + 1}.png`,
    rank: 4 + i,
    rating: 7 + (i % 20) * 0.1,
  })),
];

type Anime = {
  id: number;
  slug: string;
  title: string;
  year: number;
  type: string;
  image: string;
  rank: number;
  rating: number;
};

interface FiltersState {
  status: string[];
  season: string[];
  genres: string[];
  type: string[];
  localized: boolean;
  sort: string;
  age: string[];
  studio: string[];
  year: [number, number];
}

export default function StudioPage({ params }: { params: { slug: string } }) {
  const [filters, setFilters] = useState<FiltersState>({
    status: [],
    season: [],
    genres: [],
    type: [],
    localized: false,
    sort: "",
    age: [],
    studio: [],
    year: [minYear, maxYear],
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [genresOpen, setGenresOpen] = useState(false);
  const genresRef = useRef<HTMLDivElement | null>(null);
  const handleGenresClick = useCallback(() => setGenresOpen((v) => !v), []);
  useEffect(() => {
    if (!genresOpen) return;
    const handler = (e: MouseEvent) => {
      if (genresRef.current && !genresRef.current.contains(e.target as Node))
        setGenresOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [genresOpen]);

  const [studiosOpen, setStudiosOpen] = useState(false);
  const studiosRef = useRef<HTMLDivElement | null>(null);
  const [studiosSearch, setStudiosSearch] = useState("");
  const handleStudiosClick = useCallback(() => setStudiosOpen((v) => !v), []);
  useEffect(() => {
    if (!studiosOpen) return;
    const handler = (e: MouseEvent) => {
      if (studiosRef.current && !studiosRef.current.contains(e.target as Node))
        setStudiosOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [studiosOpen]);
  const handleStudiosSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStudiosSearch(e.target.value);
    },
    [],
  );
  const filteredStudios = studios.filter((s) =>
    s.label.toLowerCase().includes(studiosSearch.toLowerCase()),
  );

  const [tooltipOpen, setTooltipOpen] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const tooltipBtnRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const toggleFilter = useCallback(
    <K extends keyof FiltersState>(key: K, value: string) => {
      if (
        ["status", "season", "genres", "type", "age"].includes(key as string)
      ) {
        setFilters((prev) => {
          const arr = prev[key] as string[];
          return {
            ...prev,
            [key]: arr.includes(value)
              ? arr.filter((v) => v !== value)
              : [...arr, value],
          };
        });
      }
    },
    [],
  );
  const setSingleFilter = useCallback((key: keyof FiltersState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);
  const setYearRange = useCallback((range: [number, number]) => {
    setFilters((prev) => ({ ...prev, year: range }));
  }, []);
  const clearFilters = useCallback(() => {
    setFilters({
      status: [],
      season: [],
      genres: [],
      type: [],
      localized: false,
      sort: "",
      age: [],
      studio: [],
      year: [minYear, maxYear],
    });
  }, []);

  const handleGenresOptionClick = useCallback((g: string) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(g)
        ? prev.genres.filter((x) => x !== g)
        : [...prev.genres, g],
    }));
  }, []);
  const handleGenresClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setFilters((prev) => ({ ...prev, genres: [] }));
  }, []);
  const handleGenresTagRemove = useCallback(
    (g: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setFilters((prev) => ({
        ...prev,
        genres: prev.genres.filter((x) => x !== g),
      }));
    },
    [],
  );

  const handleStudiosOptionClick = useCallback((val: string) => {
    setFilters((prev) => ({
      ...prev,
      studio: prev.studio.includes(val)
        ? prev.studio.filter((x) => x !== val)
        : [...prev.studio, val],
    }));
  }, []);
  const handleStudiosClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setFilters((prev) => ({ ...prev, studio: [] }));
  }, []);
  const handleStudiosTagRemove = useCallback(
    (val: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setFilters((prev) => ({
        ...prev,
        studio: prev.studio.filter((x) => x !== val),
      }));
    },
    [],
  );

  const handleTooltipShow = useCallback((idx: number) => {
    const ref = tooltipBtnRefs.current[idx];
    if (ref) {
      const rect = ref.getBoundingClientRect();
      setTooltipPos({ x: rect.left + rect.width / 2, y: rect.bottom });
    }
    setTooltipOpen(idx);
  }, []);
  const handleTooltipHide = useCallback(() => setTooltipOpen(null), []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(topAnime.length / itemsPerPage);
  const paginatedAnime = topAnime.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen px-2 py-8 text-white sm:px-8">
      <div className="mb-8 flex items-start gap-6">
        <Image
          src={studioInfo.logo}
          alt={studioInfo.name}
          width={100}
          height={100}
          className="rounded-lg bg-white object-contain p-2"
        />
        <div>
          <h1 className="mb-2 text-3xl font-bold">{studioInfo.name}</h1>
          <p className="max-w-xl text-sm leading-relaxed text-gray-300">
            {studioInfo.description}
          </p>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="relative mb-6 flex items-center">
            <input
              type="text"
              placeholder="Введіть назву аніме..."
              className="w-full rounded-lg border border-[#232B39] bg-[#181F2A] px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-[#232B39] hover:bg-[#2C3545] sm:hidden"
              onClick={() => setFiltersOpen(true)}
              aria-label="Відкрити фільтри"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  d="M4 6h16M6 12h12M10 18h4"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="w-full px-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {paginatedAnime.map((anime: Anime) => (
                <TopAnimeCard
                  key={anime.id}
                  image={anime.image}
                  title={anime.title}
                  year={anime.year}
                  type={anime.type}
                  rank={anime.rank}
                  rating={anime.rating}
                  showRank={false}
                  href={`/anime/${anime.slug}`}
                  small={true}
                />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  if (page >= 1 && page <= totalPages) setCurrentPage(page);
                }}
              />
            </div>
          </div>
        </div>
        <div className="hidden w-64 flex-shrink-0 sm:block">
          <StudioFilter
            filters={filters}
            toggleFilter={toggleFilter}
            setSingleFilter={setSingleFilter}
            setYearRange={setYearRange}
            clearFilters={clearFilters}
            genres={genres}
            genresOpen={genresOpen}
            genresRef={genresRef}
            handleGenresClick={handleGenresClick}
            handleGenresOptionClick={handleGenresOptionClick}
            handleGenresClear={handleGenresClear}
            handleGenresTagRemove={handleGenresTagRemove}
            types={types}
            statuses={statuses}
            seasons={seasons}
            ageRatings={ageRatings}
            studios={studios}
            studiosOpen={studiosOpen}
            studiosRef={studiosRef}
            studiosSearch={studiosSearch}
            handleStudiosClick={handleStudiosClick}
            handleStudiosSearch={handleStudiosSearch}
            filteredStudios={filteredStudios}
            handleStudiosOptionClick={handleStudiosOptionClick}
            handleStudiosClear={handleStudiosClear}
            handleStudiosTagRemove={handleStudiosTagRemove}
            minYear={minYear}
            maxYear={maxYear}
            isMobile={false}
          />
        </div>
        {/* Filters Mobile Drawer */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:hidden">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setFiltersOpen(false)}
            />
            <div className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border-t border-[#232B39] bg-[#181F2A] p-4">
              <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-gray-600" />
              <div className="mb-4 text-center text-xl font-bold">Фільтри</div>
              <StudioFilter
                filters={filters}
                toggleFilter={toggleFilter}
                setSingleFilter={setSingleFilter}
                setYearRange={setYearRange}
                clearFilters={clearFilters}
                genres={genres}
                genresOpen={genresOpen}
                genresRef={genresRef}
                handleGenresClick={handleGenresClick}
                handleGenresOptionClick={handleGenresOptionClick}
                handleGenresClear={handleGenresClear}
                handleGenresTagRemove={handleGenresTagRemove}
                types={types}
                statuses={statuses}
                seasons={seasons}
                ageRatings={ageRatings}
                studios={studios}
                studiosOpen={studiosOpen}
                studiosRef={studiosRef}
                studiosSearch={studiosSearch}
                handleStudiosClick={handleStudiosClick}
                handleStudiosSearch={handleStudiosSearch}
                filteredStudios={filteredStudios}
                handleStudiosOptionClick={handleStudiosOptionClick}
                handleStudiosClear={handleStudiosClear}
                handleStudiosTagRemove={handleStudiosTagRemove}
                minYear={minYear}
                maxYear={maxYear}
                isMobile={true}
                onApply={() => setFiltersOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
