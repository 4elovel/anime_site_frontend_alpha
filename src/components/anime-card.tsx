import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface AnimeCardProps {
  image: string;
  title: string;
  imdbRating: string;
  imdbVotes: string;
  seasons: number;
  duration: string;
}

// Функція для відмінювання слова "Сезон" українською
function getSeasonWord(n: number) {
  if (n % 10 === 1 && n % 100 !== 11) return "Сезон";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100))
    return "Сезони";
  return "Сезонів";
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  image,
  title,
  imdbRating,
  imdbVotes,
  seasons,
  duration,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)" }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="bg-black rounded-3xl p-4 sm:p-3 xs:p-2 w-full max-w-xs mx-auto flex flex-col items-center shadow-xl min-w-[220px] xs:min-w-[180px]"
      style={{ minWidth: 0 }}
    >
      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 xs:mb-2">
        <Image
          src={image}
          alt={title}
          width={400}
          height={533}
          className="object-cover w-full h-full"
          priority
        />
      </div>
      <h2 className="text-white text-2xl sm:text-xl xs:text-lg font-bold w-full text-left mb-3 xs:mb-2 leading-tight truncate">
        {title}
      </h2>
      <div className="flex items-center w-full mb-4 xs:mb-2">
        <span className="bg-[#4B7FCC] text-white text-sm font-semibold rounded-lg px-3 py-1 flex items-center mr-3 min-w-[48px] h-8 xs:h-7 xs:px-2 xs:text-xs">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 xs:w-4 xs:h-4"
          >
            <path
              d="M5 1V17M13 1V17M1 5H5M1 13H5M1 9H17M13 5H17M13 13H17M1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H15C15.5304 1 16.0391 1.21071 16.4142 1.58579C16.7893 1.96086 17 2.46957 17 3V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17H3C2.46957 17 1.96086 16.7893 1.58579 16.4142C1.21071 16.0391 1 15.5304 1 15V3Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          IMDb
        </span>
        <span className="text-[#918C8C] text-sm font-semibold mr-1 xs:text-xs">
          {imdbRating}
        </span>
        <span className="text-[#918C8C] text-sm xs:text-xs">({imdbVotes})</span>
      </div>
      <div className="flex w-full justify-between mt-auto gap-2 xs:gap-1">
        <div className="flex items-center border border-[#918C8C80] rounded-xl px-3 py-2 xs:px-2 xs:py-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 xs:w-4 xs:h-4"
          >
            <path
              d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z"
              clipRule="evenodd"
              fill="#fff"
              fillRule="evenodd"
            />
          </svg>
          <span className="text-[#918C8C] text-sm font-medium xs:text-xs">
            {seasons} {getSeasonWord(seasons)}
          </span>
        </div>
        <div className="flex items-center border border-[#918C8C80] rounded-xl px-3 py-2 ml-2 xs:px-2 xs:py-1 xs:ml-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 xs:w-4 xs:h-4"
          >
            <path
              d="M12 7V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[#918C8C] text-sm font-medium xs:text-xs">
            {duration}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimeCard;
