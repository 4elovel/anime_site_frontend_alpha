import { Button } from "@/components/ui/button";
import Link from "next/link";

import Navbar from "@/components/nav/navbar";
import AnimeCarousel from "@/components/main-page/anime-carousel";
import CardCollection from "@/components/main-page/card-collection";
import TopAnimeList from "@/components/main-page/top-anime-list";

const popularAnime = [
  {
    image: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
    title: "Проводжальниця Фрірен",
    imdbRating: "9.3",
    imdbVotes: "170K",
    seasons: 1,
    duration: "24 хв",
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
    title: "Кошик фруктів: Фінал",
    imdbRating: "8.95",
    imdbVotes: "190K",
    seasons: 3,
    duration: "23 хв",
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
    title: "Кланнад: Післяслово",
    imdbRating: "8.93",
    imdbVotes: "210K",
    seasons: 2,
    duration: "24 хв",
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
    title: "Твоє імʼя",
    imdbRating: "8.83",
    imdbVotes: "115K",
    seasons: 1,
    duration: "1 год. 46 хв",
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
    title: "Твоє імʼя",
    imdbRating: "8.83",
    imdbVotes: "115K",
    seasons: 1,
    duration: "1 год. 46 хв",
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
    title: "Твоє імʼя",
    imdbRating: "8.83",
    imdbVotes: "115K",
    seasons: 1,
    duration: "1 год. 46 хв",
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
    title: "Твоє імʼя",
    imdbRating: "8.83",
    imdbVotes: "115K",
    seasons: 1,
    duration: "1 год. 46 хв",
  },
];

const topAnime = [
  {
    image: "https://cdn.myanimelist.net/images/anime/101/135567.jpg",
    title: "Проводжальниця Фрірен",
    year: 2023,
    type: "TV Серіал",
    rating: 9.3,
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/1764/138022.jpg",
    title: "Тільки я візьму новий рівень",
    year: 2025,
    type: "TV Серіал",
    rating: 8.75,
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    title: "Ван Піс",
    year: 1999,
    type: "TV Серіал",
    rating: 8.73,
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/10/100646.jpg",
    title: "Доктор Стоун",
    year: 2019,
    type: "TV Серіал",
    rating: 8.27,
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/1517/110266.jpg",
    title: "Полумʼяні вогнеборці",
    year: 2025,
    type: "TV Серіал",
    rating: 7.96,
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/3/72078.jpg",
    title: "Гінтама: Фінал",
    year: 2021,
    type: "Фільм",
    rating: 9.04,
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
    title: "Бліч: Тисячолітня криза",
    year: 2022,
    type: "TV Серіал",
    rating: 9.0,
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg",
    title: "Мисливець x Мисливець",
    year: 2011,
    type: "TV Серіал",
    rating: 8.73,
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
    title: "Код Ґіас: Повстання Лелуша",
    year: 2008,
    type: "TV Серіал",
    rating: 8.91,
  },
  {
    image: "https://cdn.myanimelist.net/images/anime/1122/96435.jpg",
    title: "Форма голосу",
    year: 2016,
    type: "Фільм",
    rating: 8.93,
  },
];

export default function Home() {
  return (
    <div className="p-0 m-0 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <AnimeCarousel />
      <TopAnimeList items={topAnime} />

      <CardCollection
        title="Популярне зараз"
        items={popularAnime}
        cardType="anime"
      />
      <Button>Test</Button>
      <Link href="/signin">
        <Button>Sign In</Button>
      </Link>
      <Link href="/signin"></Link>

      <Link href="/anime">
        <Button>anime</Button>
      </Link>
      <Link href="/characters/blanche-considine">
        <Button>character</Button>
      </Link>

      <Link href="/signup">
        <Button>Sign Up</Button>
      </Link>
    </div>
  );
}

//  <Navbar />
//       <Button>Test</Button>
//       <Link href="/signin">
//         <Button>Sign In</Button>
//       </Link>
//       <Link href="/signin"></Link>

//       <Link href="/anime">
//         <Button>anime</Button>
//       </Link>
//       <Link href="/characters/blanche-considine">
//         <Button>character</Button>
//       </Link>

//       <Link href="/signup">
//         <Button>Sign Up</Button>
//       </Link>
//     </div>
