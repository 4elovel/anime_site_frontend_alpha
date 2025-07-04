"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Crown } from "lucide-react";
import Link from "next/link";

interface TopAnimeCardProps {
  image: string;
  title: string;
  year: number;
  type: string;
  rank: number;
  rating: number;
  showRank?: boolean;
  href?: string;
  small?: boolean;
}

const TopAnimeCard: FC<TopAnimeCardProps> = ({
  image,
  title,
  year,
  type,
  rank,
  rating,
  showRank = true,
  href = "#",
  small = false,
}) => {
  const isTop1 = rank === 1;

  return (
    <Link href={href ?? "#"}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.04,
      }}
      className={
        small
          ? "min-w-[140px] sm:w-[170px] xs:min-w-0 flex flex-col text-white font-sans cursor-pointer transition-transform duration-200"
          : "min-w-[200px] sm:w-[250px] xs:min-w-0 flex flex-col text-white font-sans cursor-pointer transition-transform duration-200"
      }
    >
      <div className={small ? "relative h-[200px] sm:h-[250px] w-full rounded-2xl overflow-hidden" : "relative h-[250px] sm:h-[390px] w-full rounded-2xl overflow-hidden"}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-2xl"
          sizes={small ? "170px" : "250px"}
          priority
        />
      </div>

      <p className="mt-2 font-semibold text-[17px] leading-tight truncate">
        {title}
      </p>

      <p className="text-sm text-neutral-400 mt-0.5">
        {year} ● {type}
      </p>
      {showRank && (
        <div className="mt-1 flex items-center justify-between px-[2px]">
          <div className="flex items-center text-[14px] font-semibold text-white">
            <Crown
              className={`w-[16px] h-[16px] mr-1 ${
                isTop1 ? "text-yellow-400" : "text-white"
              }`}
              fill={isTop1 ? "#facc15" : "white"}
            />
            {rank}
          </div>

          <div className="flex items-center text-[14px] font-semibold text-white">
            {rating.toFixed(2)}
            <Star className="w-[16px] h-[16px] ml-1 text-white fill-white" />
          </div>
        </div>
      )}
    </motion.div>
    </Link>
  );
};

export default TopAnimeCard;
