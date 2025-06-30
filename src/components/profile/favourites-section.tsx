import FavouritesTabs from "@/components/profile/favourites-tabs";

export default function FavouritesSection({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <div className="hidden flex-col justify-start xl:flex xl:gap-10">
      <h1 className="text-[2rem] font-bold text-white">Улюблені</h1>
      <FavouritesTabs isLoading={isLoading} />
    </div>
  );
}
