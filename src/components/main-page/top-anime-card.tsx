"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Crown } from "lucide-react";

interface TopAnimeCardProps {
  image: string;
  title: string;
  year: number;
  type: string;
  rank: number;
  rating: number;
}

const TopAnimeCard: FC<TopAnimeCardProps> = ({
  image,
  title,
  year,
  type,
  rank,
  rating,
}) => {
  const isTop1 = rank === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.04,
      }}
      className="w-[260px] min-w-[260px] flex flex-col text-white font-sans cursor-pointer transition-transform duration-200"
    >
      {/* Зображення */}
      <div className="relative h-[390px] w-full rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-2xl"
          sizes="260px"
        />
      </div>

      {/* Назва */}
      <p className="mt-2 font-semibold text-[17px] leading-tight truncate">
        {title}
      </p>

      {/* Рік + тип */}
      <p className="text-sm text-neutral-400 mt-0.5">
        {year} ● {type}
      </p>

      {/* Ранг + Рейтинг */}
      <div className="mt-1 flex items-center justify-between px-[2px]">
        {/* Топ */}
        <div className="flex items-center text-[14px] font-semibold text-white">
          <Crown
            className={`w-[16px] h-[16px] mr-1 ${
              isTop1 ? "text-yellow-400" : "text-white"
            }`}
            fill={isTop1 ? "#facc15" : "white"}
          />
          {rank}
        </div>

        {/* Рейтинг */}
        <div className="flex items-center text-[14px] font-semibold text-white">
          {rating.toFixed(2)}
          <Star className="w-[16px] h-[16px] ml-1 text-white fill-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default TopAnimeCard;
