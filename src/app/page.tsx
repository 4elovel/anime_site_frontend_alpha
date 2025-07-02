import { Button } from "@/components/ui/button";
import Link from "next/link";

import Navbar from "@/components/nav/navbar";
import AnimeCarousel from "@/components/main-page/Carousel/anime-carousel";
import CardCollection from "@/components/main-page/card-collection";
import TopAnimeList from "@/components/main-page/TopAnimeList/top-anime-list";
import CommentCollection from "@/components/main-page/comment-collection";
import TopUserList from "@/components/main-page/top-user-list";
import ContinueWatchingCard from "../components/main-page/continue-watching-card";
import GenreCard from "@/components/main-page/genre-card";
import ReleaseCard from "@/components/main-page/release-card";
import CustomCollectionSection from "@/components/main-page/CustomCollectionSection/custom-collection-section";
import ReviewCard from "@/components/main-page/ReviewSection/review-card";
import ReviewSection, {
  Review,
} from "@/components/main-page/ReviewSection/review-section";

// TODO: API HOOKS
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
// TODO: API HOOKS
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
// TODO: API HOOKS
const comments = [
  {
    avatarUrl: "/assets/mock-user-logo.png",
    username: "demchik",
    timeAgo: "1 год назад",
    text: "Краще б я не знала про цю адаптацію... вона дуже слабка....щось...",
    tag: "Аніме",
    animeTitle: "Початок після кінця",
    animeUrl: "#",
  },
  {
    avatarUrl: "/assets/mock-user-logo.png",
    username: "Ispa_Ian",
    timeAgo: "5 год назад",
    text: "Це просто прекрасне аніме. Тепер я розумію звідки в нього така фан база...",
    tag: "Аніме",
    animeTitle: "Химерні пригоди ДжоДжо",
    animeUrl: "#",
  },
  {
    avatarUrl: "/assets/mock-user-logo.png",
    username: "DarTash",
    timeAgo: "13 год назад",
    text: "Подивились одну серію — подивились увесь серіал.",
    tag: "Аніме",
    animeTitle: "Я — Сакамотто, е, втямили?",
    animeUrl: "#",
  },
  {
    avatarUrl: "/assets/mock-user-logo.png",
    username: "copok",
    timeAgo: "3 год назад",
    text: "Нудненьке, але принаймні краще за 'подарунок' від творців Кастлванії: Н...",
    tag: "Аніме",
    animeTitle: "Диявол теж плаче",
    animeUrl: "#",
  },
  {
    avatarUrl: "/assets/mock-user-logo.png",
    username: "Anonimka",
    timeAgo: "4 год назад",
    text: "Тепер я хочу поїхати в Тайвань і працювати в похоронному бюро🥲",
    tag: "Аніме",
    animeTitle: "Траурний концерт",
    animeUrl: "#",
  },
];
// TODO: API HOOKS
const topUsers = [
  {
    rank: 1,
    avatarUrl: "/assets/mock-user-logo.png",
    username: "demchik",
    registration: "13.03.2022",
    stars: "9.1к",
    comments: "5к",
    folders: "13к",
  },
  {
    rank: 2,
    avatarUrl: "/assets/mock-user-logo.png",
    username: "Ispa_Ian",
    registration: "23.05.2022",
    stars: "6к",
    comments: "1.2к",
    folders: "9.9к",
  },
  {
    rank: 3,
    avatarUrl: "/assets/mock-user-logo.png",
    username: "copok",
    registration: "15.01.2023",
    stars: "3к",
    comments: "2.2к",
    folders: "8.7к",
  },
  {
    rank: 4,
    avatarUrl: "/assets/mock-user-logo.png",
    username: "copok",
    registration: "15.01.2023",
    stars: "3к",
    comments: "2.2к",
    folders: "8.7к",
  },
  {
    rank: 5,
    avatarUrl: "/assets/mock-user-logo.png",
    username: "copok",
    registration: "15.01.2023",
    stars: "3к",
    comments: "2.2к",
    folders: "8.7к",
  },
  {
    rank: 6,
    avatarUrl: "/assets/mock-user-logo.png",
    username: "copok",
    registration: "15.01.2023",
    stars: "3к",
    comments: "2.2к",
    folders: "8.7к",
  },
];

