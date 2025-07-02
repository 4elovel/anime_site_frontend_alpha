"use client";
import Navbar from "@/components/nav/navbar";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";

interface ErrorPageProps {
  errorCode?: 404 | 403;
  // entityType?: "anime" | "genre" | "tag" | "character" | "studio" | "default";
}

const errorTexts = {
  anime: {
    text: "Це аніме загубилось у мультивсесвіті...",
    subtext: "О ні! Ми не можемо знайти те, що ти шукаєш... Але можливо тобі сподобається щось із цього!",
  },
  genre: {
    text: "Цей жанр ще не відкрито...",
    subtext: "Ми не знайшли такий жанр, але у нас є багато інших цікавих напрямків!",
  },
  tag: {
    text: "Цей тег ще не набув популярності...",
    subtext: "Ми не знайшли такий тег, але ти можеш дослідити інші!",
  },
  character: {
    text: "Цей персонаж десь подорожує...",
    subtext: "Ми не знайшли цього героя, але інші чекають на тебе!",
  },
  studio: {
    text: "Студія загубилась у світі аніме...",
    subtext: "Ми не знайшли цю студію, але є багато інших!",
  },
  default: {
    text: "Сторінку не знайдено...",
    subtext: "Ми не можемо знайти те, що ти шукаєш. Спробуй інший запит!",
  },
};

const errorConfig = {
  404: (entityType: string = "default") => ({
    text: errorTexts[entityType as keyof typeof errorTexts]?.text || errorTexts.default.text,
    subtext: errorTexts[entityType as keyof typeof errorTexts]?.subtext || errorTexts.default.subtext,
    image: "/assets/errors/404.png",
  }),
  403: {
    text: "Заборонена зона... але в тебе є шанс знайти щось цікаве 🧭",
    subtext:
      "Схоже, у тебе немає доступу до цієї сторінки. Можливо, щось із цього тобі сподобається!",
    image: "/assets/errors/403.png",
  },
};
//TODO: GET FROM API
const animeList = [
  {
    id: 1,
    slug: "tower-of-god-s2",
    image: "/assets/profile/mock-history-anime-card.png",
    title: "Вежа Бога - 2 сезон",
    year: 2024,
    type: "TV Серіал",
    rating: 6.68,
  },
  {
    id: 2,
    slug: "kusuriya-no-hitorigoto",
    image: "/assets/profile/mock-history-anime-card2.png",
    title: "Лікиця-одиначка",
    year: 2023,
    type: "TV Серіал",
    rating: 8.12,
  },
  {
    id: 3,
    slug: "milgram",
    image: "/assets/anime/imdb-rating.svg",
    title: "Milgram",
    year: 2022,
    type: "ONA",
    rating: 7.45,
  },
  {
    id: 4,
    slug: "yuan-zun",
    image: "/assets/profile/mock-history-anime-card.png",
    title: "Юань Цзунь",
    year: 2024,
    type: "TV Серіал",
    rating: 7.9,
  },
];

function getEntityTypeFromPath(path: string): keyof typeof errorTexts {
  if (path.includes("/anime/")) return "anime";
  if (path.includes("/genre/")) return "genre";
  if (path.includes("/tag/")) return "tag";
  if (path.includes("/character/")) return "character";
  if (path.includes("/studio/") || path.includes("/studios/")) return "studio";
  return "default";
}

