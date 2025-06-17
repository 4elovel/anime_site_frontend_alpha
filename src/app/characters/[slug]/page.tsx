import Image from "next/image";
import { API_BASE_URL } from "@/config";
import CardCollection from "@/components/card-collection";

interface CharacterData {
  id: string;
  name: string;
  slug: string;
  image: string;
  birth_date?: string;
  death_date?: string | null;
  biography?: string;
  gender?: string;
  age?: string;
  birthplace?: string;
  original_name?: string;
  type?: string;
}
//TODO get voiceactor data from API
const voiceActorCards = [
  {
    type: "voice-actor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Сакакібара Йошико",
    title: "Геллсінґ OVA",
    animeImage: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
  },
  {
    type: "voice-actor",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Іван Петров Іванович",
    title: "Геллсінґ",
    animeImage: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
  },
  {
    type: "voice-actor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Сакакібара Йошико",
    title: "Геллсінґ OVA",
    animeImage: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
  },
  {
    type: "voice-actor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Сакакібара Йошико",
    title: "Геллсінґ OVA",
    animeImage: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
  },
];

async function getCharacter(slug: string): Promise<CharacterData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}people/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

async function getCharacterAnimes(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}people/${slug}/animes`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

export default async function CharacterPage({
  params,
}: {
  params: { slug: string };
}) {
  const character = await getCharacter(params.slug);
  if (!character || character.type !== "character") {
    return (
      <div className="text-white text-center mt-20">Такого персонажа немає</div>
    );
  }

  // Fetch first 4 anime for this character
  const animes = (await getCharacterAnimes(params.slug)).slice(0, 4);
  const animeCards = animes.map((anime: any) => ({
    image: anime.poster,
    title: anime.name,
    year: anime.first_air_date
      ? new Date(anime.first_air_date).getFullYear()
      : undefined,
    media_type: anime.kind,
    slug: anime.slug,
  }));

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-12">
      <div className="flex-shrink-0 flex justify-center md:block">
        <div className="rounded-2xl overflow-hidden shadow-lg border border-zinc-700 bg-zinc-900 w-[220px] h-[300px] relative">
          <Image
            src={character.image}
            alt={character.name}
            width={220}
            height={300}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
          {character.name}
        </h1>
        {character.original_name && (
          <div className="text-zinc-400 text-base mb-2">
            {character.original_name}
          </div>
        )}
        <div className="flex gap-2 items-center mb-2">
          <span className="font-semibold text-lg text-white">Опис</span>
          <span
            className="flex flex-row justify-center items-center px-2 py-0 gap-2 w-16 h-[35px] rounded-[12px] text-white text-[16px] font-medium leading-[19px] select-none border"
            style={{
              fontFamily: "Inter, sans-serif",
              background: "var(--color-language-button-color)",
              borderColor: "var(--color-language-button-color)",
            }}
          >
            UA
          </span>
        </div>
        <div className="flex flex-col gap-1 text-zinc-300 text-base">
          {character.birth_date && (
            <div>
              <span className="font-semibold text-white">Вік:</span>{" "}
              {new Date().getFullYear() -
                new Date(character.birth_date).getFullYear()}{" "}
              роки
            </div>
          )}
          {/* Add more fields as needed */}
        </div>
        {character.biography && (
          <div className="mt-2 text-zinc-200 text-base leading-relaxed whitespace-pre-line">
            {character.biography}
          </div>
        )}
        {animeCards.length > 0 && (
          <div className="mt-8">
            <CardCollection
              title="Аніме"
              showArrowRightIcon
              items={animeCards}
              cardType="anime"
            />
            <CardCollection
              title="Озвучення персонажа"
              items={voiceActorCards}
              cardType="voice-actor"
            />
          </div>
        )}
      </div>
    </div>
  );
}
