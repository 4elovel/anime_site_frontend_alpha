import Image from "next/image";
import { API_BASE_URL } from "@/config";
import ArrowRightIcon from "@/components/ui/arrow-right-icon";

interface CharacterData {
  id: string;
  name: string;
  slug: string;
  image: string;
  birth_date?: string;
  death_date?: string | null;
  biography?: string;
}

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

export default async function CharacterPage({
  params,
}: {
  params: { slug: string };
}) {
  const character = await getCharacter(params.slug);
  if (!character) {
    return (
      <div className="text-white text-center mt-20">Character not found</div>
    );
  }

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
        {/* <div className="text-zinc-400 text-base mb-2">Japanese name or subtitle here</div> */}
        <div className="flex gap-2 items-center mb-2">
          <span className="font-semibold text-lg text-white">Опис</span>
          <span className="bg-language-button-color text-xs px-2 py-0.5 rounded text-white">
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
          {/* <div><span className="font-semibold text-white">Стать:</span> Жінка</div> */}
          {/* <div><span className="font-semibold text-white">Інші псевдоніми:</span> ...</div> */}
          {/* <div><span className="font-semibold text-white">Здібності:</span> ...</div> */}
        </div>
        {character.biography && (
          <div className="mt-2 text-zinc-200 text-base leading-relaxed whitespace-pre-line">
            {character.biography}
          </div>
        )}
        {/* <div className="mt-2 text-zinc-400 text-sm">Джерело <a href="#" className="text-blue-400 underline">MyAnimeList</a></div> */}
      </div>
    </div>
  );
}
