import Image from "next/image";
import { Dot } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

interface FavouritesCardProps {
  imageUrl?: string;
  title?: string;
  year?: number;
  mediaType?: string;
  isLoading?: boolean;
}

export default function FavouritesCard(props: FavouritesCardProps) {
  return (
    <div className="flex h-70! w-25 flex-col gap-4 sm:w-30 md:w-30">
      {props.isLoading ? (
        <Skeleton className="h-45 w-full bg-stone-500" />
      ) : (
        <Image
          src={props.imageUrl || "/assets/profile/mock-favourites-card.png"}
          alt={props.title || "Favourites Card"}
          width={300}
          height={400}
          className="h-45 w-full rounded-lg object-cover sm:h-55 md:h-60"
        />
      )}
      <div className="flex flex-col gap-0">
        {props.isLoading ? (
          <Skeleton className="h-5 w-full bg-stone-500" />
        ) : (
          <h2 className="truncate text-lg font-semibold text-white">
            {props.title || "Назва аніме"}
          </h2>
        )}

        <div className="flex flex-row items-center justify-between text-center">
          {props.isLoading ? (
            <Skeleton className="h-3 w-1/3 bg-stone-500" />
          ) : (
            <p className="text-sm text-gray-400">
              {props.year ? `${props.year}` : "Рік випуску"}
            </p>
          )}
          <Dot className="h-6 w-6 text-gray-400" />
          {props.isLoading ? (
            <Skeleton className="h-3 w-1/3 bg-stone-500" />
          ) : (
            <p className="text-sm text-gray-400">
              {props.mediaType || "Тип медіа"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
