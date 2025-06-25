import Image from "next/image";

interface FavouritesCardProps {
  imageUrl?: string;
  title?: string;
  year?: number;
  mediaType?: string;
}

export default function FavouritesCard(props: FavouritesCardProps) {
  return (
    <div className="flex flex-col gap-4 max-w-35 md:w-35 max-h-70 md:h-70">
      <Image
        src={props.imageUrl || "/assets/profile/mock-favourites-card.png"}
        alt={props.title || "Favourites Card"}
        width={300}
        height={400}
        className="w-full h-auto object-cover rounded-lg"
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-white">
          {props.title || "Назва аніме"}
        </h2>
        <p className="text-sm text-gray-400">
          {props.year ? `${props.year} рік` : "Рік випуску"}
        </p>
        <p className="text-sm text-gray-400">
          {props.mediaType || "Тип медіа"}
        </p>
      </div>
    </div>
  );
}
