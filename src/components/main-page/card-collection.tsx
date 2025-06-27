"use client";
import React, { useRef, useState, useEffect } from "react";
import { AnimeCard } from "./anime-card";
import { motion } from "framer-motion";
import ArrowRightIcon from "@/components/ui/arrow-right-icon";
import VoiceActorCard from "../shared/voice-actor-card";
import { Anek_Malayalam } from "next/font/google";
import CommentCard from "./CommentSection/comment-card";
import TopUserCard from "./top-user-card";
import ContinueWatchingCard from "./continue-watching-card";
import GenreCard from "@/components/main-page/genre-card";
import ReleaseCard from "./release-card";
import AuthorCardComponent from "../author-card";
import TopAnimeCard from "./TopAnimeList/top-anime-card";

interface CardCollectionProps {
  title?: string;
  items: any[];
  cardType: string;
  renderCard?: (item: any, idx: number) => React.ReactNode;
  showButton?: boolean;
  buttonText?: string;
  buttonUrl?: string;
}

const CARD_WIDTH = 320 + 40; // ширина карточки + gap
const CARD_WIDTH_SM = 220 + 16;
const ITEMS_PER_PAGE = 4;
const ITEMS_PER_PAGE_SM = 2;

const CardCollection: React.FC<CardCollectionProps> = ({
  title = "Популярне зараз",
  items,
  cardType = "anime",
  renderCard,
  showButton = false,
  buttonText = "",
  buttonUrl = "",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      let perPage;
      if (window.innerWidth < 640 && cardType === "top-user") {
        perPage = 5;
      } else if (window.innerWidth < 640) {
        perPage = ITEMS_PER_PAGE_SM;
      } else {
        perPage = ITEMS_PER_PAGE;
      }
      setPagesCount(Math.ceil(items.length / perPage));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items.length, cardType]);

  useEffect(() => {
    if (cardType === "top-user" && scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setActivePage(0);
    }
  }, [items, cardType]);

  const scrollToPage = (pageIdx: number) => {
    if (scrollRef.current) {
      let perPage;
      if (isMobile && cardType === "top-user") {
        perPage = 5;
      } else if (isMobile) {
        perPage = ITEMS_PER_PAGE_SM;
      } else {
        perPage = ITEMS_PER_PAGE;
      }
      const cardWidth = isMobile ? CARD_WIDTH_SM : CARD_WIDTH;
      const scrollAmount = pageIdx * cardWidth * perPage;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
      setActivePage(pageIdx);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const perPage = isMobile ? ITEMS_PER_PAGE_SM : ITEMS_PER_PAGE;
        const cardWidth = isMobile ? CARD_WIDTH_SM : CARD_WIDTH;
        const scrollLeft = scrollRef.current.scrollLeft;
        const idx = Math.round(scrollLeft / (cardWidth * perPage));
        setActivePage(idx);
      }
    };
    const ref = scrollRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);
    return () => {
      if (ref) ref.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activePage, isMobile]);

  const scroll = (dir: "left" | "right") => {
    let newPage = activePage + (dir === "left" ? -1 : 1);
    newPage = Math.max(0, Math.min(newPage, pagesCount - 1));
    scrollToPage(newPage);
  };

  if (isMobile === null) return null;

  return (
    <section className="xs:py-4 flex w-full flex-col items-center py-10">
      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="xs:mb-4 mb-8 flex items-center justify-between pr-2 pl-2">
          <h2 className="xs:text-lg text-4xl font-bold tracking-tight text-white sm:text-2xl">
            {title}
          </h2>

          {!isMobile && showButton && buttonText && buttonUrl ? (
            <a
              href={buttonUrl}
              className="ml-2 flex h-10 items-center rounded-xl border-2 border-[#4B7FCC] px-4 py-2 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#4B7FCC] hover:text-black"
            >
              {buttonText}
            </a>
          ) : (
            !isMobile &&
            pagesCount > 1 && (
              <div
                className="ml-2 flex items-center rounded-xl border border-[#918C8C80] bg-black/80 px-2 py-1"
                style={{ minWidth: 100 }}
              >
                <button
                  aria-label="Scroll left"
                  onClick={() => scroll("left")}
                  disabled={activePage === 0}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#19191c] text-lg text-white transition-all disabled:opacity-40"
                >
                  <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
                    <path
                      d="M15 19l-7-7 7-7"
                      stroke="#fff"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="mx-2 flex items-center gap-2">
                  {Array.from({ length: pagesCount }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1 cursor-pointer rounded-full transition-all duration-200 ${
                        activePage === idx
                          ? "w-6 bg-blue-500"
                          : "w-4 bg-[#23232a]"
                      }`}
                      style={{ display: "inline-block" }}
                      onClick={() => scrollToPage(idx)}
                    />
                  ))}
                </div>
                <button
                  aria-label="Scroll right"
                  onClick={() => scroll("right")}
                  disabled={activePage === pagesCount - 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#19191c] text-lg text-white transition-all disabled:opacity-40"
                >
                  <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="#fff"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )
          )}

          {isMobile && (
            <div className="ml-auto flex gap-2">
              <button
                aria-label="Scroll left"
                onClick={() => setActivePage((p) => Math.max(0, p - 1))}
                disabled={activePage === 0}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1D] text-xl text-white disabled:opacity-40"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M15 19l-7-7 7-7"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                aria-label="Scroll right"
                onClick={() =>
                  setActivePage((p) => Math.min(p + 1, pagesCount - 1))
                }
                disabled={activePage === pagesCount - 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1D] text-xl text-white disabled:opacity-40"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {isMobile ? (
          <div
            className={
              cardType === "top-user"
                ? "grid grid-cols-1 justify-center gap-2 px-2"
                : cardType === "genre"
                  ? "flex flex-col gap-6 px-2"
                  : cardType === "release"
                    ? "flex flex-col gap-16 px-2"
                    : "grid grid-cols-2 gap-2 px-2"
            }
            ref={gridRef}
          >
            {items
              .slice(
                isMobile && cardType === "top-user"
                  ? activePage * 5
                  : cardType === "release"
                    ? activePage * 2
                    : activePage * 2,
                isMobile && cardType === "top-user"
                  ? activePage * 5 + 5
                  : cardType === "release"
                    ? activePage * 2 + 2
                    : activePage * 2 + 2,
              )
              .map((item, idx) => (
                <div
                  key={item.title ? item.title + idx : idx}
                  className="w-full"
                >
                  {renderCard ? (
                    renderCard(item, idx + activePage * 2)
                  ) : cardType === "anime" ? (
                    <AnimeCard {...item} />
                  ) : cardType === "voice-actor" ? (
                    <VoiceActorCard {...item} />
                  ) : cardType === "comment" ? (
                    <CommentCard {...item} />
                  ) : cardType === "top-user" ? (
                    <TopUserCard {...item} />
                  ) : cardType === "continue-watching" ? (
                    <ContinueWatchingCard {...item} />
                  ) : cardType === "genre" ? (
                    <GenreCard {...item} />
                  ) : cardType === "release" ? (
                    <ReleaseCard {...item} />
                  ) : cardType === "author" ? (
                    <AuthorCardComponent {...item} />
                  ) : cardType === "top-anime" ? (
                    <TopAnimeCard
                      image={item.image}
                      title={item.title}
                      year={item.year}
                      type={item.type}
                      rank={item.rank ?? idx + 1}
                      rating={item.rating}
                      showRank={item.showRank}
                      href={item.href}
                      small={item.small}
                    />
                  ) : null}
                </div>
              ))}
            {cardType === "genre" && (
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
            )}
          </div>
        ) : cardType === "genre" ? (
          <div className="flex w-full flex-col gap-6 px-2">
            {items.map((item, idx) => (
              <div key={item.title ? item.title + idx : idx} className="w-full">
                {renderCard ? renderCard(item, idx) : <GenreCard {...item} />}
              </div>
            ))}
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
          </div>
        ) : cardType === "release" ? (
          isMobile ? (
            <div className="w-full">
              <div className="flex flex-col gap-8 px-2">
                {items
                  .slice(activePage * 2, activePage * 2 + 2)
                  .map((item, idx) => (
                    <ReleaseCard
                      key={
                        item.title
                          ? item.title + (activePage * 2 + idx)
                          : activePage * 2 + idx
                      }
                      {...item}
                    />
                  ))}
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <button
                  aria-label="Попередня сторінка"
                  onClick={() => setActivePage((p) => Math.max(0, p - 1))}
                  disabled={activePage === 0}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1D] text-xl text-white disabled:opacity-40"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M15 19l-7-7 7-7"
                      stroke="#fff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Наступна сторінка"
                  onClick={() =>
                    setActivePage((p) =>
                      Math.min(p + 1, Math.ceil(items.length / 2) - 1),
                    )
                  }
                  disabled={activePage === Math.ceil(items.length / 2) - 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1D] text-xl text-white disabled:opacity-40"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="#fff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, idx) => (
                <ReleaseCard
                  key={item.title ? item.title + idx : idx}
                  {...item}
                />
              ))}
            </div>
          )
        ) : cardType === "top-user" && items.length <= ITEMS_PER_PAGE ? (
          <div className="xs:gap-4 flex w-full justify-center gap-2 px-2 pt-1 pb-2">
            {items.map((item, idx) => (
              <div
                key={item.title ? item.title + idx : idx}
                className="flex-shrink-0"
                style={{ width: isMobile ? 220 : 320 }}
              >
                {renderCard ? renderCard(item, idx) : <TopUserCard {...item} />}
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            ref={scrollRef}
            className={`xs:gap-4 scrollbar-hide flex gap-2 overflow-x-auto px-2 pt-1 pb-2`}
            style={{
              scrollBehavior: "smooth",
              maxWidth: "1400px",
              margin: "0 auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {items.map((item, idx) => (
              <div
                key={item.title ? item.title + idx : idx}
                className={
                  cardType === "author"
                    ? undefined
                    : cardType === "genre"
                      ? "w-full"
                      : cardType === "top-anime"
                        ? undefined
                        : "flex-shrink-0"
                }
                style={
                  cardType === "genre"
                    ? { minWidth: "100%" }
                    : cardType === "top-anime"
                      ? { flexShrink: 0 }
                      : { width: isMobile ? 220 : 320 }
                }
              >
                {renderCard ? (
                  renderCard(item, idx)
                ) : cardType === "anime" ? (
                  <AnimeCard {...item} />
                ) : cardType === "voice-actor" ? (
                  <VoiceActorCard {...item} />
                ) : cardType === "comment" ? (
                  <CommentCard {...item} />
                ) : cardType === "top-user" ? (
                  <TopUserCard {...item} />
                ) : cardType === "continue-watching" ? (
                  <ContinueWatchingCard {...item} />
                ) : cardType === "genre" ? (
                  <GenreCard {...item} />
                ) : cardType === "release" ? (
                  <ReleaseCard {...item} />
                ) : cardType === "author" ? (
                  <AuthorCardComponent {...item} />
                ) : cardType === "top-anime" ? (
                  <TopAnimeCard
                    image={item.image}
                    title={item.title}
                    year={item.year}
                    type={item.type}
                    rank={item.rank ?? idx + 1}
                    rating={item.rating}
                    showRank={item.showRank}
                    href={item.href}
                    small={item.small}
                  />
                ) : null}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CardCollection;
