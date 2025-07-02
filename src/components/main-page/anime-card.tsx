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
  isAnonce?: boolean;
  date?: string;
}

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
  isAnonce = false,
  date,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="p-4 sm:p-3 xs:p-1 w-full max-w-full min-w-0 mx-auto flex flex-col items-center overflow-hidden"
      style={{ minWidth: 0 }}
    >
      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 xs:mb-2 relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={533}
          className="object-cover w-full h-full"
          priority
        />
        {isAnonce && (
          <span
            className="absolute top-3 right-3 bg-[#4B7FCC] text-white text-sm font-semibold rounded-xl px-4 py-1 shadow-lg z-10"
            style={{ letterSpacing: 0.2 }}
          >
            Анонс
          </span>
        )}
      </div>
      <h2 className="text-white text-xl font-bold w-full text-left mb-1 leading-tight truncate xs:truncate">
        {title}
      </h2>
      {isAnonce && date && (
        <div
          className="text-[#918C8C] text-base font-normal w-full text-left mb-2 mt-0.5"
          style={{ letterSpacing: 0.2 }}
        >
          {date}
        </div>
      )}
      {!isAnonce && (
        <>
          <div className="flex items-center w-full mb-4 xs:mb-1">
            <span className="bg-[#4B7FCC] text-white text-sm font-semibold rounded-lg px-3 py-1 flex items-center mr-3 min-w-[48px] h-8 xs:h-5 xs:px-0.5 xs:text-[11px]">
              IMDb
            </span>
            <span className="text-[#918C8C] text-xs font-semibold mr-1 sm:text-sm">
              {imdbRating}
            </span>
            <span className="text-[#918C8C] text-xs sm:text-sm">
              ({imdbVotes})
            </span>
          </div>
          <div className="flex w-full justify-between mt-auto gap-1 sm:gap-2">
            <div className="flex items-center border border-[#918C8C80] rounded-xl px-2 py-1 sm:px-3 sm:py-2">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M18.6252 1.73536H11.3179C11.0959 1.73604 10.8788 1.67078 10.694 1.54786L9.39083 0.67645C8.95931 0.387894 8.45165 0.234341 7.93255 0.235357H4.3752C3.67924 0.236101 3.01199 0.512902 2.51987 1.00502C2.02775 1.49715 1.75095 2.16439 1.7502 2.86036V3.98536H21.2502C21.2502 2.53786 20.0727 1.73536 18.6252 1.73536ZM19.3635 18.2354H3.63692C2.94814 18.2346 2.28727 17.9631 1.79682 17.4795C1.30638 16.9959 1.02566 16.3389 1.0152 15.6502L0.258639 7.92801V7.91489C0.233864 7.60538 0.273417 7.29409 0.37481 7.00062C0.476203 6.70714 0.637241 6.43783 0.84779 6.20962C1.05834 5.98142 1.31384 5.79926 1.59822 5.67461C1.8826 5.54997 2.1897 5.48553 2.5002 5.48536H20.5049C20.8153 5.48566 21.1223 5.55019 21.4066 5.6749C21.6908 5.7996 21.9462 5.98178 22.1567 6.20997C22.3671 6.43816 22.5281 6.70743 22.6294 7.00084C22.7308 7.29425 22.7703 7.60546 22.7455 7.91489V7.92801L21.9852 15.6502C21.9747 16.3389 21.694 16.9959 21.2036 17.4795C20.7131 17.9631 20.0523 18.2346 19.3635 18.2354Z"
                  fill="#918C8C"
                />
              </svg>
              <span className="text-[#918C8C] text-xs sm:text-sm font-medium">
                {seasons} {getSeasonWord(seasons)}
              </span>
            </div>
            <div className="flex items-center border border-[#918C8C80] rounded-xl px-3 py-2 ml-2 xs:px-1 xs:py-0.5 xs:ml-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 xs:w-2 xs:h-2"
              >
                <path
                  d="M10.3335 0.246094C15.8565 0.246094 20.3335 4.72309 20.3335 10.2461C20.3335 15.7691 15.8565 20.2461 10.3335 20.2461C4.8105 20.2461 0.333496 15.7691 0.333496 10.2461C0.333496 4.72309 4.8105 0.246094 10.3335 0.246094ZM10.3335 4.24609C10.0683 4.24609 9.81393 4.35145 9.62639 4.53899C9.43885 4.72652 9.3335 4.98088 9.3335 5.24609V10.2461C9.33355 10.5113 9.43895 10.7656 9.6265 10.9531L12.6265 13.9531C12.8151 14.1353 13.0677 14.236 13.3299 14.2338C13.5921 14.2315 13.8429 14.1263 14.0283 13.9409C14.2137 13.7555 14.3189 13.5047 14.3212 13.2425C14.3234 12.9803 14.2227 12.7277 14.0405 12.5391L11.3335 9.83209V5.24609C11.3335 4.98088 11.2281 4.72652 11.0406 4.53899C10.8531 4.35145 10.5987 4.24609 10.3335 4.24609Z"
                  fill="#918C8C"
                />
              </svg>
              <span className="text-[#918C8C] text-xs sm:text-sm font-medium">
                {duration}
              </span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default AnimeCard;
