import React from "react";
import { Star, Film } from "lucide-react";

interface RatingProps {
  localRating: number | string;
  imdb: number | string;
  maxRating?: number | string;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  localRating,
  imdb,
  maxRating = 10,
  className = "",
}) => (
  <div className={`flex flex-row gap-12 w-full ${className}`}>
    {/* Наш рейтинг */}
    <div className="flex flex-col">
      <div className="flex gap-2 mb-1 items-center">
        <Star className="w-6 h-6 text-white" fill="white" />
        <span className="text-white text-sm font-semibold">Наш рейтинг:</span>
      </div>
      <span className="text-[#4B7FCC] text-sm font-medium">
        {localRating ?? "-"}/{maxRating}
      </span>
    </div>
    {/* IMDb */}
    <div className="flex flex-col">
      <div className="flex gap-2 mb-1 items-center">
        <Film className="w-6 h-6 text-white" />
        <span className="text-white text-sm font-semibold">IMDb:</span>
      </div>
      <span className="text-[#4B7FCC] text-sm font-medium">
        {imdb ?? "-"} / {maxRating}
      </span>
    </div>
  </div>
);

export default Rating;
