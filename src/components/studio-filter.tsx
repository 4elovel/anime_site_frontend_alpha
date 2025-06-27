import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export interface RenderFiltersProps {
  filters: any;
  toggleFilter: <K extends keyof any>(key: K, value: string) => void;
  setSingleFilter: (key: keyof any, value: any) => void;
  setYearRange: (range: [number, number]) => void;
  clearFilters: () => void;
  genres: string[];
  genresOpen: boolean;
  genresRef: React.RefObject<HTMLDivElement | null>;
  handleGenresClick: () => void;
  handleGenresOptionClick: (g: string) => void;
  handleGenresClear: (e: React.MouseEvent) => void;
  handleGenresTagRemove: (g: string, e: React.MouseEvent) => void;
  types: string[];
  statuses: string[];
  seasons: string[];
  ageRatings: { label: string; info: string }[];
  studios: { label: string; value: string }[];
  studiosOpen: boolean;
  studiosRef: React.RefObject<HTMLDivElement | null>;
  studiosSearch: string;
  handleStudiosClick: () => void;
  handleStudiosSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredStudios: { label: string; value: string }[];
  handleStudiosOptionClick: (val: string) => void;
  handleStudiosClear: (e: React.MouseEvent) => void;
  handleStudiosTagRemove: (val: string, e: React.MouseEvent) => void;
  minYear: number;
  maxYear: number;
  isMobile?: boolean;
  onApply?: () => void;
}

