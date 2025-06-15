import React from "react";

export interface AnimeCardProps {
  image: string;
  title: string;
  title_ja?: string;
  year?: number;
  media_type?: string;
  status?: string;
  score?: number;
  slug?: string;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  image,
  title,
  year,
  media_type,
  slug,
}) => {
  return (
    <div className="flex flex-col items-center w-full sm:w-full">
      <a href={slug ? `/anime/${slug}` : "#"} className="w-full block">
        <img
          src={image}
          //src="https://cdn.myanimelist.net/images/anime/4/5123.jpg"
          alt={title}
          className="rounded-2xl w-full h-auto sm:w-full sm:h-64 aspect-[3/4] sm:aspect-auto object-cover shadow-lg mb-3"
          style={{ background: "#18181b" }}
        />
      </a>
      <span
        className="block w-full text-center text-lg font-semibold text-white truncate"
        title={title}
      >
        {title}
      </span>
      <div className="flex items-center justify-center text-zinc-400 mt-1 w-full text-sm">
        {year && <span>{year}</span>}
        {year && media_type && (
          <span className="">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99999 5.85217C10.8164 5.85213 11.6148 6.09191 12.2961 6.54176C12.9774 6.9916 13.5115 7.63167 13.8321 8.38247C14.1528 9.13328 14.2457 9.96173 14.0996 10.7649C13.9534 11.5681 13.5744 12.3107 13.0099 12.9004C12.4453 13.4901 11.7199 13.9009 10.9238 14.0819C10.1277 14.2628 9.29597 14.2059 8.53194 13.9182C7.76791 13.6305 7.10523 13.1247 6.62621 12.4636C6.14719 11.8026 5.87293 11.0153 5.8375 10.1997L5.83333 10.0188L5.8375 9.83801C5.88409 8.7653 6.343 7.75199 7.11851 7.00939C7.89403 6.26679 8.92628 5.85223 9.99999 5.85217Z"
                fill="#918C8C"
              />
            </svg>
          </span>
        )}
        {media_type && <span>{media_type}</span>}
      </div>
    </div>
  );
};

export default AnimeCard;
