"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    title: "Бліч: Тисячолітня кривава війна",
    description:
      "У Суспільстві Душ спокій та мирне існування раптово дещо порушує. Таємничі мешканці почали дедалі частіше зникати без жодного сліду і не відомо, хто за цим стоїть. А між тим чорна тінь підкрадається все ближче до ніґо та його друзів...",
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1541562232579-512a21360020?w=800&h=600&fit=crop",
    title: "Винищувач демонів",
    description:
      "Танджіро Камадо живе разом зі своєю сім'єю у горах. Одного дня він йде в місто, щоб продати деревне вугілля.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&h=600&fit=crop",
    title: "Магічна школа",
    description: "Темні та захоплюючі пригоди у світі проклять та чаклунства.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    title: "Капелюх відьми",
    description: "Химерна подорож чарівним світом відьмацтва та чудес.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=800&h=600&fit=crop",
    title: "Мисливець х Мисливець",
    description: "Епічна розповідь про пригоди, дружбу та битви.",
  },
];

function useWindowWidth() {
  const [width, setWidth] = useState(0); // Початкове значення 0
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, mounted };
}

const AnimeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;
  const { width, mounted } = useWindowWidth();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  if (!mounted) {
    return (
      <div className="w-full h-[300px] sm:h-[500px] flex items-center justify-center bg-gray-900 rounded-xl">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const slideWidth = isMobile ? 350 : isTablet ? 500 : 660;
  const slideHeight = isMobile ? 200 : isTablet ? 400 : 400;
  const offsetX = isMobile ? 60 : isTablet ? 100 : 150;

  return (
    <div className="w-full select-none min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] flex items-center justify-center overflow-hidden relativepy-8">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "100%",
          maxWidth: `${slideWidth * 3}px`,
          height: `${slideHeight + 50}px`,
        }}
      >
        {slides.map((slide, slideIndex) => {
          let relativeIndex = slideIndex - currentIndex;
          if (relativeIndex > Math.floor(totalSlides / 2)) {
            relativeIndex -= totalSlides;
          } else if (relativeIndex < -Math.floor(totalSlides / 2)) {
            relativeIndex += totalSlides;
          }

          const maxVisible = isMobile ? 2 : 2;
          if (Math.abs(relativeIndex) > maxVisible) return null;

          let translateX = relativeIndex * offsetX;
          let scale = 1;
          let opacity = 1;

          if (Math.abs(relativeIndex) === 2) {
            scale = 0.8;
            opacity = 0.9;
          } else if (Math.abs(relativeIndex) === 1) {
            scale = 0.9;
            opacity = 1;
          }

          const zIndex = 10 - Math.abs(relativeIndex);

          return (
            <motion.div
              key={slide.id}
              className={`absolute cursor-pointer ${
                relativeIndex === 0 ? "z-20" : "z-10"
              }`}
              style={{ zIndex }}
              initial={false}
              animate={{
                x: translateX,
                scale,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 18,
                opacity: { duration: 0.3 },
              }}
              onClick={() => {
                if (relativeIndex !== 0) {
                  setCurrentIndex(slideIndex);
                }
              }}
            >
              <div
                className={`relative overflow-hidden rounded-xl shadow-md
                  w-[300px] h-[200px]
                  sm:w-[350px] sm:h-[200px]
                  md:w-[500px] md:h-[300px]
                  lg:w-[850px] lg:h-[400px]`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 350px, (max-width: 1280px) 500px, 660px"
                  priority={relativeIndex === 0}
                  quality={70}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {relativeIndex === 0 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-black/40 backdrop-blur-lg rounded-sm sm:rounded-2xl flex items-center justify-center z-30 hover:bg-black/50 transition"
                      aria-label="Попередній слайд"
                      type="button"
                    >
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M19 12L5 12M5 12L9 8M5 12L9 16"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={next}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-black/40 backdrop-blur-lg rounded-sm sm:rounded-2xl flex items-center justify-center z-30 hover:bg-black/50 transition "
                      aria-label="Наступний слайд"
                      type="button"
                    >
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        className="rotate-180"
                      >
                        <path
                          d="M19 12L5 12M5 12L9 8M5 12L9 16"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 text-white z-20"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <h2
                        className={`font-bold leading-tight mb-1 ${
                          isMobile
                            ? "text-sm"
                            : isTablet
                            ? "text-base"
                            : "text-lg"
                        }`}
                      >
                        {slide.title}
                      </h2>
                      <p
                        className={`text-gray-300 leading-relaxed ${
                          isMobile
                            ? "text-xs line-clamp-2"
                            : isTablet
                            ? "text-sm line-clamp-3"
                            : "text-sm line-clamp-3"
                        }`}
                      >
                        {slide.description}
                      </p>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimeCarousel;
