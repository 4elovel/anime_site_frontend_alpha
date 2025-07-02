import React from "react";
import Image from "next/image";

interface CommentCardProps {
  avatarUrl: string;
  username: string;
  timeAgo: string;
  text: string;
  tag?: string;
  animeTitle: string;
  animeUrl?: string;
}

const CommentCard: React.FC<CommentCardProps> = ({
  avatarUrl,
  username,
  timeAgo,
  text,
  tag = "Аніме",
  animeTitle,
  animeUrl = "#",
}) => {
  return (
    <div
      className="px-5 py-4 w-full max-w-xl text-white
        sm:px-4 sm:py-3 sm:max-w-md sm:text-[15px]
        xs:px-2 xs:py-2 xs:max-w-[170px] xs:text-[13px]"
    >
      <div className="flex items-center gap-3 mb-2 sm:gap-2 sm:mb-1 xs:gap-1 xs:mb-1">
        <div className="w-12 h-12 sm:w-9 sm:h-9 xs:w-7 xs:h-7 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={avatarUrl}
            alt={username}
            width={48}
            height={48}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-lg leading-tight sm:text-base xs:text-[13px] xs:leading-tight">
            {username}
          </span>
          <span className="text-xs text-[#bdbdbd] leading-tight sm:text-[11px] xs:text-[10px]">
            {timeAgo}
          </span>
        </div>
      </div>
      <div className="text-base leading-snug mb-4 whitespace-pre-line sm:text-[15px] sm:mb-3 xs:text-[12px] xs:mb-2">
        {text}
      </div>
      <div className="flex items-center gap-3 mt-2 sm:gap-2 sm:mt-1 xs:gap-1 xs:mt-1">
        <span className="bg-black border border-[#444] rounded-full px-3 py-1 text-sm font-semibold text-white sm:px-2 sm:py-0.5 sm:text-xs xs:px-2 xs:py-0.5 xs:text-[11px]">
          {tag}
        </span>
        <a
          href={animeUrl}
          className="text-[#3b82f6] text-base font-medium hover:underline transition-colors sm:text-[15px] xs:text-[12px]"
        >
          {animeTitle}
        </a>
      </div>
    </div>
  );
};

export default CommentCard;
