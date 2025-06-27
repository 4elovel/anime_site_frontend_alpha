import Image from "next/image";
import CardCollection from "@/components/main-page/card-collection";
import TopAnimeCard from "@/components/main-page/TopAnimeList/top-anime-card";

const mockCharacter = {
  name: "Інтегра Фейрбрук Вінґейтс Геллсінґ",
  originalName: "インテグラル・ファルブルケ・ウィンゲーツ・ヘルシング",
  image: "/assets/profile/mock-history-anime-card.png",
  age: 22,
  gender: "Жінка",
  aliases: "Граф, Магістр, Лорд Геллсінґ, Вавилон",
  abilities: "Влучна стрільба, фехтування, окультні знання, командир Алукарда",
  bio: (
    <>
      <b>Інтегра Фейрбрук Вінґейтс Геллсінґ</b> — сильна, рішуча та
      холоднокровна глава Організації Геллсінґ, яка займається знищенням
      вампірів та надприродних загроз у Великобританії. Вона — благородна леді з
      залізною волею, мудрим розумом і безмежною відданістю своїй місії. Інтегра
      сувора, але справедлива, її поважають навіть наймогутніші підлеглі,
      зокрема вампір Алукард, який служить їй з беззаперечною лояльністю. Її
      образ — це поєднання аристократичної елегантності та воєнної твердості
    </>
  ),
  source: {
    name: "MyAnimeList",
    url: "https://myanimelist.net/character/",
  },
};

const mockAnime = [
  {
    image: "/assets/profile/mock-history-anime-card.png",
    title: "Геллсінґ OVA",
    year: 2006,
    type: "OVA",
    rating: 8.2,
    href: "#",
    showRank: false,
    small: true,
  },
  {
    image: "/assets/profile/mock-history-anime-card2.png",
    title: "Геллсінґ",
    year: 2001,
    type: "ТВ Серіал",
    rating: 7.7,
    href: "#",
    showRank: false,
    small: true,
  },
  {
    image: "/assets/profile/mock-history-anime-card3.png",
    title: "Геллсінґ: Спешл",
    year: 2001,
    type: "Спешл",
    rating: 7.5,
    href: "#",
    showRank: false,
    small: true,
  },
  {
    image: "/assets/profile/mock-history-anime-card3.png",
    title: "Геллсінґ: Спешл",
    year: 2001,
    type: "Спешл",
    rating: 7.5,
    href: "#",
    showRank: false,
    small: true,
  },
  {
    image: "/assets/profile/mock-history-anime-card3.png",
    title: "Геллсінґ: Спешл",
    year: 2001,
    type: "Спешл",
    rating: 7.5,
    href: "#",
    showRank: false,
    small: true,
  },
  {
    image: "/assets/profile/mock-history-anime-card3.png",
    title: "Геллсінґ: Спешл",
    year: 2001,
    type: "Спешл",
    rating: 7.5,
    href: "#",
    showRank: false,
    small: true,
  },
  {
    image: "/assets/profile/mock-history-anime-card3.png",
    title: "Геллсінґ: Спешл",
    year: 2001,
    type: "Спешл",
    rating: 7.5,
    href: "#",
    showRank: false,
    small: true,
  },
];

export default function CharacterPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12">
      <div className="flex flex-col gap-12 md:flex-row">
        <div className="flex flex-shrink-0 justify-center md:block">
          <div className="relative h-[360px] w-[260px] overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-lg">
            <Image
              src={mockCharacter.image}
              alt={mockCharacter.name}
              width={260}
              height={360}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        </div>
        <div className="flex max-w-3xl flex-1 flex-col gap-2">
          <h1 className="mb-1 text-3xl font-bold text-white md:text-4xl">
            {mockCharacter.name}
          </h1>
          <div className="mb-4 text-lg text-zinc-400">
            {mockCharacter.originalName}
          </div>
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xl font-semibold text-white">Опис</span>
            <span className="ml-2 rounded-xl bg-[#232B3A] px-3 py-1 text-xs font-bold text-white">
              UA
            </span>
          </div>
          <div className="mb-2 flex flex-col gap-1 text-base text-zinc-300">
            <div>
              <span className="font-semibold text-white">Вік:</span>{" "}
              {mockCharacter.age} роки
            </div>
            <div>
              <span className="font-semibold text-white">Стать:</span>{" "}
              {mockCharacter.gender}
            </div>
            <div>
              <span className="font-semibold text-white">Інші псевдоніми:</span>{" "}
              {mockCharacter.aliases}
            </div>
            <div>
              <span className="font-semibold text-white">Здібності:</span>{" "}
              {mockCharacter.abilities}
            </div>
          </div>
          <div className="mt-2 mb-2 text-base leading-relaxed whitespace-pre-line text-zinc-200">
            {mockCharacter.bio}
          </div>
          <div className="mt-2 mb-8 text-base text-zinc-400">
            Джерело{" "}
            <a
              href={mockCharacter.source.url}
              className="text-[#4B7FCC] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {mockCharacter.source.name}
            </a>
          </div>
          <div>
            <CardCollection
              title="Аніме"
              items={mockAnime}
              cardType="top-anime"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
