import React from "react";

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

/**
 * AnimeDetailsPanel is only visible on screens >= 1024px (lg: breakpoint)
 */
const AnimeDetailsPanel: React.FC<{ anime: AnimeDetails }> = ({ anime }) => {
  return (
    <aside
      className="hidden lg:flex w-full h-fit max-w-xs bg-transparent rounded-2xl border border-[#2a3550] p-6 flex-col gap-2 text-white ml-auto"
      aria-label="Anime details panel"
    >
      <h2 className="text-xl font-bold mb-2">Деталі</h2>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-400">Тип:</span>
          <span>{anime.kind || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Статус:</span>
          <span>{anime.is_published ? "Вийшло" : "Онґоїнг"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Епізоди:</span>
          <span>{anime.episodes_count ?? "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Тривалість епізоду:</span>
          <span>{anime.duration ? `${anime.duration} хвилин` : "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Початок:</span>
          <span>
            {anime.first_air_date
              ? new Date(anime.first_air_date).toLocaleDateString("uk-UA")
              : "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Кінець:</span>
          <span>
            {anime.last_air_date
              ? new Date(anime.last_air_date).toLocaleDateString("uk-UA")
              : "-"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">Студія:</span>
          {anime.studio?.name ? (
            <span className="flex items-center gap-2">
              {anime.studio?.slug && (
                <img
                  src={`/assets/studios/${anime.studio.slug}.svg`}
                  alt={anime.studio.name}
                  className="w-8 h-8 object-contain bg-white rounded"
                />
              )}
              <span>{anime.studio.name}</span>
            </span>
          ) : (
            <span>-</span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AnimeDetailsPanel;
