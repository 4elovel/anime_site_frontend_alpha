"use client";
import React, { useRef, useState, useEffect } from "react";
import { AnimeCard } from "./anime-card";
import { motion } from "framer-motion";
import ArrowRightIcon from "@/components/ui/arrow-right-icon";
import VoiceActorCard from "./voice-actor-card";
import { Anek_Malayalam } from "next/font/google";
import AuthorCardComponent from "@/components/author-card";

interface CardCollectionProps {
  title?: string;
  items: any[];
  cardType: string;
}

const CARD_WIDTH = 320 + 40;
const CARD_WIDTH_SM = 220 + 16;
const ITEMS_PER_PAGE = 4;
const ITEMS_PER_PAGE_SM = 2;

const CardCollection: React.FC<CardCollectionProps> = ({
  title = "Популярне зараз",
  items,
  cardType = "anime",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      const perPage =
        window.innerWidth < 640 ? ITEMS_PER_PAGE_SM : ITEMS_PER_PAGE;
      setPagesCount(Math.ceil(items.length / perPage));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items.length]);

  const scrollToPage = (pageIdx: number) => {
    if (scrollRef.current) {
      const perPage = isMobile ? ITEMS_PER_PAGE_SM : ITEMS_PER_PAGE;
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

  return (
    <section className="xs:py-4 flex w-full flex-col items-center py-10">
      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="xs:mb-4 mb-8 flex items-center justify-between pr-2 pl-2">
          <h2 className="xs:text-lg text-4xl font-bold tracking-tight text-white sm:text-2xl">
            {title}
          </h2>
          {/* Пагінація справа на рівні з заголовком */}
          {!isMobile && (
            <div
              className="xs:px-2 xs:py-1 ml-4 flex items-center rounded-2xl border border-[#918C8C80] bg-black/80 px-4 py-2"
              style={{ minWidth: isMobile ? 100 : 180 }}
            >
              <button
                aria-label="Scroll left"
                onClick={() => scroll("left")}
                disabled={activePage === 0}
                className="xs:w-8 xs:h-8 xs:text-base flex h-12 w-12 items-center justify-center rounded-xl bg-[#19191c] text-2xl text-white transition-all disabled:opacity-40"
              >
                <svg
                  width={isMobile ? 16 : 24}
                  height={isMobile ? 16 : 24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="xs:mx-2 mx-4 flex items-center gap-2">
                {Array.from({ length: pagesCount }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`xs:h-1 h-1.5 cursor-pointer rounded-full transition-all duration-200 ${activePage === idx ? (isMobile ? "w-4 bg-blue-500" : "w-7 bg-blue-500") : isMobile ? "w-2 bg-[#23232a]" : "w-5 bg-[#23232a]"}`}
                    style={{ display: "inline-block" }}
                    onClick={() => scrollToPage(idx)}
                  />
                ))}
              </div>
              <button
                aria-label="Scroll right"
                onClick={() => scroll("right")}
                disabled={activePage === pagesCount - 1}
                className="xs:w-8 xs:h-8 xs:text-base flex h-12 w-12 items-center justify-center rounded-xl bg-[#19191c] text-2xl text-white transition-all disabled:opacity-40"
              >
                <svg
                  width={isMobile ? 16 : 24}
                  height={isMobile ? 16 : 24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
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
          {/* Мобільна стрілка справа */}
          {isMobile && (
            <div className="ml-auto flex gap-2">
              <button
                aria-label="Scroll left"
                onClick={() => setActivePage((p) => Math.max(0, p - 1))}
                disabled={activePage === 0}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#444] bg-black/80 text-xl text-white disabled:opacity-40"
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
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#444] bg-black/80 text-xl text-white disabled:opacity-40"
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
        {/* Грід для мобільних */}
        {isMobile ? (
          <div className="grid grid-cols-2 gap-4 px-2" ref={gridRef}>
            {items
              .slice(activePage * 2, activePage * 2 + 2)
              .map((anime, idx) => (
                <div key={anime.title + idx} className="w-full">
                  {cardType === "anime" && <AnimeCard {...anime} />}
                  {cardType === "voice-actor" && <VoiceActorCard {...anime} />}
                  {cardType === "author" && <AuthorCardComponent {...anime} />}
                </div>
              ))}
          </div>
        ) : (
          <motion.div
            ref={scrollRef}
            className="xs:gap-4 scrollbar-hide flex gap-10 overflow-x-auto px-2 pt-1 pb-2"
            style={{
              scrollBehavior: "smooth",
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            {items.map((anime, idx) => (
              <div
                key={anime.title + idx}
                className={cardType === "author" ? undefined : "flex-shrink-0"}
                style={{ width: isMobile ? 220 : 320 }}
              >
                {cardType === "anime" && <AnimeCard {...anime} />}
                {cardType === "voice-actor" && <VoiceActorCard {...anime} />}
                {cardType === "author" && <AuthorCardComponent {...anime} />}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CardCollection;
