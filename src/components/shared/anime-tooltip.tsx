import React from "react";

interface Genre {
  slug: string;
  name_ua: string;
}

interface AnimeTooltipProps {
  slug: string;
  title: string;
  title_ja?: string;
  score?: number;
  synopsis?: string;
  media_type?: string;
  status?: string;
  episodes_released?: number;
  episodes_total?: number;
  genres?: Genre[];
}

export const AnimeTooltip: React.FC<AnimeTooltipProps> = ({
  slug,
  title,
  title_ja,
  score,
  synopsis,
  media_type,
  status,
  episodes_released,
  episodes_total,
  genres = [],
}) => {
  return (
    <div className="w-80 flex-col gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="font-bold text-lg">{title}</div>
          {typeof score === "number" && score > 0 && (
            <div className="bg-yellow-100 text-yellow-800 rounded-md px-2 text-sm font-semibold flex items-center gap-1">
              {score}
              <svg
                className="h-4 w-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            </div>
          )}
        </div>
        {title_ja && <div className="text-xs text-gray-500">{title_ja}</div>}
        {synopsis && (
          <div className="text-muted-foreground mb-2 line-clamp-4 text-sm">
            {synopsis}
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {media_type && <span>{media_type}</span>}
          {status && (
            <span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700">
              {status}
            </span>
          )}
          {typeof episodes_released === "number" &&
            typeof episodes_total === "number" && (
              <span>
                Епізоди: {episodes_released} / {episodes_total}
              </span>
            )}
        </div>
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-muted-foreground">Жанри:</span>
            {genres.map((genre, i) => (
              <span key={genre.slug} className="underline text-primary">
                {genre.name_ua}
                {i + 1 !== genres.length && <span>, </span>}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeTooltip;
