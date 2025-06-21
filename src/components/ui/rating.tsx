import React from "react";

interface RatingProps {
  icon: React.ReactNode;
  name: string;
  rating: number | string;
  maxRating: number | string;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  icon,
  name,
  rating,
  maxRating,
  className = "",
}) => (
  <div className={`flex flex-col gap-2 text-sm text-[#4B7FCC] ${className}`}>
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-white font-semibold">{name}:</span>
      <span className="text-[#4B7FCC] text-base font-normal">
        {rating ?? "-"}{" "}
        <span className="text-[#4B7FCC] text-base font-normal">
          / {maxRating}
        </span>
      </span>
    </div>
  </div>
);

export default Rating;