// TODO: API HOOKS
const continueWatchingItems = [
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=450&fit=crop",
    title: "Пожирач душ",
    episode: "E46",
    year: 2008,
    currentTime: "5:34",
    totalTime: "24:20",
    progress: 334 / 1460, // 5*60+34 / 24*60+20
    link: "/anime/pozhyrach-dush/episode/46",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=450&fit=crop",
    title: "Дні Сакамоото",
    episode: "E5",
    year: 2025,
    currentTime: "15:10",
    totalTime: "24:00",
    progress: 910 / 1440, // 15*60+10 / 24*60
    link: "/anime/dni-sakamoto/episode/5",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=450&fit=crop",
    title: "Дні Сакамоото",
    episode: "E5",
    year: 2025,
    currentTime: "15:10",
    totalTime: "24:00",
    progress: 910 / 1440, // 15*60+10 / 24*60
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=450&fit=crop",
    title: "Дні Сакамоото",
    episode: "E5",
    year: 2025,
    currentTime: "15:10",
    totalTime: "24:00",
    progress: 910 / 1440, // 15*60+10 / 24*60
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=450&fit=crop",
    title: "Дні Сакамоото",
    episode: "E5",
    year: 2025,
    currentTime: "15:10",
    totalTime: "24:00",
    progress: 910 / 1440, // 15*60+10 / 24*60
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=450&fit=crop",
    title: "Дні Сакамоото",
    episode: "E5",
    year: 2025,
    currentTime: "15:10",
    totalTime: "24:00",
    progress: 910 / 1440, // 15*60+10 / 24*60
  },
];

const releaseData = [
  {
    month: "Травень",
    items: [
      {
        image: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
        title: "Від селянина з глухої місце...",
        engTitle: "Katainaka no Ossan, Kensei ni Naru",
        episodes: 8,
        date: "20.05",
      },
      {
        image: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
        title: "Я зловісний володар міжзо...",
        engTitle: "Ore wa Seikan Kokka no Akutoku Ryoushu!",
        episodes: 6,
        date: "24.05",
      },
      {
        image: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
        title: "Як стати звичайним",
        engTitle: "Shoushimin Series",
        episodes: 6,
        date: "29.05",
      },
    ],
  },
  {
    month: "Червень",
    items: [
      {
        image: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
        title: "Лікорис Рекоіл: Друзі - викр...",
        engTitle: "Lycoris Recoil Short Movie",
        episodes: 5,
        date: "02.06",
      },
      {
        image: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
        title: "Твоя форма",
        engTitle: "Your Forma",
        episodes: 2,
        date: "05.06",
      },
      {
        image: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
        title: "Прибулець Муму",
        engTitle: "Uchuujiin Muumuu",
        episodes: 3,
        date: "12.06",
      },
    ],
  },
];
//TODO: API HOOKS
const collectionItems = [
  {
    img: "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
    title: "Війни Сакури. Ц...",
    href: "#",
  },
  {
    img: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    title: "Війни Сакури",
    href: "#",
  },
  {
    img: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    title: "Історія букволіжк...",
    href: "#",
  },
  {
    img: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
    title: "Держслужбовці...",
    href: "#",
  },
  {
    img: "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
    title: "Спів войовничих...",
    href: "#",
  },
  {
    img: "https://cdn.myanimelist.net/images/anime/12/76049.jpg",
    title: "Тераформування",
    href: "#",
  },
  {
    img: "https://cdn.myanimelist.net/images/anime/8/77986.jpg",
    title: "Темніше за Чорн...",
    href: "#",
  },
  {
    img: "https://cdn.myanimelist.net/images/anime/11/39717.jpg",
    title: "На старт!",
    href: "#",
  },
  {
    img: "https://cdn.myanimelist.net/images/anime/12/65157.jpg",
    title: "Мобільний воїн Г...",
    href: "#",
  },
];

