'use client'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 0,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    title: 'Бліч: Тисячолітня кривава війна',
    description: 'У Суспільстві Душ спокій та мирне існування раптово дещо порушує. Таємничі мешканці почали дедалі частіше зникати без жодного сліду і не відомо, хто за цим стоїть. А між тим чорна тінь підкрадається все ближче до ніґо та його друзів...',
  },
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=800&h=600&fit=crop',
    title: 'Винищувач демонів',
    description: 'Танджіро Камадо живе разом зі своєю сім\'єю у горах. Одного дня він йде в місто, щоб продати деревне вугілля.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&h=600&fit=crop',
    title: 'Магічна школа',
    description: 'Темні та захоплюючі пригоди у світі проклять та чаклунства.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    title: 'Капелюх відьми',
    description: 'Химерна подорож чарівним світом відьмацтва та чудес.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=800&h=600&fit=crop',
    title: 'Мисливець х Мисливець',
    description: 'Епічна розповідь про пригоди, дружбу та битви.',
  },
];

const AnimeCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = slides.length;
  
    // Автоматичне перелистывание
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
  
    const getVisibleSlides = () => {
      return Array.from({ length: 5 }, (_, i) => {
        const offset = i - 2;
        const index = (currentIndex + offset + totalSlides) % totalSlides;
        return { ...slides[index], offset };
      });
    };
  
    return (
      <div className="w-full h-screen flex items-center justify-center overflow-hidden relative" style={{ perspective: 1200 }}>
        {/* Background grid */}  
        <div className="relative w-full max-w-[1600px] h-[600px] sm:h-[400px] xs:h-[260px] flex items-center justify-center">
          {/* Справжній скрол-карусель */}
          {slides.map((slide, slideIndex) => {
            let relativeIndex = slideIndex - currentIndex;
            if (relativeIndex > Math.floor(totalSlides / 2)) {
              relativeIndex -= totalSlides;
            } else if (relativeIndex < -Math.floor(totalSlides / 2)) {
              relativeIndex += totalSlides;
            }
            // Показуємо лише ті, що поряд із центром
            if (Math.abs(relativeIndex) > 2) return null;

            // Зміщення та масштаб
            const offsetX = window.innerWidth < 640 ? 90 : window.innerWidth < 900 ? 140 : 220;
            let translateX = relativeIndex * offsetX;
            let scale = 1;
            if (relativeIndex === -2 || relativeIndex === 2) scale = window.innerWidth < 640 ? 0.7 : 0.78;
            if (relativeIndex === -1 || relativeIndex === 1) scale = window.innerWidth < 640 ? 0.82 : 0.9;
            if (relativeIndex === 0) scale = 1;

            let zIndex = 10 - Math.abs(relativeIndex);

            return (
              <motion.div
                key={slide.id}
                className="absolute"
                style={{ zIndex }}
                initial={false}
                animate={{ x: translateX, scale, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              >
                <div className="relative w-[700px] h-[500px] rounded-3xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                  {relativeIndex === 0 && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-8 sm:p-4 xs:p-2 text-white"
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <h2 className="text-4xl sm:text-2xl xs:text-base font-extrabold leading-tight mb-4 xs:mb-2">
                        {slide.title}
                      </h2>
                      <p className="text-lg sm:text-base xs:text-xs leading-relaxed text-gray-300">
                        {slide.description}
                      </p>
                    </motion.div>
                  )}
                  {relativeIndex !== 0 && <div className="absolute inset-0" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default AnimeCarousel;
  