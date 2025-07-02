"use client";
import React, { useEffect, useState } from "react";
import CharacterCard from "@/components/character-card";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/config";

const sortOptions = [
  { label: "А-Я", value: "az" },
  { label: "Популярність", value: "popularity" },
];

const sortMap: Record<string, string> = {
  az: "name",
  popularity: "popularity", // Adjust if backend uses a different field
};
//TODO add server side sorting and filtering
//TODO maybe anime center_dot anime-name

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`ml-2 rounded-xl border border-[#232B3A] bg-[#181F2A] px-4 py-2 text-base font-medium text-white focus:ring-2 focus:ring-[#4B7FCC] focus:outline-none ${active ? "border-blue-400 text-blue-400" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

interface Character {
  id: string;
  name: string;
  original_name?: string;
  image: string;
  biography?: string;
  subtitle?: string; // will be filled after fetching anime
  slug: string;
  popularity?: number;
}

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [sort, setSort] = useState("az");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync state with URL
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("sort", sort);
    params.set("direction", direction);
    router.replace(`?${params.toString()}`);
  }, [sort, direction, router]);

  useEffect(() => {
    const backendSort = sortMap[sort] || "name";
    const url = `${API_BASE_URL}people?types=character&sort=${backendSort}&direction=${direction}`;
    console.log("Fetching:", url);
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        // For each character, fetch their first anime for subtitle
        const charactersWithSubtitle = await Promise.all(
          data.data.map(async (character: Character) => {
            let subtitle = undefined;
            try {
              const animeRes = await fetch(
                `${API_BASE_URL}people/${character.slug}/animes?page=1`,
              );
              if (animeRes.ok) {
                const animeData = await animeRes.json();
                if (animeData.data && animeData.data.length > 0) {
                  subtitle = animeData.data[0].name;
                }
              }
            } catch (e) {
              // ignore subtitle fetch error
            }
            return { ...character, subtitle };
          }),
        );
        setCharacters(charactersWithSubtitle);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sort, direction]);

  return (
    <div className="min-h-screen w-full px-4 pt-10 pb-20 sm:px-8 sm:pt-6 sm:pb-8 md:pt-8 md:pb-14">
      <div className="mb-8 flex flex-row items-center justify-between sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
        <h1 className="text-4xl font-bold text-white sm:text-2xl">Персонажі</h1>
        <div className="flex flex-row items-center space-x-2 sm:space-x-2">
          {sortOptions.map((opt) => (
            <FilterButton
              key={opt.value}
              active={sort === opt.value}
              onClick={() => setSort(opt.value)}
            >
              {opt.label}
            </FilterButton>
          ))}
          <button
            className="ml-2 rounded-xl border border-[#232B3A] bg-[#181F2A] px-2 py-2 text-base font-medium text-white focus:ring-2 focus:ring-[#4B7FCC] focus:outline-none"
            onClick={() => setDirection(direction === "asc" ? "desc" : "asc")}
            aria-label="Змінити напрям сортування"
            type="button"
          >
            {direction === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>
      <div className="mt-4 flex w-full justify-center">
        <div
          className="h-0 w-full border-t-[2px]"
          style={{
            borderImageSource:
              "linear-gradient(90deg, rgba(73, 99, 138, 0) 0%, rgba(73, 99, 138, 0.5) 50%, rgba(73, 99, 138, 0) 100%)",
            borderImageSlice: 1,
          }}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 md:gap-x-6 md:gap-y-6">
        {loading ? (
          <div className="text-center text-white">Завантаження...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : characters.length === 0 ? (
          <div className="text-center text-white">Немає персонажів</div>
        ) : (
          characters.map((character) => (
            <CharacterCard
              key={character.id}
              image={character.image}
              name={character.name}
              originalName={character.original_name || ""}
              description={character.biography || ""}
              subtitle={character.subtitle}
              href={`/characters/${character.slug}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CharactersPage;
