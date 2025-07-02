import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ContinueWatchingCardProps {
  image: string;
  title: string;
  episode: string;
  year: number;
  currentTime: string;
  totalTime: string;
  progress: number; // 0..1
  onClick?: () => void;
  link?: string;
}

const ContinueWatchingCard: React.FC<ContinueWatchingCardProps> = ({
  image,
  title,
  episode,
  year,
  currentTime,
  totalTime,
  progress,
  onClick,
  link,
}) => {
  const content = (
    <div
      className="relative rounded-2xl overflow-hidden max-w-[500px] min-w-[200px] h-[200px] w-full aspect-[16/9] bg-black shadow-xl cursor-pointer group"
      onClick={onClick}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 480px"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-black/70 transition">
          <svg width={40} height={40} viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="none" />
            <polygon points="16,13 28,20 16,27" fill="#fff" />
          </svg>
        </div>
      </div>

      <div className="absolute left-0 bottom-8 px-6">
        <div className="text-white font-bold text-sm leading-tight drop-shadow-md">
          {title} – {episode}
        </div>
        <div className="text-white text-sm opacity-80">{year}</div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 flex items-center px-6 pb-2">
        <span className="text-white text-sm font-semibold">{currentTime}</span>
        <div className="flex-1 mx-2 h-1 rounded-full bg-white/30 overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
          />
        </div>
        <span className="text-white text-sm font-semibold">{totalTime}</span>
      </div>
    </div>
  );

  return link ? (
    <Link
      href={link}
      className="block focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {content}
    </Link>
  ) : (
    content
  );
};

export default ContinueWatchingCard;