const reviews: Review[] = [
  {
    userName: "Анна",
    date: "24.04.2025",
    title: "Звичайний роман у Коулуні",
    rating: 5,
    review:
      '"Це аніме мене зачарувало з першої серії! Атмосфера Коулуну передана просто магічно – ніби сама там побувала. Персонажі дуже живі, а повсякденність — така затишна. Обов\'язково раджу!"',
    adminReply:
      "Дякуємо за теплі слова! Ми дуже старались передати настрій Коулуна 🦜",
  },
  {
    userName: "Ігор",
    date: "20.04.2025",
    title: "Звичайний роман у Коулуні",
    rating: 4.5,
    review:
      '"Спочатку здавалося нудним, але чим далі — тим більше затягує. Цікаві побутові моменти, гарна анімація, приємна музика. Гарний вибір для вечірнього перегляду"',
  },
  {
    userName: "Софія",
    date: "18.04.2025",
    title: "Звичайний роман у Коулуні",
    rating: 0,
    review:
      '"Це аніме — справжній антистрес. Після важкого дня просто вмикаєш і занурюєшся в спокійне, але живе життя героїв. Дуже атмосферне!"',
    adminReply:
      "Дякуємо за відгук! Спокійна краса повсякденності — саме те, що ми хотіли передати 🌿",
  },
  {
    userName: "Софія",
    date: "18.04.2025",
    title: "Звичайний роман у Коулуні",
    rating: 0,
    review:
      '"Це аніме — справжній антистрес. Після важкого дня просто вмикаєш і занурюєшся в спокійне, але живе життя героїв. Дуже атмосферне!"',
    adminReply:
      "Дякуємо за відгук! Спокійна краса повсякденності — саме те, що ми хотіли передати 🌿",
  },
  {
    userName: "Софія",
    date: "18.04.2025",
    title: "Звичайний роман у Коулуні",
    rating: 0,
    review:
      '"Це аніме — справжній антистрес. Після важкого дня просто вмикаєш і занурюєшся в спокійне, але живе життя героїв. Дуже атмосферне!"',
    adminReply:
      "Дякуємо за відгук! Спокійна краса повсякденності — саме те, що ми хотіли передати 🌿",
  },
];

