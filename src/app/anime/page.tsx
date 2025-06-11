import AnimeCard from "@/components/anime-card";
import AnimeTooltip from "@/components/anime-tooltip";
import AnimeCardCollection from "@/components/anime-card-collection";
export default async function AnimePage({
  params,
}: {
  params: { slug: string };
}) {
  const animeList = [
    {
      image: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
      title: "Геллсінґ OVA",
      year: 2006,
      media_type: "OVA",
      slug: "hellsing-ova-1",
    },
    {
      image: "https://cdn.myanimelist.net/images/anime/4/5125.jpg",
      title: "Геллсінґ: Кривава війна",
      year: 2006,
      media_type: "OVA",
      slug: "hellsing-ova-2",
    },
    {
      image: "https://cdn.myanimelist.net/images/anime/2/5127.jpg",
      title: "Геллсінґ",
      year: 2001,
      media_type: "TV Серіал",
      slug: "hellsing-tv",
    },
    {
      image: "https://cdn.myanimelist.net/images/anime/3/5129.jpg",
      title: "Геллсінґ: Спешл",
      year: 2001,
      media_type: "Спешл",
      slug: "hellsing-special",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 bg-black">
      <AnimeCardCollection items={animeList} />
    </div>
  );
}
