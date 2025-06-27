import React from "react";
import CharacterCard from "@/components/character-card";

const characters = [
  {
    name: "Габімару",
    latinName: "Gabimaru",
    image: "/assets/profile/mock-history-anime-card2.png",
    description: (
      <>
        <a href="#" className="text-[#4B7FCC] hover:underline">
          Габімару (画がめびまる丸)
        </a>
        , народжений з іменем{" "}
        <a href="#" className="text-[#4B7FCC] hover:underline">
          Саку (朔)
        </a>
        , елітний шинобі-вбивця з Івагакуре. Останній носій сумнозвісного
        псевдоніму{" "}
        <a href="#" className="text-[#4B7FCC] hover:underline">
          Габімару Порожнина (がらんの画め丸, Garan no Gabimaru)
        </a>
        . Чоловік Юї, восьмої дочки вождя Івагакуре.
      </>
    ),
    subtitle: "Jigokuraku ・ 地獄楽",
    slug: "gabimaru",
  },
  {
    name: "Манкі Д. Луффі",
    latinName: "Monkey D. Luffy",
    image: "/assets/profile/mock-history-anime-card3.png", 
    description: (
      <>
        <a href="#" className="text-[#4B7FCC] hover:underline">
          Манкі Д. Луффі (モンキー・D・ルフ)
        </a>{" "}
        — головний персонаж манги та аніме One Piece. Капітан Піратів
        Солом'яного капелюха. З'їв диявольський плід{" "}
        <a href="#" className="text-[#4B7FCC] hover:underline">
          Гума-Гума
        </a>
        , завдяки чому став{" "}
        <a href="#" className="text-[#4B7FCC] hover:underline">
          гумовою людиною
        </a>
        .
      </>
    ),
    subtitle: "One Piece ・ ワンピース",
    slug: "luffy",
  },
];

function FilterButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="ml-2 rounded-xl border border-[#232B3A] bg-[#181F2A] px-4 py-2 text-base font-medium text-white focus:ring-2 focus:ring-[#4B7FCC] focus:outline-none">
      {children}
    </button>
  );
}

export default function CharactersPage() {
  return (
    <div className="min-h-screen w-full px-4 pt-10 pb-20 sm:px-8 sm:pt-6 sm:pb-8 md:pt-8 md:pb-14">
      <div className="mb-8 flex flex-row items-center justify-between sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
        <h1 className="text-4xl font-bold text-white sm:text-2xl">Персонажі</h1>
        <div className="flex flex-row items-center space-x-2 sm:space-x-2">
          <FilterButton>А-Я</FilterButton>
          <FilterButton>Популярність</FilterButton>
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
        {characters.map((character) => (
          <CharacterCard
            key={character.name}
            image={character.image}
            name={character.name}
            latinName={character.latinName}
            description={character.description}
            subtitle={character.subtitle}
            href={`/characters/${character.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
