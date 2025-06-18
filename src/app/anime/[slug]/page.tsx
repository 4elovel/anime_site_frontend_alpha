import { API_BASE_URL } from "@/config";
import CardCollection from "@/components/card-collection";
import React from "react";

interface Genre {
  slug: string;
  name_ua: string;
}

interface AnimeDetails {
  id: string;
  name: string;
  name_en?: string;
  name_ja?: string;
  poster: string;
  year?: number;
  kind?: string;
  status?: string;
  episodes?: number;
  episodes_aired?: number;
  next_episode_at?: string;
  duration?: number;
  rating?: string;
  studio?: string;
  score?: number;
  imdb_score?: number;
  genres?: Genre[];
  synopsis?: string;
  description?: string;
  mal_id?: number;
  trailer_url?: string;
  stats?: any;
}

async function getAnime(slug: string): Promise<AnimeDetails | null> {
  // Test data for UI development
  return {
    id: "1",
    name: "Звичайний роман у Коулуні (2025)",
    name_en: "Kowloon Generic Romance",
    name_ja: "九龍ジェネリックロマンス",
    poster: "https://cdn.myanimelist.net/images/anime/1982/138006.jpg",
    year: 2025,
    kind: "tv",
    status: "ongoing",
    episodes: 13,
    episodes_aired: 3,
    next_episode_at: "2025-04-26T17:00:00+03:00",
    duration: 25,
    rating: "PG-13",
    studio: "ARVO",
    score: 7.76,
    imdb_score: 8.3,
    genres: [
      { slug: "romance", name_ua: "Романтика" },
      { slug: "sci-fi", name_ua: "Фантастика" },
      { slug: "seinen", name_ua: "Сейнен" },
      { slug: "work", name_ua: "Робота" },
      { slug: "adult", name_ua: "Про дорослих" },
    ],
    synopsis: "У далекому майбутньому, в місті-гетто Коулун Вол-Сіті, живуть люди, які обожнюють старий спосіб життя...",
    description: `У далекому майбутньому, в місті-гетто Коулун Вол-Сіті, живуть люди, які обожнюють старий спосіб життя. Це притулок для тих, хто сумує за Гонконгом минулого. Однак рієлторка Куджіраї Рейко прагне нового та захоплюючого в цьому районі. Наполегливість її єдиний колега, Кудо Хадзіме, насолоджується ностальгією, яку викликає місто, і відчуває все сучасне, що просочується до цієї сітки. Але, попри різні погляди та постійні сварки через найбуденніші речі, вони часто знаходять задоволення в компанії одне одного.\n\nОдного дня невдалий жарт призводить до того, що Хадзіме робить несподіваний крок у бік Рейко, після чого він швидко вибачається. Спантеличена його вчинком, Рейко починає шукати можливі пояснення, тільки щоб виявити минуле, про яке вона не має жодних спогадів.`,
    mal_id: 57240,
    trailer_url: "https://www.youtube.com/watch?v=example",
    stats: {
      watching: 42059,
      completed: 34090,
      on_hold: 7270,
      dropped: 743,
      plan_to_watch: 0,
    },
  };
}

export default async function AnimePage({ params }: { params: { slug: string } }) {
  const anime = await getAnime(params.slug);
  if (!anime) {
    return <div className="text-white text-center mt-20">Аніме не знайдено</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-10">
      {/* Left: Poster and actions */}
      <div className="flex flex-col items-center md:items-start gap-4 min-w-[260px]">
        <img
          src={anime.poster}
          alt={anime.name}
          className="rounded-2xl w-[220px] h-[320px] object-cover shadow-xl border border-zinc-700"
        />
        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-xl mt-2 transition-colors">Додати у список</button>
        {anime.trailer_url && (
          <a
            href={anime.trailer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 rounded-xl text-center mt-2 transition-colors"
          >
            Дивитись трейлер
          </a>
        )}
      </div>

      {/* Center: Main info */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{anime.name}</h1>
            {anime.name_en && <div className="text-lg text-zinc-400 mb-1">{anime.name_en}</div>}
            {anime.name_ja && <div className="text-base text-zinc-500 mb-1">{anime.name_ja}</div>}
            <div className="flex flex-wrap gap-2 mt-2">
              {anime.genres?.map((genre) => (
                <span key={genre.slug} className="bg-zinc-800 text-blue-300 px-2 py-1 rounded text-xs font-medium">
                  {genre.name_ua}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-zinc-300">
            <div>
              <span className="font-semibold">Наш рейтинг:</span> {anime.score ? anime.score.toFixed(2) : "-"}/10
            </div>
            {anime.imdb_score && (
              <div>
                <span className="font-semibold">IMDb:</span> {anime.imdb_score}/10
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {anime.kind && <span className="bg-zinc-700 px-2 py-1 rounded text-xs">{anime.kind === 'tv' ? 'TV Серіал' : anime.kind}</span>}
          {anime.status && <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs">{anime.status === 'ongoing' ? 'Онґоїнг' : anime.status}</span>}
          {typeof anime.episodes_aired === 'number' && typeof anime.episodes === 'number' && (
            <span className="bg-zinc-700 px-2 py-1 rounded text-xs">{anime.episodes_aired} / {anime.episodes} епізодів</span>
          )}
          {anime.duration && <span className="bg-zinc-700 px-2 py-1 rounded text-xs">Тривалість: {anime.duration} хв</span>}
          {anime.rating && <span className="bg-zinc-700 px-2 py-1 rounded text-xs">Рейтинг: {anime.rating}</span>}
          {anime.studio && <span className="bg-zinc-700 px-2 py-1 rounded text-xs">Студія: {anime.studio}</span>}
        </div>
        <div className="flex gap-4 mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors">Дивитись E1</button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors">Дивитись разом</button>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-2">Опис</h2>
          <div className="text-zinc-200 text-base leading-relaxed whitespace-pre-line">
            {anime.description || anime.synopsis || "Опис недоступний."}
          </div>
        </div>
        {/* TODO: Add video player and episode list if available */}
      </div>

      {/* Right: Details and stats */}
      <div className="min-w-[220px] flex flex-col gap-6">
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-700 text-white text-sm">
          <div className="mb-2">
            <span className="font-semibold">Тип:</span> {anime.kind === 'tv' ? 'TV Серіал' : anime.kind}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Статус:</span> <span className="text-blue-400">{anime.status === 'ongoing' ? 'Онґоїнг' : anime.status}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Епізоди:</span> {anime.episodes_aired} / {anime.episodes}
          </div>
          {anime.next_episode_at && (
            <div className="mb-2">
              <span className="font-semibold">Наступний епізод:</span> {new Date(anime.next_episode_at).toLocaleString('uk-UA', { dateStyle: 'long', timeStyle: 'short' })}
            </div>
          )}
          {anime.duration && (
            <div className="mb-2">
              <span className="font-semibold">Тривалість епізоду:</span> {anime.duration} хв
            </div>
          )}
          {anime.rating && (
            <div className="mb-2">
              <span className="font-semibold">Рейтинг:</span> {anime.rating}
            </div>
          )}
          {anime.studio && (
            <div className="mb-2">
              <span className="font-semibold">Студія:</span> {anime.studio}
            </div>
          )}
        </div>
        {/* TODO: Add statistics and links if available */}
      </div>
    </div>
  );
}
