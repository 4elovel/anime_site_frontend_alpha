"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import TopAnimeCard from "@/components/main-page/TopAnimeList/top-anime-card";
import { createPortal } from "react-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
  const genresRef = useRef<HTMLDivElement>(null);
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
  const studiosRef = useRef<HTMLDivElement>(null);
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
              {topAnime.map((anime: Anime) => (
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
          </div>
        </div>
        <div className="hidden w-64 flex-shrink-0 sm:block">
          <div className="flex flex-col gap-4">
            <div
              className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
              style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
            >
              <div className="mb-3 flex items-center justify-between text-xl font-bold">
                Статус <span className="ml-auto text-lg">˄</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    className={`rounded-full px-4 py-1 text-base font-medium transition-colors focus:outline-none ${filters.status.includes(status) ? "bg-[#787880] text-white" : "bg-[#23242A] text-white hover:bg-[#787880]/80"}`}
                    onClick={() => toggleFilter("status", status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            {/* Season */}
            <div
              className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
              style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
            >
              <div className="mb-3 flex items-center justify-between text-xl font-bold">
                Сезон <span className="ml-auto text-lg">˄</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {seasons.map((season) => (
                  <button
                    key={season}
                    className={`rounded-full px-4 py-1 text-base font-medium transition-colors focus:outline-none ${filters.season.includes(season) ? "bg-[#787880] text-white" : "bg-[#23242A] text-white hover:bg-[#787880]/80"}`}
                    onClick={() => toggleFilter("season", season)}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>
            {/* Genres */}
            <div
              className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
              style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
            >
              <div className="mb-3 flex items-center justify-between text-xl font-bold">
                Жанри <span className="ml-auto text-lg">˄</span>
              </div>
              {/* Custom multi-select */}
              <div ref={genresRef} className="relative">
                <div
                  className={`flex min-h-[36px] w-full cursor-pointer flex-wrap items-center gap-2 rounded-xl border-none bg-[#23242A] px-3 py-2 text-base text-white focus:outline-none ${genresOpen ? "ring-2 ring-blue-400" : ""}`}
                  onClick={handleGenresClick}
                  tabIndex={0}
                >
                  {filters.genres.length === 0 && (
                    <span className="text-white/60">
                      Виберіть жанр/жанри...
                    </span>
                  )}
                  {filters.genres.map((g) => (
                    <span
                      key={g}
                      className="flex items-center gap-1 rounded-lg bg-[#787880] px-2 py-1 text-xs text-white"
                    >
                      {g}
                      <button
                        type="button"
                        className="ml-1 text-xs text-white/80 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFilters((prev) => ({
                            ...prev,
                            genres: prev.genres.filter((x) => x !== g),
                          }));
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.genres.length > 0 && (
                    <button
                      type="button"
                      className="ml-2 text-xs text-white/60 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters((prev) => ({ ...prev, genres: [] }));
                      }}
                    >
                      Очистити
                    </button>
                  )}
                  <svg
                    className="ml-auto"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {genresOpen && (
                  <div className="absolute top-full left-0 z-50 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-[#6CA0FF33] bg-[#23242A] shadow-lg">
                    {genres.map((g) => (
                      <div
                        key={g}
                        className={`cursor-pointer px-4 py-2 text-base ${filters.genres.includes(g) ? "bg-[#787880] text-white" : "text-white hover:bg-[#787880]/60"}`}
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            genres: prev.genres.includes(g)
                              ? prev.genres.filter((x) => x !== g)
                              : [...prev.genres, g],
                          }));
                        }}
                      >
                        {g}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Type */}
            <div
              className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
              style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
            >
              <div className="mb-3 flex items-center justify-between text-xl font-bold">
                Тип <span className="ml-auto text-lg">˄</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    className={`rounded-full px-4 py-1 text-base font-medium transition-colors focus:outline-none ${filters.type.includes(type) ? "bg-[#787880] text-white" : "bg-[#23242A] text-white hover:bg-[#787880]/80"}`}
                    onClick={() => toggleFilter("type", type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            {/* Localization */}
            <div
              className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
              style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
            >
              <div className="mb-3 flex items-center justify-between text-xl font-bold">
                Локалізація <span className="ml-auto text-lg">˄</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base">Перекладено українською</span>
                <label className="relative ml-2 inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={filters.localized}
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        localized: !prev.localized,
                      }))
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-5 w-8 rounded-full bg-[#23242A] transition-all peer-checked:bg-[#787880] peer-focus:outline-none"></div>
                  <div className="absolute top-1 left-1 h-3.5 w-3.5 rounded-full bg-white transition-all peer-checked:translate-x-3"></div>
                </label>
              </div>
            </div>
            {/* Sort */}
            <div
              className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
              style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
            >
              <div className="mb-3 flex items-center justify-between text-xl font-bold">
                Сортування <span className="ml-auto text-lg">˄</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={filters.sort}
                  onChange={(e) => setSingleFilter("sort", e.target.value)}
                  className="mb-2 w-full cursor-pointer rounded-xl border-none bg-[#23242A] px-3 py-2 text-base text-white placeholder-white/60 focus:outline-none"
                  style={{ minHeight: 36 }}
                >
                  <option value="" disabled>
                    Виберіть сортування...
                  </option>
                  {sortOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#23242A]">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <rect
                      x="4"
                      y="6"
                      width="16"
                      height="2"
                      rx="1"
                      fill="#fff"
                      fillOpacity=".7"
                    />
                    <rect
                      x="4"
                      y="11"
                      width="16"
                      height="2"
                      rx="1"
                      fill="#fff"
                      fillOpacity=".7"
                    />
                    <rect
                      x="4"
                      y="16"
                      width="16"
                      height="2"
                      rx="1"
                      fill="#fff"
                      fillOpacity=".7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Age Rating */}
            <div
              className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
              style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
            >
              <div className="mb-3 flex items-center justify-between text-xl font-bold">
                Віковий рейтинг <span className="ml-auto text-lg">˄</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ageRatings.map((a) => {
                  const [tooltipOpen, setTooltipOpen] = useState(false);
                  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
                  const btnRef = useRef<HTMLSpanElement>(null);
                  const showTooltip = (
                    e: React.MouseEvent | React.FocusEvent,
                  ) => {
                    const rect = btnRef.current?.getBoundingClientRect();
                    if (rect) {
                      setTooltipPos({
                        x: rect.left + rect.width / 2,
                        y: rect.bottom,
                      });
                    }
                    setTooltipOpen(true);
                  };
                  const hideTooltip = () => setTooltipOpen(false);
                  return (
                    <div key={a.label} className="group relative">
                      <button
                        className={`flex items-center gap-2 rounded-full px-4 py-1 text-base font-medium transition-colors focus:outline-none ${filters.age.includes(a.label) ? "bg-[#787880] text-white" : "bg-[#23242A] text-white hover:bg-[#787880]/80"}`}
                        onClick={() => toggleFilter("age", a.label)}
                        type="button"
                      >
                        {a.label}
                        <span
                          ref={btnRef}
                          tabIndex={0}
                          className="group/tooltip relative ml-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-[#787880] bg-[#23242A] text-base opacity-80"
                          onMouseEnter={showTooltip}
                          onMouseLeave={hideTooltip}
                          onFocus={showTooltip}
                          onBlur={hideTooltip}
                        >
                          i
                        </span>
                      </button>
                      {typeof window !== "undefined" &&
                        tooltipOpen &&
                        createPortal(
                          <span
                            className="pointer-events-none fixed z-[9999] rounded-lg border border-[#787880] bg-[#23242A] px-3 py-2 text-xs whitespace-nowrap text-white opacity-100 shadow-lg transition-opacity duration-200"
                            style={{
                              left: tooltipPos.x,
                              top: tooltipPos.y + 8,
                              transform: "translate(-50%, 0)",
                            }}
                          >
                            {a.info}
                          </span>,
                          document.body,
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Studio */}
            <div
              className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
              style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
            >
              <div className="mb-3 flex items-center justify-between text-xl font-bold">
                Студія <span className="ml-auto text-lg">˄</span>{" "}
              </div>
              <div ref={studiosRef} className="relative">
                <div
                  className={`flex min-h-[36px] w-full cursor-pointer flex-wrap items-center gap-2 rounded-xl border-none bg-[#23242A] px-3 py-2 text-base text-white focus:outline-none ${studiosOpen ? "ring-2 ring-blue-400" : ""}`}
                  onClick={handleStudiosClick}
                  tabIndex={0}
                >
                  {filters.studio.length === 0 && (
                    <span className="text-white/60">Виберіть студію...</span>
                  )}
                  {filters.studio.map((studioValue) => {
                    const studioObj = studios.find(
                      (s) => s.value === studioValue,
                    );
                    return studioObj ? (
                      <span
                        key={studioObj.value}
                        className="flex items-center gap-1 rounded-lg bg-[#787880] px-2 py-1 text-xs text-white"
                      >
                        {studioObj.label}
                        <button
                          type="button"
                          className="ml-1 text-xs text-white/80 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilters((prev) => ({
                              ...prev,
                              studio: prev.studio.filter(
                                (x) => x !== studioObj.value,
                              ),
                            }));
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ) : null;
                  })}
                  {filters.studio.length > 0 && (
                    <button
                      type="button"
                      className="ml-2 text-xs text-white/60 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters((prev) => ({ ...prev, studio: [] }));
                      }}
                    >
                      Очистити
                    </button>
                  )}
                  <svg
                    className="ml-auto"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {studiosOpen && (
                  <div className="absolute top-full left-0 z-50 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-[#6CA0FF33] bg-[#23242A] shadow-lg">
                    <input
                      type="text"
                      value={studiosSearch}
                      onChange={handleStudiosSearch}
                      placeholder="Пошук студії..."
                      className="mb-1 w-full border-b border-[#6CA0FF33] bg-transparent px-3 py-2 text-white outline-none"
                    />
                    {filteredStudios.length === 0 && (
                      <div className="px-4 py-2 text-white/60">
                        Нічого не знайдено
                      </div>
                    )}
                    {filteredStudios.map((s) => (
                      <div
                        key={s.value}
                        className={`cursor-pointer px-4 py-2 text-base ${filters.studio.includes(s.value) ? "bg-[#787880] text-white" : "text-white hover:bg-[#787880]/60"}`}
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            studio: prev.studio.includes(s.value)
                              ? prev.studio.filter((x) => x !== s.value)
                              : [...prev.studio, s.value],
                          }));
                        }}
                      >
                        {s.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Year Range */}
            <div
              className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
              style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
            >
              <div className="mb-3 flex items-center justify-between text-xl font-bold">
                Рік виходу <span className="ml-auto text-lg">˄</span>
              </div>
              <div className="flex flex-col items-stretch gap-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="min-w-[56px] rounded-xl bg-[#787880] px-3 py-1 text-center text-base font-medium">
                    {filters.year[0]}
                  </span>
                  <span className="min-w-[56px] rounded-xl bg-[#787880] px-3 py-1 text-center text-base font-medium">
                    {filters.year[1]}
                  </span>
                </div>
                <Slider
                  range
                  min={minYear}
                  max={maxYear}
                  value={filters.year}
                  onChange={(val) => {
                    if (Array.isArray(val))
                      setYearRange(val as [number, number]);
                  }}
                  allowCross={false}
                  trackStyle={[{ backgroundColor: "#6CA0FF", height: 6 }]}
                  handleStyle={[
                    {
                      borderColor: "#6CA0FF",
                      backgroundColor: "#23242A",
                      width: 22,
                      height: 22,
                      marginTop: -8,
                      boxShadow: "0 0 0 2px #6CA0FF55",
                    },
                    {
                      borderColor: "#6CA0FF",
                      backgroundColor: "#23242A",
                      width: 22,
                      height: 22,
                      marginTop: -8,
                      boxShadow: "0 0 0 2px #6CA0FF55",
                    },
                  ]}
                  railStyle={{ backgroundColor: "#23242A", height: 6 }}
                  dotStyle={{ display: "none" }}
                />
              </div>
            </div>
            {/* Clear Button */}
            <button
              className="mt-2 w-full rounded-xl border border-[#6CA0FF33] bg-[#23242A] py-2 text-lg font-bold text-white transition-colors hover:bg-[#787880]/80"
              onClick={clearFilters}
            >
              Очистити
            </button>
          </div>
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
              {/* Status */}
              <div className="mb-4">
                <div className="mb-2 font-semibold">Статус</div>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      className="rounded-full bg-[#232B39] px-3 py-1 text-sm hover:bg-[#2C3545] focus:outline-none"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              {/* Season */}
              <div className="mb-4">
                <div className="mb-2 font-semibold">Сезон</div>
                <div className="flex flex-wrap gap-2">
                  {seasons.map((season) => (
                    <button
                      key={season}
                      className="rounded-full bg-[#232B39] px-3 py-1 text-sm hover:bg-[#2C3545] focus:outline-none"
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>
              {/* Genres */}
              <div className="mb-4">
                <div className="mb-2 font-semibold">Жанри</div>
                <input
                  type="text"
                  placeholder="Виберіть жанр/жанри..."
                  className="w-full rounded-lg bg-[#232B39] px-3 py-1 text-sm text-white placeholder-gray-400 focus:outline-none"
                  disabled
                />
              </div>
              {/* Type */}
              <div className="mb-4">
                <div className="mb-2 font-semibold">Тип</div>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      className="rounded-full bg-[#232B39] px-3 py-1 text-sm hover:bg-[#2C3545] focus:outline-none"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              {/* Localization */}
              <div className="mb-2">
                <div className="mb-2 font-semibold">Локалізація</div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#2C3545]" />
                  <span className="text-sm">Перекладено українською</span>
                </label>
              </div>
              <button
                className="mt-4 w-full rounded-lg bg-[#232B39] py-2 text-lg font-semibold text-white"
                onClick={() => setFiltersOpen(false)}
              >
                Застосувати
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