export default function Home() {
  return (
    <div className="p-0 m-0 font-[family-name:var(--font-geist-sans)]">
      <AnimeCarousel />

      <CardCollection
        title="Продовжуйте дивитись"
        items={continueWatchingItems}
        cardType="continue-watching"
        showButton={true}
        buttonText="Переглянути весь список"
        buttonUrl="/continue-watching"
      />

      <CardCollection
        title="Популярне зараз"
        items={popularAnime}
        cardType="anime"
      />

      <CardCollection
        title="Скоро на сайті"
        items={[
          {
            image: "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
            title: "Суперкуб",
            isAnonce: true,
            date: "10.05.2025",
          },
          {
            image: "https://cdn.myanimelist.net/images/anime/101/135567.jpg",
            title: "Магічний Куб 2",
            isAnonce: true,
            date: "15.06.2025",
          },
          {
            image: "https://cdn.myanimelist.net/images/anime/1764/138022.jpg",
            title: "Космічний Рейнджер",
            isAnonce: true,
            date: "01.07.2025",
          },
          {
            image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
            title: "Літній Вітер",
            isAnonce: true,
            date: "20.08.2025",
          },
          {
            image: "https://cdn.myanimelist.net/images/anime/10/100646.jpg",
            title: "Драконів Слід",
            isAnonce: true,
            date: "05.09.2025",
          },
          {
            image: "https://cdn.myanimelist.net/images/anime/1517/110266.jpg",
            title: "Сонячний Кристал",
            isAnonce: true,
            date: "12.10.2025",
          },
          {
            image: "https://cdn.myanimelist.net/images/anime/3/72078.jpg",
            title: "Тіньова Місія",
            isAnonce: true,
            date: "25.11.2025",
          },
          {
            image: "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
            title: "Зоряний Портал",
            isAnonce: true,
            date: "30.12.2025",
          },
        ]}
        cardType="anime"
        showButton={true}
        buttonText="Переглянути всі анонси"
        buttonUrl="/anonce"
      />

      <TopAnimeList items={topAnime} showRank={false} />

      <CommentCollection comments={comments} />

      <CardCollection title="Новинки" items={popularAnime} cardType="anime" />

      <TopUserList users={topUsers} />

      <section className="relative">
        <h1 className="text-white text-2xl font-bold pl-6.5">
          Календар релізів
        </h1>
        {releaseData.map((month) => (
          <CardCollection
            key={month.month}
            items={month.items}
            cardType="release"
            title={month.month}
            showButton={false}
          />
        ))}
      </section>

      <section className="py-10 relative">
        <h1 className="text-white text-2xl font-bold pl-6.5">
          Підбірки сайту та користувачів
        </h1>
        <CustomCollectionSection
          title="Підбірки користувачів"
          comments={60}
          likes={70}
          time="близько 5 годин тому"
          tags={["Україна", "Українці"]}
          items={collectionItems}
          userAvatar="/assets/mock-user-logo.png"
          userName="Україна в аніме"
        />
        <CustomCollectionSection
          title="Підбірка сайту"
          comments={30}
          likes={707}
          time="близько 5 годин тому"
          tags={["Серіал", "ONA"]}
          items={collectionItems}
          userAvatar="/assets/mock-user-logo.png"
          userName="Аніме, що закінчилися за один сезон"
        />
      </section>

      <CardCollection
        title="Топ онґоінґи"
        items={popularAnime}
        cardType="anime"
      />

      <CardCollection
        title="Рекомендації для вас"
        items={popularAnime}
        cardType="anime"
      />

      <CardCollection
        title="Жанри сайту"
        items={[
          {
            title: "Драма",
            description: (
              <>
                Цей жанр зосереджується на{" "}
                <span className="text-blue-400">емоційних</span> та{" "}
                <span className="text-blue-400">психологічних</span>{" "}
                переживаннях персонажів. Такі історії часто торкаються серйозних
                тем — втрат, особистісного зростання, стосунків, внутрішніх
                конфліктів.
              </>
            ),
            animeImages: [
              "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
            ],
            href: "",
          },
          {
            title: "Драма",
            description: (
              <>
                Цей жанр зосереджується на{" "}
                <span className="text-blue-400">емоційних</span> та{" "}
                <span className="text-blue-400">психологічних</span>{" "}
                переживаннях персонажів. Такі історії часто торкаються серйозних
                тем — втрат, особистісного зростання, стосунків, внутрішніх
                конфліктів.
              </>
            ),
            animeImages: [
              "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
            ],
            href: "",
          },
          {
            title: "Драма",
            description: (
              <>
                Цей жанр зосереджується на{" "}
                <span className="text-blue-400">емоційних</span> та{" "}
                <span className="text-blue-400">психологічних</span>{" "}
                переживаннях персонажів. Такі історії часто торкаються серйозних
                тем — втрат, особистісного зростання, стосунків, внутрішніх
                конфліктів.
              </>
            ),
            animeImages: [
              "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
            ],
            href: "",
          },
        ]}
        cardType="genre"
        showButton={true}
        buttonText="Переглянути всі жанри"
        buttonUrl="/genres"
      />

      <CardCollection
        title="Теги сайту"
        items={[
          {
            title: "Історичне",
            description: (
              <>
                Цей жанр зосереджується на{" "}
                <span className="text-blue-400">емоційних</span> та{" "}
                <span className="text-blue-400">психологічних</span>{" "}
                переживаннях персонажів. Такі історії часто торкаються серйозних
                тем — втрат, особистісного зростання, стосунків, внутрішніх
                конфліктів.
              </>
            ),
            animeImages: [
              "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
            ],
            href: "",
          },
          {
            title: "Самураї",
            description: (
              <>
                Цей жанр зосереджується на{" "}
                <span className="text-blue-400">емоційних</span> та{" "}
                <span className="text-blue-400">психологічних</span>{" "}
                переживаннях персонажів. Такі історії часто торкаються серйозних
                тем — втрат, особистісного зростання, стосунків, внутрішніх
                конфліктів.
              </>
            ),
            animeImages: [
              "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
            ],
            href: "",
          },
          {
            title: "Романтика",
            description: (
              <>
                Цей жанр зосереджується на{" "}
                <span className="text-blue-400">емоційних</span> та{" "}
                <span className="text-blue-400">психологічних</span>{" "}
                переживаннях персонажів. Такі історії часто торкаються серйозних
                тем — втрат, особистісного зростання, стосунків, внутрішніх
                конфліктів.
              </>
            ),
            animeImages: [
              "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/4/5123.jpg",
              "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
            ],
            href: "",
          },
        ]}
        cardType="genre"
        showButton={true}
        buttonText="Переглянути всі жанри"
        buttonUrl="/genres"
      />

      <ReviewSection reviews={reviews} />

      <Button>Test</Button>
      <Link href="/signin">
        <Button>Sign In</Button>
      </Link>
      <Link href="/signin"></Link>

      <Link href="/anime/similique-blanditiis-magnam-esse">
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
