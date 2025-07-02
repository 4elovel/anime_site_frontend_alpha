import dynamic from "next/dynamic";
import CardCollection from "@/components/main-page/card-collection";
import OldCardCollection from "@/components/shared/card-collection";
import Image from "next/image";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/config";

//TODO add voice actor cards dynamically from backend
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

async function fetchCharacter(slug: string) {
  const url = `${API_BASE_URL}people/${slug}`;
  console.log("Fetching:", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch character");
  const json = await res.json();
  return json.data;
}

async function fetchCharacterAnimes(slug: string) {
  const url = `${API_BASE_URL}people/${slug}/animes`;
  console.log("Fetching:", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch character animes");
  const json = await res.json();
  return json.data;
}

function mapGender(gender: string | null | undefined) {
  if (!gender) return "-";
  if (gender === "male") return "Чоловік";
  if (gender === "female") return "Жінка";
  return gender;
}

export default async function CharacterPage({
  params,
}: {
  params: { slug: string };
}) {
  let character;
  try {
    character = await fetchCharacter(params.slug);
  } catch (e) {
    return notFound();
  }
  if (!character || character.type !== "character") {
    return notFound();
  }

  // Calculate age from birth_date if available
  function calculateAge(birthDate: string | null): number | null {
    if (!birthDate) return null;
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age;
  }

  const mappedCharacter = {
    name: character.name,
    originalName: character.original_name || "",
    image: character.image,
    age: calculateAge(character.birth_date || null),
    gender: mapGender(character.gender),
    aliases: character.aliases
      ? Array.isArray(character.aliases)
        ? character.aliases.join(", ")
        : character.aliases
      : undefined, // mark: aliases not in sample, may need mapping
    abilities: character.abilities ?? undefined, // mark: abilities not in sample, may need mapping
    bio: character.biography || "-", // backend: biography
    birthplace: character.birthplace || null,
    birth_date: character.birth_date || null,
  };

  let animes = [];
  try {
    animes = await fetchCharacterAnimes(params.slug);
  } catch (e) {
    // ignore, show no anime
  }

  // Map anime fields for CardCollection
  const mappedAnimes = (animes || []).map((anime: any) => ({
    image: anime.poster || anime.poster_url || "", // backend: poster/poster_url
    title: anime.name || anime.title || "", // backend: name/title
    year:
      anime.year ||
      (anime.first_air_date
        ? Number(anime.first_air_date.slice(0, 4))
        : undefined),
    type: anime.kind || "-",
    rating: anime.imdb_score ?? null,
    href: "/anime/" + (anime.slug || anime.id),
    showRank: false,
    small: true,
  }));

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12">
      <div className="flex flex-col gap-12 md:flex-row">
        <div className="flex flex-shrink-0 justify-center md:block">
          <div className="relative h-[360px] w-[260px] overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-lg">
            <Image
              src={mappedCharacter.image}
              alt={mappedCharacter.name}
              width={260}
              height={360}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        </div>
        <div className="flex max-w-3xl flex-1 flex-col gap-2">
          <h1 className="mb-1 text-3xl font-bold text-white md:text-4xl">
            {mappedCharacter.name}
          </h1>
          <div className="mb-4 text-lg text-zinc-400">
            {mappedCharacter.originalName}
          </div>
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xl font-semibold text-white">Опис</span>
          </div>
          <div className="mb-2 flex flex-col gap-1 text-base text-zinc-300">
            {mappedCharacter.birthplace && (
              <div>
                <span className="font-semibold text-white">
                  Місце народження:
                </span>{" "}
                {mappedCharacter.birthplace}
              </div>
            )}
            {mappedCharacter.birth_date && (
              <div>
                <span className="font-semibold text-white">
                  Дата народження:
                </span>{" "}
                {mappedCharacter.birth_date}
              </div>
            )}
            {mappedCharacter.age !== null && (
              <div>
                <span className="font-semibold text-white">Вік:</span>{" "}
                {mappedCharacter.age} років
              </div>
            )}
            {mappedCharacter.gender && (
              <div>
                <span className="font-semibold text-white">Стать:</span>{" "}
                {mappedCharacter.gender}
              </div>
            )}
          </div>
          <div className="mt-2 mb-2 text-base leading-relaxed whitespace-pre-line text-zinc-200">
            {mappedCharacter.bio}
          </div>
          <div>
            <CardCollection
              title="Аніме"
              items={mappedAnimes}
              cardType="top-anime"
            />
            <OldCardCollection
              title="Озвучення персонажа"
              items={voiceActorCards}
              cardType="voice-actor"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