const StudioFilter: React.FC<RenderFiltersProps> = ({
  filters,
  toggleFilter,
  setSingleFilter,
  setYearRange,
  clearFilters,
  genres,
  genresOpen,
  genresRef,
  handleGenresClick,
  handleGenresOptionClick,
  handleGenresClear,
  handleGenresTagRemove,
  types,
  statuses,
  seasons,
  ageRatings,
  studios,
  studiosOpen,
  studiosRef,
  studiosSearch,
  handleStudiosClick,
  handleStudiosSearch,
  filteredStudios,
  handleStudiosOptionClick,
  handleStudiosClear,
  handleStudiosTagRemove,
  minYear,
  maxYear,
  isMobile = false,
  onApply,
}) => {
  // Accordion state
  const [openSections, setOpenSections] = useState({
    status: true,
    season: true,
    genres: true,
    type: true,
    localization: true,
    sort: true,
    age: true,
    studio: true,
    year: true,
  });
  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Tooltip state
  const [tooltipOpen, setTooltipOpen] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const tooltipRefs = React.useRef<(HTMLSpanElement | null)[]>([]);

  const handleTooltipShow = (idx: number, info: string) => {
    const ref = tooltipRefs.current[idx];
    if (ref) {
      const rect = ref.getBoundingClientRect();
      setTooltipPos({ x: rect.left + rect.width / 2, y: rect.bottom });
      setTooltipContent(info);
      setTooltipOpen(idx);
    }
  };
  const handleTooltipHide = () => setTooltipOpen(null);

  return (
    <div className={isMobile ? "flex flex-col gap-4" : "flex flex-col gap-4"}>
      {/* Status */}
      <div
        className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
        style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
      >
        <button
          type="button"
          className="mb-3 flex w-full items-center justify-between text-xl font-bold focus:outline-none"
          onClick={() => toggleSection("status")}
        >
          Статус{" "}
          <span className="ml-auto text-lg">
            {openSections.status ? "˄" : "˅"}
          </span>
        </button>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: openSections.status ? "auto" : 0 }}
          exit={{ height: 0 }}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence>
            {openSections.status && (
              <motion.div
                key="status-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.18,
                  delay: openSections.status ? 0.08 : 0,
                }}
                className="flex flex-wrap gap-2"
              >
                {statuses.map((status) => (
                  <button
                    key={status}
                    className={`rounded-full px-4 py-1 text-base font-medium transition-colors focus:outline-none ${filters.status.includes(status) ? "bg-[#787880] text-white" : "bg-[#23242A] text-white hover:bg-[#787880]/80"}`}
                    onClick={() => toggleFilter("status", status)}
                  >
                    {status}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Season */}
      <div
        className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
        style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
      >
        <button
          type="button"
          className="mb-3 flex w-full items-center justify-between text-xl font-bold focus:outline-none"
          onClick={() => toggleSection("season")}
        >
          Сезон{" "}
          <span className="ml-auto text-lg">
            {openSections.season ? "˄" : "˅"}
          </span>
        </button>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: openSections.season ? "auto" : 0 }}
          exit={{ height: 0 }}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence>
            {openSections.season && (
              <motion.div
                key="season-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.18,
                  delay: openSections.season ? 0.08 : 0,
                }}
                className="flex flex-wrap gap-2"
              >
                {seasons.map((season) => (
                  <button
                    key={season}
                    className={`rounded-full px-4 py-1 text-base font-medium transition-colors focus:outline-none ${filters.season.includes(season) ? "bg-[#787880] text-white" : "bg-[#23242A] text-white hover:bg-[#787880]/80"}`}
                    onClick={() => toggleFilter("season", season)}
                  >
                    {season}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Genres */}
      <div
        className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
        style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
      >
        <button
          type="button"
          className="mb-3 flex w-full items-center justify-between text-xl font-bold focus:outline-none"
          onClick={() => toggleSection("genres")}
        >
          Жанри{" "}
          <span className="ml-auto text-lg">
            {openSections.genres ? "˄" : "˅"}
          </span>
        </button>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: openSections.genres ? "auto" : 0 }}
          exit={{ height: 0 }}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence>
            {openSections.genres && (
              <motion.div
                key="genres-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.18,
                  delay: openSections.genres ? 0.08 : 0,
                }}
                ref={genresRef}
                className="relative"
              >
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
                  {filters.genres.map((g: string) => (
                    <span
                      key={g}
                      className="flex items-center gap-1 rounded-lg bg-[#787880] px-2 py-1 text-xs text-white"
                    >
                      {g}
                      <button
                        type="button"
                        className="ml-1 text-xs text-white/80 hover:text-white"
                        onClick={(e) => handleGenresTagRemove(g, e)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.genres.length > 0 && (
                    <button
                      type="button"
                      className="ml-2 text-xs text-white/60 hover:text-white"
                      onClick={handleGenresClear}
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
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="absolute top-full left-0 z-50 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-[#6CA0FF33] bg-[#23242A] shadow-lg"
                  >
                    {genres.map((g) => (
                      <div
                        key={g}
                        className={`cursor-pointer px-4 py-2 text-base ${filters.genres.includes(g) ? "bg-[#787880] text-white" : "text-white hover:bg-[#787880]/60"}`}
                        onClick={() => handleGenresOptionClick(g)}
                      >
                        {g}
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Type */}
      <div
        className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
        style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
      >
        <button
          type="button"
          className="mb-3 flex w-full items-center justify-between text-xl font-bold focus:outline-none"
          onClick={() => toggleSection("type")}
        >
          Тип{" "}
          <span className="ml-auto text-lg">
            {openSections.type ? "˄" : "˅"}
          </span>
        </button>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: openSections.type ? "auto" : 0 }}
          exit={{ height: 0 }}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence>
            {openSections.type && (
              <motion.div
                key="type-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.18,
                  delay: openSections.type ? 0.08 : 0,
                }}
                className="flex flex-wrap gap-2"
              >
                {types.map((type) => (
                  <button
                    key={type}
                    className={`rounded-full px-4 py-1 text-base font-medium transition-colors focus:outline-none ${filters.type.includes(type) ? "bg-[#787880] text-white" : "bg-[#23242A] text-white hover:bg-[#787880]/80"}`}
                    onClick={() => toggleFilter("type", type)}
                  >
                    {type}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Localization */}
      <div
        className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
        style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
      >
        <button
          type="button"
          className="mb-3 flex w-full items-center justify-between text-xl font-bold focus:outline-none"
          onClick={() => toggleSection("localization")}
        >
          Локалізація{" "}
          <span className="ml-auto text-lg">
            {openSections.localization ? "˄" : "˅"}
          </span>
        </button>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: openSections.localization ? "auto" : 0 }}
          exit={{ height: 0 }}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence>
            {openSections.localization && (
              <motion.div
                key="localization-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.18,
                  delay: openSections.localization ? 0.08 : 0,
                }}
                className="flex items-center justify-between"
              >
                <span className="text-base">Перекладено українською</span>
                <label className="relative ml-2 inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={filters.localized}
                    onChange={() =>
                      setSingleFilter("localized", !filters.localized)
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-5 w-8 rounded-full bg-[#23242A] transition-all peer-checked:bg-[#787880] peer-focus:outline-none"></div>
                  <div className="absolute top-1 left-1 h-3.5 w-3.5 rounded-full bg-white transition-all peer-checked:translate-x-3"></div>
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Sort */}
      <div
        className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
        style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
      >
        <button
          type="button"
          className="mb-3 flex w-full items-center justify-between text-xl font-bold focus:outline-none"
          onClick={() => toggleSection("sort")}
        >
          Сортування{" "}
          <span className="ml-auto text-lg">
            {openSections.sort ? "˄" : "˅"}
          </span>
        </button>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: openSections.sort ? "auto" : 0 }}
          exit={{ height: 0 }}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence>
            {openSections.sort && (
              <motion.div
                key="sort-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.18,
                  delay: openSections.sort ? 0.08 : 0,
                }}
                className="flex items-center gap-2"
              >
                <select
                  value={filters.sort}
                  onChange={(e) => setSingleFilter("sort", e.target.value)}
                  className="mb-2 w-full cursor-pointer rounded-xl border-none bg-[#23242A] px-3 py-2 text-base text-white placeholder-white/60 focus:outline-none"
                  style={{ minHeight: 36 }}
                >
                  <option value="" disabled>
                    Виберіть сортування...
                  </option>
                  {Array.isArray(filters.sortOptions)
                    ? filters.sortOptions.map((s: string) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))
                    : null}
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Age Rating */}
      <div
        className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
        style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
      >
        <button
          type="button"
          className="mb-3 flex w-full items-center justify-between text-xl font-bold focus:outline-none"
          onClick={() => toggleSection("age")}
        >
          Віковий рейтинг{" "}
          <span className="ml-auto text-lg">
            {openSections.age ? "˄" : "˅"}
          </span>
        </button>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: openSections.age ? "auto" : 0 }}
          exit={{ height: 0 }}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence>
            {openSections.age && (
              <motion.div
                key="age-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.18,
                  delay: openSections.age ? 0.08 : 0,
                }}
                className="flex flex-wrap gap-2"
              >
                {ageRatings.map((a, idx) => (
                  <button
                    key={a.label}
                    className={`flex items-center gap-2 rounded-full px-4 py-1 text-base font-medium transition-colors focus:outline-none ${filters.age.includes(a.label) ? "bg-[#787880] text-white" : "bg-[#23242A] text-white hover:bg-[#787880]/80"}`}
                    onClick={() => toggleFilter("age", a.label)}
                    type="button"
                  >
                    {a.label}
                    <span
                      ref={(el) => {
                        tooltipRefs.current[idx] = el;
                      }}
                      onMouseEnter={() => handleTooltipShow(idx, a.info)}
                      onMouseLeave={handleTooltipHide}
                      onFocus={() => handleTooltipShow(idx, a.info)}
                      onBlur={handleTooltipHide}
                      className="group/tooltip relative ml-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-[#787880] bg-[#23242A] text-base opacity-80"
                    >
                      i
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {typeof window !== "undefined" &&
          tooltipOpen !== null &&
          createPortal(
            <span
              className="pointer-events-none fixed z-[9999] rounded-lg border border-[#787880] bg-[#23242A] px-3 py-2 text-xs whitespace-nowrap text-white opacity-100 shadow-lg transition-opacity duration-200"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y + 8,
                transform: "translate(-50%, 0)",
              }}
            >
              {tooltipContent}
            </span>,
            document.body,
          )}
      </div>
      {/* Studio */}
      <div
        className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
        style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
      >
        <button
          type="button"
          className="mb-3 flex w-full items-center justify-between text-xl font-bold focus:outline-none"
          onClick={() => toggleSection("studio")}
        >
          Студія{" "}
          <span className="ml-auto text-lg">
            {openSections.studio ? "˄" : "˅"}
          </span>
        </button>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: openSections.studio ? "auto" : 0 }}
          exit={{ height: 0 }}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence>
            {openSections.studio && (
              <motion.div
                key="studio-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.18,
                  delay: openSections.studio ? 0.08 : 0,
                }}
                ref={studiosRef}
                className="relative"
              >
                <div
                  className={`flex min-h-[36px] w-full cursor-pointer flex-wrap items-center gap-2 rounded-xl border-none bg-[#23242A] px-3 py-2 text-base text-white focus:outline-none ${studiosOpen ? "ring-2 ring-blue-400" : ""}`}
                  onClick={handleStudiosClick}
                  tabIndex={0}
                >
                  {filters.studio.length === 0 && (
                    <span className="text-white/60">Виберіть студію...</span>
                  )}
                  {filters.studio.map((studioValue: string) => {
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
                          onClick={(e) =>
                            handleStudiosTagRemove(studioObj.value, e)
                          }
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
                      onClick={handleStudiosClear}
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
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="absolute top-full left-0 z-50 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-[#6CA0FF33] bg-[#23242A] shadow-lg"
                  >
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
                        onClick={() => handleStudiosOptionClick(s.value)}
                      >
                        {s.label}
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Year Range */}
      <div
        className="mb-2 rounded-xl border border-[#6CA0FF33] bg-transparent p-4"
        style={{ boxShadow: "0 0 0 1px #6CA0FF33" }}
      >
        <button
          type="button"
          className="mb-3 flex w-full items-center justify-between text-xl font-bold focus:outline-none"
          onClick={() => toggleSection("year")}
        >
          Рік виходу{" "}
          <span className="ml-auto text-lg">
            {openSections.year ? "˄" : "˅"}
          </span>
        </button>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: openSections.year ? "auto" : 0 }}
          exit={{ height: 0 }}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence>
            {openSections.year && (
              <motion.div
                key="year-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.18,
                  delay: openSections.year ? 0.08 : 0,
                }}
                className="flex flex-col items-stretch gap-3"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Clear Button */}
      <button
        className="mt-2 w-full rounded-xl border border-[#6CA0FF33] bg-[#23242A] py-2 text-lg font-bold text-white transition-colors hover:bg-[#787880]/80"
        onClick={clearFilters}
      >
        Очистити
      </button>
      {isMobile && (
        <button
          className="mt-2 w-full rounded-xl bg-[#6CA0FF] py-2 text-lg font-bold text-white transition-colors hover:bg-[#4B7ED6]"
          onClick={onApply}
        >
          Застосувати
        </button>
      )}
    </div>
  );
};

export default StudioFilter;
