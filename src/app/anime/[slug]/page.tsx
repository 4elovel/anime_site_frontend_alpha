"use client";
import { API_BASE_URL } from "@/config";
import React from "react";
import Navbar from "@/components/nav/navbar";
import TopAnimeCard from "@/components/main-page/TopAnimeList/top-anime-card";
import SectionHeader from "@/components/shared/section-header";
import ActionButton from "@/components/ui/action-button";
import StandartButtonIcon from "@/components/ui/standart-button-icon";
import AnimeDetailsPanel from "@/components/shared/anime-details-panel";
import Rating from "@/components/ui/rating";
import { Star } from "lucide-react";
import ArrowDown from "@/assets/arrow-down.svg";
import WatchTogether from "@/assets/watch-together.svg";
import ImdbRating from "@/assets/anime/imdb-rating.svg";
import { useParams } from "next/navigation";
import CommentCard from "@/components/main-page/CommentSection/comment-card";
import ReviewCard from "@/components/main-page/ReviewSection/review-card";
import AnimeCommentCard from "@/components/main-page/CommentSection/anime-comment-card";
import AnimeCommentSection from "@/components/main-page/CommentSection/anime-comment-section";
import AnimePosterSection from "@/components/anime-page/AnimePosterSection";
import AnimeMainInfoSection from "@/components/anime-page/AnimeMainInfoSection";
import AnimeEpisodesSection from "@/components/anime-page/AnimeEpisodesSection";
import AnimeReviewsSection from "@/components/anime-page/AnimeReviewsSection";