export default function UniversalErrorPage({
  errorCode = 404,
}: ErrorPageProps) {
  const pathname = usePathname();
  const entityType = getEntityTypeFromPath(pathname || "");

  const listRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };
  const { text, subtext, image } =
    errorCode === 404
      ? errorConfig[404](entityType)
      : (errorConfig[errorCode] as any);
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="mb-6">
          <Image
            src={image}
            alt={`Error ${errorCode}`}
            width={200}
            height={200}
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
          {text}
        </h1>
        <p className="text-lg text-gray-400 text-center mb-8 max-w-xl">
          {subtext}
        </p>
        <div className="flex items-center gap-4 w-full max-w-5xl justify-center py-2">
          <button
            className="bg-[#23272F] rounded-xl p-2 text-white hover:bg-[#323742] transition"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12L5 12M5 12L9 8M5 12L9 16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div
            ref={listRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide w-full py-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {animeList.map((anime) => (
              <div
                key={anime.id}
                className="flex flex-col items-center min-w-[250px] max-w-[250px] p-3"
              >
                <Link href={`/anime/${anime.slug}`} className="block w-full">
                  <Image
                    src={anime.image}
                    alt={anime.title}
                    width={200}
                    height={280}
                    className="rounded-xl w-full h-[280px] object-cover"
                  />
                </Link>
                <div className="mt-3 w-full">
                  <h2
                    className="text-white text-lg font-bold leading-tight mb-1 truncate"
                    title={anime.title}
                  >
                    {anime.title}
                  </h2>
                  <div className="flex items-center text-gray-400 text-sm mb-1 gap-2">
                    <span>{anime.year}</span>
                    <span>•</span>
                    <span>{anime.type}</span>
                    <span className="ml-auto flex items-center gap-1">
                      {anime.rating}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="inline text-white"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </span>
                  </div>
                  <Link href={`/anime/${anime.slug}`} className="block mt-2">
                    <button className="w-full bg-[#4B7FCC] text-white rounded-lg py-2 font-semibold flex items-center justify-center gap-2 transition">
                      Дивитись
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 4.22644V20.2264L20.5 12.2264L7.5 4.22644Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button
            className="bg-[#23272F] rounded-xl p-2 text-white hover:bg-[#323742] transition rotate-180"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12L5 12M5 12L9 8M5 12L9 16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="flex items-center gap-2 bg-[#1C1C1C] rounded-xl px-6 py-3 text-white hover:bg-[#323742] transition text-lg font-medium">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5 21.2264L15.5 15.2264M3.5 10.2264C3.5 11.1457 3.68106 12.0559 4.03284 12.9052C4.38463 13.7545 4.90024 14.5262 5.55025 15.1762C6.20026 15.8262 6.97194 16.3418 7.82122 16.6936C8.6705 17.0454 9.58075 17.2264 10.5 17.2264C11.4193 17.2264 12.3295 17.0454 13.1788 16.6936C14.0281 16.3418 14.7997 15.8262 15.4497 15.1762C16.0998 14.5262 16.6154 13.7545 16.9672 12.9052C17.3189 12.0559 17.5 11.1457 17.5 10.2264C17.5 9.30719 17.3189 8.39694 16.9672 7.54766C16.6154 6.69838 16.0998 5.9267 15.4497 5.27669C14.7997 4.62668 14.0281 4.11107 13.1788 3.75928C12.3295 3.4075 11.4193 3.22644 10.5 3.22644C9.58075 3.22644 8.6705 3.4075 7.82122 3.75928C6.97194 4.11107 6.20026 4.62668 5.55025 5.27669C4.90024 5.9267 4.38463 6.69838 4.03284 7.54766C3.68106 8.39694 3.5 9.30719 3.5 10.2264Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Спробувати пошук
          </button>
          <button className="flex items-center gap-2 bg-[#383838] rounded-xl px-6 py-3 text-white hover:bg-[#323742] transition text-lg font-medium">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 14.2264L5.5 10.2264M5.5 10.2264L9.5 6.22644M5.5 10.2264H16.5C17.5609 10.2264 18.5783 10.6479 19.3284 11.398C20.0786 12.1482 20.5 13.1656 20.5 14.2264C20.5 15.2873 20.0786 16.3047 19.3284 17.0549C18.5783 17.805 17.5609 18.2264 16.5 18.2264H15.5"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Повернутись на головну
          </button>
          <button className="flex items-center gap-2 bg-[#1C1C1C] rounded-xl px-6 py-3 text-white hover:bg-[#323742] transition text-lg font-medium">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="white"
              />
            </svg>
            Популярне аніме
          </button>
        </div>
      </div>
    </>
  );
}
