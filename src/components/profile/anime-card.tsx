import Image from "next/image";

export interface AnimeCardProps {
  animeName: string;
  watchedAge: number | string;
  url: string;
  className?: string;
}

export default function AnimeCard({
  animeName,
  watchedAge,
  url,
  className = "",
}: AnimeCardProps) {
  return (
    <div
      className={`flex flex-row items-center h-full w-auto bg-transparent rounded-lg p-0 ${className}`}
    >
      <div className="flex-shrink-0">
        <Image
          className="h-24 w-auto rounded-md"
          width={96}
          height={128}
          src={url}
          alt="Anime Cover"
        />
      </div>
      <div className="flex flex-col justify-between h-full ml-4 flex-1">
        <h1 className="text-[1.25rem] font-[600] text-white mb-auto">
          {animeName}
        </h1>
        <p className="text-[1rem] text-[#5C5C5C] mt-auto">
          {watchedAge} дні тому
        </p>
      </div>
    </div>
  );
}
