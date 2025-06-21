'use client'
import React, { useRef, useState, useEffect } from 'react';
import { AnimeCard } from './anime-card';
import { motion } from 'framer-motion';
import ArrowRightIcon from "@/components/ui/arrow-right-icon";
import VoiceActorCard from "./voice-actor-card";
import { Anek_Malayalam } from "next/font/google";

interface CardCollectionProps {
  title?: string;
  items: any[];
  cardType: string;
}

const CARD_WIDTH = 320 + 40; // ширина карточки + gap
const CARD_WIDTH_SM = 220 + 16;
const ITEMS_PER_PAGE = 4;
const ITEMS_PER_PAGE_SM = 2;

const CardCollection: React.FC<CardCollectionProps> = ({
  title = 'Популярне зараз',
  items,
  cardType = 'anime',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      const perPage = window.innerWidth < 640 ? ITEMS_PER_PAGE_SM : ITEMS_PER_PAGE;
      setPagesCount(Math.ceil(items.length / perPage));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [items.length]);

  // Скролимо до сторінки
  const scrollToPage = (pageIdx: number) => {
    if (scrollRef.current) {
      const perPage = isMobile ? ITEMS_PER_PAGE_SM : ITEMS_PER_PAGE;
      const cardWidth = isMobile ? CARD_WIDTH_SM : CARD_WIDTH;
      const scrollAmount = pageIdx * cardWidth * perPage;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      setActivePage(pageIdx);
    }
  };

  // Відслідковуємо активну сторінку при ручному скролі
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
    if (ref) ref.addEventListener('scroll', handleScroll);
    return () => { if (ref) ref.removeEventListener('scroll', handleScroll); };
  }, [isMobile]);

  // Додаю scroll-to-top для grid при зміні сторінки (мобільна версія)
  useEffect(() => {
    if (isMobile && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activePage, isMobile]);

  const scroll = (dir: 'left' | 'right') => {
    let newPage = activePage + (dir === 'left' ? -1 : 1);
    newPage = Math.max(0, Math.min(newPage, pagesCount - 1));
    scrollToPage(newPage);
  };

  return (
    <section className="w-full flex flex-col items-center py-10 xs:py-4">
      <div className="relative w-full max-w-[1400px] mx-auto">
        <div className="flex items-center mb-8 xs:mb-4 pl-2 pr-2 justify-between">
          <h2 className="text-white text-4xl sm:text-2xl xs:text-lg font-bold tracking-tight">
            {title}
          </h2>
          {/* Пагінація справа на рівні з заголовком */}
          {!isMobile && (
            <div className="flex items-center border border-[#918C8C80] rounded-2xl px-4 py-2 xs:px-2 xs:py-1 bg-black/80 ml-4" style={{ minWidth: isMobile ? 100 : 180 }}>
              <button
                aria-label="Scroll left"
                onClick={() => scroll('left')}
                disabled={activePage === 0}
                className="w-12 h-12 xs:w-8 xs:h-8 flex items-center justify-center rounded-xl bg-[#19191c] transition-all text-white text-2xl xs:text-base disabled:opacity-40"
              >
                <svg width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="flex items-center gap-2 mx-4 xs:mx-2">
                {Array.from({ length: pagesCount }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 xs:h-1 rounded-full transition-all duration-200 cursor-pointer ${activePage === idx ? (isMobile ? 'w-4 bg-blue-500' : 'w-7 bg-blue-500') : (isMobile ? 'w-2 bg-[#23232a]' : 'w-5 bg-[#23232a]')}`}
                    style={{ display: 'inline-block' }}
                    onClick={() => scrollToPage(idx)}
                  />
                ))}
              </div>
              <button
                aria-label="Scroll right"
                onClick={() => scroll('right')}
                disabled={activePage === pagesCount - 1}
                className="w-12 h-12 xs:w-8 xs:h-8 flex items-center justify-center rounded-xl bg-[#19191c] transition-all text-white text-2xl xs:text-base disabled:opacity-40"
              >
                <svg width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          )}
          {/* Мобільна стрілка справа */}
          {isMobile && (
            <div className="flex gap-2 ml-auto">
              <button
                aria-label="Scroll left"
                onClick={() => setActivePage((p) => Math.max(0, p - 1))}
                disabled={activePage === 0}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#444] bg-black/80 text-white text-xl disabled:opacity-40"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                aria-label="Scroll right"
                onClick={() => setActivePage((p) => Math.min(p + 1, pagesCount - 1))}
                disabled={activePage === pagesCount - 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#444] bg-black/80 text-white text-xl disabled:opacity-40"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          )}
        </div>
        {/* Грід для мобільних */}
        {isMobile ? (
          <div className="grid grid-cols-2 gap-4 px-2" ref={gridRef}>
            {items.slice(activePage * 2, activePage * 2 + 2).map((anime, idx) => (
              <div key={anime.title + idx} className="w-full">
                {cardType === 'anime' && <AnimeCard {...anime} />}
                {cardType === "voice-actor" && <VoiceActorCard {...anime} />}
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            ref={scrollRef}
            className="flex gap-10 xs:gap-4 overflow-x-auto scrollbar-hide px-2 pb-2 pt-1"
            style={{ scrollBehavior: 'smooth', maxWidth: '1400px', margin: '0 auto' }}
          >
            {items.map((anime, idx) => (
              <div key={anime.title + idx} className="flex-shrink-0" style={{ width: isMobile ? 220 : 320 }}>
                {cardType === 'anime' && <AnimeCard {...anime} />}
                {cardType === "voice-actor" && <VoiceActorCard {...anime} />}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CardCollection;
