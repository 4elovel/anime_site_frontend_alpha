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
    <section className="w-full flex flex-col items-center py-10 xs:py-4">
      <div className="relative w-full max-w-[1400px] mx-auto">
        <div className="flex items-center mb-8 xs:mb-4 pl-2 pr-2 justify-between">
          <h2 className="text-white text-4xl sm:text-2xl xs:text-lg font-bold tracking-tight">
            {title}
          </h2>

          {!isMobile && showButton && buttonText && buttonUrl ? (
            <a
              href={buttonUrl}
              className="border-2 border-[#4B7FCC] rounded-xl px-4 py-2 text-white font-semibold transition-colors duration-200 hover:bg-[#4B7FCC] hover:text-black text-base ml-2 h-10 flex items-center"
            >
              {buttonText}
            </a>
          ) : (
            !isMobile &&
            pagesCount > 1 && (
              <div
                className="flex items-center border border-[#918C8C80] rounded-xl px-2 py-1 bg-black/80 ml-2"
                style={{ minWidth: 100 }}
              >
                <button
                  aria-label="Scroll left"
                  onClick={() => scroll("left")}
                  disabled={activePage === 0}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#19191c] transition-all text-white text-lg disabled:opacity-40"
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
                <div className="flex items-center gap-2 mx-2">
                  {Array.from({ length: pagesCount }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-200 cursor-pointer ${
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
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#19191c] transition-all text-white text-lg disabled:opacity-40"
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
            <div className="flex gap-2 ml-auto">
              <button
                aria-label="Scroll left"
                onClick={() => setActivePage((p) => Math.max(0, p - 1))}
                disabled={activePage === 0}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1A1A1D] text-white text-xl disabled:opacity-40"
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
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1A1A1D] text-white text-xl disabled:opacity-40"
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
                ? "grid grid-cols-1 gap-2 px-2 justify-center"
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
                  : activePage * 2 + 2
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
                  ) : null}
                </div>
              ))}
            {cardType === "genre" && (
              <div className="w-full flex justify-center mt-4">
                <div
                  className="w-full h-0 border-t-[2px]"
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
          <div className="flex flex-col gap-6 px-2 w-full">
            {items.map((item, idx) => (
              <div key={item.title ? item.title + idx : idx} className="w-full">
                {renderCard ? renderCard(item, idx) : <GenreCard {...item} />}
              </div>
            ))}
            <div className="w-full flex justify-center mt-4">
              <div
                className="w-full h-0 border-t-[2px]"
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
              <div className="flex justify-center gap-2 mt-4">
                <button
                  aria-label="Попередня сторінка"
                  onClick={() => setActivePage((p) => Math.max(0, p - 1))}
                  disabled={activePage === 0}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1A1A1D] text-white text-xl disabled:opacity-40"
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
                      Math.min(p + 1, Math.ceil(items.length / 2) - 1)
                    )
                  }
                  disabled={activePage === Math.ceil(items.length / 2) - 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1A1A1D] text-white text-xl disabled:opacity-40"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
              {items.map((item, idx) => (
                <ReleaseCard
                  key={item.title ? item.title + idx : idx}
                  {...item}
                />
              ))}
            </div>
          )
        ) : cardType === "top-user" && items.length <= ITEMS_PER_PAGE ? (
          <div className="flex gap-2 xs:gap-4 justify-center px-2 pb-2 pt-1 w-full">
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
            className={`flex gap-2 xs:gap-4 overflow-x-auto scrollbar-hide px-2 pb-2 pt-1${
              cardType === "top-user" ? " justify-center" : ""
            }`}
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
                className={cardType === "genre" ? "w-full" : "flex-shrink-0"}
                style={
                  cardType === "genre"
                    ? { minWidth: "100%" }
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