interface Studio {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface Seo {
  title: string;
  description: string;
  image: string;
}

interface AnimeDetails {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image_name?: string;
  poster?: string;
  duration?: number;
  episodes_count?: number;
  first_air_date?: string;
  last_air_date?: string;
  imdb_score?: number;
  is_published?: boolean;
  kind?: string;
  studio?: Studio;
  seo?: Seo;
}

async function getAnime(slug: string): Promise<AnimeDetails | null> {
  try {
    const res = await fetch(`${API_BASE_URL}animes/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

async function getAnimeTags(slug: string): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}animes/${slug}/tags`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    // Assuming the response is { data: ["tag1", "tag2", ...] }
    return json.data || [];
  } catch {
    return [];
  }
}
export default function AnimePage() {
  const params = useParams();
  /*
  const anime = await getAnime(params.slug);
  const tags = await getAnimeTags(params.slug);
  if (!anime) {
    return (
      <div className="text-white text-center mt-20">Аніме не знайдено</div>
    );
  }
*/
  // Мокові дані для тесту
  const anime = {
    id: "1",
    slug: String(params?.slug || ""),
    name: "Звичайний день у Коулуні",
    poster: "/assets/mock-user-logo.png",
    image_name: "/assets/mock-user-logo.png",
    seo: {
      title: "Весняна драма",
      description: "Дуже емоційне аніме.",
      image: "/assets/mock-user-logo.png",
    },
    localRating: 7.76,
    imdb_score: 9.12,
    description: "Це тестовий опис аніме для мокових даних.",
    kind: "TV Серіал",
    is_published: true,
    episodes_count: 12,
    duration: 24,
    first_air_date: "2023-04-01",
    last_air_date: "2023-06-17",
    studio: {
      id: "studio1",
      name: "Kyoto Animation",
      slug: "kyoto-animation",
      description: "Відома студія аніме.",
    },
  };
  const tags = ["Драма", "Психологія", "Емоції"];

  // Масив описів з джерелом
  const descriptionBlocks = [
    {
      description: `У далекому майбутньому, в місті-гетто Коулун Вол-Сіті, живуть люди, які обожнюють старий спосіб життя. Це притулок для тих, хто сумує за Гонконгом минулого. Однак рієлторка <span class='text-[#4B7FCC] font-semibold'>Куджірай Рейко</span> прагне нового та захоплюючого в цьому районі. Натомість її єдиний колега, <span class='text-[#4B7FCC] font-semibold'>Кудо Хаджіме</span>, насолоджується ностальгією, яку викликає місто, і відштовхує все сучасне, що просочується за його стіни. Але, попри різні погляди та постійні сварки через найбуденніші речі, вони часто знаходять задоволення в компанії одне одного.`,
      source: {},
    },
    {
      description: `Одного дня невдалий жарт призводить до того, що Хаджіме робить несподіваний крок у бік Рейко, після чого він швидко вибачається. Спантеличена його вчинками, Рейко починає шукати можливі пояснення, тільки щоб виявити минуле, про яке вона не має жодних спогадів.`,
      source: {},
    },
    {
      description: "",
      source: {
        name: "MyAnimeList",
        url: "https://myanimelist.net/anime/52991/Kowloon_Generic_Romance",
      },
    },
  ];

  // Мокові дані для епізодів
  const episodes = [
    {
      id: 1,
      animeTitle: "Звичайний день у Коулуні",
      title: "E1 - Прокинутись у Коулуні",
      preview: "/assets/mock-user-logo.png",
      audio: "Озвучка на English",
      subs: "Субтитри",
    },
    {
      id: 2,
      animeTitle: "Звичайний день у Коулуні",
      title: "E2 - Мрії на даху",
      preview: "/assets/mock-user-logo.png",
      audio: "Озвучка на English",
      subs: "Субтитри",
    },
    {
      id: 3,
      animeTitle: "Звичайний день у Коулуні",
      title: "E3 - Магазин у провулку",
      preview: "/assets/mock-user-logo.png",
      audio: "Озвучка на English",
      subs: "Субтитри",
    },
  ];

  const [episodeOrder, setEpisodeOrder] = React.useState<"newest" | "oldest">(
    "oldest"
  );
  const filteredEpisodes = [...episodes];
  if (episodeOrder === "newest") filteredEpisodes.reverse();

  // Мокові дані для відгуків
  const reviews = [
    {
      id: 1,
      username: "АННА",
      date: "24.04.2025",
      rating: 4.5,
      text: "Це аніме мене зачарувало з першої серії! Атмосфера Коулуну передана просто магічно – ніби сама там побувала. Персонажі дуже живі, а повсякденність — така затишна. Обов'язково раджу!",
      adminReply:
        "Дякуємо за теплі слова! Ми дуже старалися передати настрій Коулуна 🥰",
      avatarUrl: "/assets/mock-user-logo.png",
    },
    {
      id: 2,
      username: "ІГОР",
      date: "20.04.2025",
      rating: 4.5,
      text: "Спочатку здавалося нудним, але чим далі — тим більше затягує. Цікаві побутові моменти, гарна анімація, приємна музика. Гарний вибір для вечірнього перегляду",
      adminReply:
        "Дякуємо, що дали аніме шанс! Раді, що воно вам припало до душі 😊",
      avatarUrl: "/assets/mock-user-logo.png",
    },
  ];

  // Мокові дані для коментарів
  const comments = [
    {
      id: 1,
      avatarUrl: "/assets/mock-user-logo.png",
      username: "SenpaiOfSarcasm",
      timeAgo: "7 днів тому",
      text: "Дивився це аніме, як нормальна людина. Тепер — сплю з постером головного героя і планую назвати кота на його честь",
    },
    {
      id: 2,
      avatarUrl: "/assets/mock-user-logo.png",
      username: "OtakuOnCrack",
      timeAgo: "8 днів тому",
      text: "Я прийшла сюди просто подивитись аніме, а тепер хочу або стати ніндзя, або піти плакати в подушку. Без середини",
    },
    {
      id: 3,
      avatarUrl: "/assets/mock-user-logo.png",
      username: "RamenRage",
      timeAgo: "7 днів тому",
      text: "Подивився першу серію, і тепер морально готуюсь до того моменту, коли все піде не так. Бо піде. Завжди йде",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-10">
        {/* Left: Poster */}
        <AnimePosterSection
          poster={anime.poster || anime.image_name}
          name={anime.name}
        />

        {/* Center: Main info */}
        <div className="flex-1 flex flex-col gap-4">
          <AnimeMainInfoSection
            anime={anime}
            tags={tags}
            descriptionBlocks={descriptionBlocks}
          />
          <AnimeEpisodesSection
            episodes={episodes}
            episodeOrder={episodeOrder}
            setEpisodeOrder={setEpisodeOrder}
          />
          <AnimeReviewsSection reviews={reviews} animeName={anime.name} />
          <AnimeCommentSection comments={comments} />
        </div>

        {/* Right: Details panel (only visible on large screens) */}
        <div className="hidden lg:flex flex-col items-end gap-6 min-w-[260px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white text-3xl font-bold">
              {anime.localRating}
            </span>
            <Star className="w-6 h-6 text-white" fill="white" />
          </div>
          <AnimeDetailsPanel anime={anime} />
        </div>
      </div>
    </>
  );
}
