import { API_BASE_URL } from "@/config";
import React from "react";
import ImdbRating from "@/assets/anime/imdb-rating.svg";
import SectionHeader from "@/components/shared/section-header";
import ActionButton from "@/components/ui/action-button";
import { Play, Share2Icon } from "lucide-react";
import ArrowDown from "@/assets/arrow-down.svg";
import WatchTogether from "@/assets/watch-together.svg";
import Rating from "@/components/ui/rating";
import { EllipsisVertical } from "lucide-react";
import MoreIcon from "@/assets/three-vertical-dots.svg";
import ShareIcon from "@/assets/share.svg";
import StandartButtonIcon from "@/components/ui/standart-button-icon";
import AnimeDetailsPanel from "@/components/shared/anime-details-panel";

interface Studio {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface Seo {
  title: string;
  description: string;
  image: string;
}

interface AnimeDetails {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image_name?: string;
  poster?: string;
  duration?: number;
  episodes_count?: number;
  first_air_date?: string;
  last_air_date?: string;
  imdb_score?: number;
  is_published?: boolean;
  kind?: string;
  studio?: Studio;
  seo?: Seo;
}

async function getAnime(slug: string): Promise<AnimeDetails | null> {
  try {
    const res = await fetch(`${API_BASE_URL}animes/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

async function getAnimeTags(slug: string): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}animes/${slug}/tags`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    // Assuming the response is { data: ["tag1", "tag2", ...] }
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function AnimePage({
  params,
}: {
  params: { slug: string };
}) {
  const anime = await getAnime(params.slug);
  const tags = await getAnimeTags(params.slug);
  if (!anime) {
    return (
      <div className="text-white text-center mt-20">Аніме не знайдено</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-10">
      {/* Left: Poster */}
      <div className="flex flex-col items-center gap-4 min-w-[260px]">
        <img
          src={anime.poster || anime.image_name}
          alt={anime.name}
          className="rounded-2xl w-[220px] h-[320px] object-cover shadow-xl border border-zinc-700"
        />
        <div className="flex flex-col gap-3 w-full mt-2">
          <ActionButton
            text="Додати до списку"
            icon={<ArrowDown size={22} />}
            colorClass="bg-zinc-700 text-white hover:bg-zinc-800"
            className="w-full"
          />
          <ActionButton
            text="Дивитись трейлер"
            icon={<Play size={22} />}
            colorClass="bg-zinc-700 text-white hover:bg-zinc-800"
            className="w-full"
          />
        </div>
      </div>

      {/* Center: Main info */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
              {anime.name}
            </h1>
            {anime.seo?.title && (
              <div className="text-lg text-zinc-400 mb-1">
                {anime.seo.title}
              </div>
            )}
            <Rating
              icon={<ImdbRating size={22} />}
              name="IMDb"
              rating={anime.imdb_score ?? "-"}
              maxRating={10}
            />
          </div>
        </div>
        {/* TODO DELETE TEST TAG */}
        <div className="flex flex-row flex-wrap items-center gap-3 min-h-[27px]">
          {/* Hardcoded test tag */}
          <span className="font-sans text-white decoration-dotted text-base font-normal leading-6 underline underline-dotted underline-offset-4 decoration-[#49638A] cursor-pointer bg-none rounded-none p-0">
            Тест-тег
          </span>
          {/* Tags from DB */}
          {tags &&
            tags.map((tag, idx) => (
              <span
                key={tag + idx}
                className="font-sans text-white text-base font-normal leading-6 underline underline-dotted underline-offset-4 decoration-[#49638A] cursor-pointer bg-none rounded-none p-0"
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="items-center text-center content-center justify-center">
          <div className="flex flex-row gap-3 mb-4 justify-center content-center items-center">
            <ActionButton
              text="Дивитися E1"
              icon={<Play size={22} />}
              colorClass="bg-[#4B7FCC] text-white hover:bg-[#3c70bd]"
              className="w-full"
            />
            <ActionButton
              text="Дивитись разом"
              icon={<WatchTogether size={22} />}
              colorClass="bg-[#D06005] text-white hover:bg-[#c25903]"
              className="w-full"
            />
            <StandartButtonIcon
              className="w-23"
              icon={<Share2Icon color="white" size={22} />}
            />
            <StandartButtonIcon icon={<MoreIcon size={22} />} />
          </div>
          <SectionHeader title="Опис" badge="UA" className="mb-2" />
          <div className="text-zinc-200 text-base leading-relaxed whitespace-pre-line">
            {anime.description || anime.seo?.description || "Опис недоступний."}
          </div>
        </div>
        {/* TODO: Fetch and display episodes, persons, tags, ratings, comments, similars, related using additional endpoints */}
      </div>

      {/* Right: Details panel (only visible on large screens) */}
      <AnimeDetailsPanel anime={anime} />
    </div>
  );
}
