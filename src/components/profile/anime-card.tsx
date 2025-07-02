import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

export interface AnimeCardProps {
  animeName: string;
  watchedAge: number | string;
  url: string;
  className?: string;
  isLoading?: boolean;
}

export default function AnimeCard({
  animeName,
  watchedAge,
  url,
  className = "",
  isLoading = false,
}: AnimeCardProps) {
  return (
    <div
      className={`flex h-full w-auto flex-row items-center rounded-lg bg-transparent p-0 ${className}`}
    >
      {isLoading ? (
        <Skeleton className="h-24 w-17 bg-stone-500" />
      ) : (
        <div className="flex-shrink-0">
          <Image
            className="h-24 w-auto rounded-md"
            width={96}
            height={128}
            src={url}
            alt="Anime Cover"
          />
        </div>
      )}
      <div className="ml-4 flex h-full flex-1 flex-col justify-between">
        {isLoading ? (
          <Skeleton className="h-5 w-full bg-stone-500" />
        ) : (
          <h1 className="mb-auto truncate text-[1.25rem] font-[600] text-white">
            {animeName}
          </h1>
        )}
        {isLoading ? (
          <Skeleton className="mt-4 h-4 w-2/3 bg-stone-500" />
        ) : (
          <p className="mt-auto text-[1rem] text-[#5C5C5C]">
            {watchedAge} дні тому
          </p>
        )}
      </div>
    </div>
  );
}
