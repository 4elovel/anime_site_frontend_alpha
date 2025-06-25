import FavouritesTabs from "@/components/profile/favourites-tabs";

export default function FavouritesSection() {
  return (
    <div className="flex flex-col justify-start">
      <h1 className="text-[2rem] font-bold text-white">Улюблені</h1>
      <FavouritesTabs />
    </div>
  );
}
