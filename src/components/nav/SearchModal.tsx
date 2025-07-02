import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";

const mockResults = [
  {
    id: 1,
    title: "Звичайний роман у Коулуні",
    enTitle: "Kowloon Generic Romance",
    slug: "kowloon-generic-romance",
    year: 2025,
    type: "TV Серіал",
    status: "Онгоінг",
    statusColor: "bg-blue-500",
    rating: 7.56,
    image: "/assets/profile/mock-history-anime-card2.png",
  },
  {
    id: 2,
    title: "Як стати звичайним - 2 сезон",
    enTitle: "Shoushimin Series 2nd Season",
    slug: "shoushimin-series-2nd-season",
    year: 2025,
    type: "TV Серіал",
    status: "Завершено",
    statusColor: "bg-green-600",
    rating: 8.05,
    image: "/assets/profile/mock-history-anime-card.png",
  },
  {
    id: 3,
    title: "Як стати звичайним",
    enTitle: "Shoushimin Series",
    slug: "shoushimin-series",
    year: 2024,
    type: "TV Серіал",
    status: "Завершено",
    statusColor: "bg-green-600",
    rating: 7.32,
    image: "/assets/profile/mock-history-anime-card2.png",
  },
  {
    id: 4,
    title: "Як стати звичайним",
    enTitle: "Shoushimin Series",
    slug: "shoushimin-series",
    year: 2024,
    type: "TV Серіал",
    status: "Завершено",
    statusColor: "bg-green-600",
    rating: 7.32,
    image: "/assets/profile/mock-history-anime-card2.png",
  },
  {
    id: 5,
    title: "Як стати звичайним",
    enTitle: "Shoushimin Series",
    slug: "shoushimin-series",
    year: 2024,
    type: "TV Серіал",
    status: "Завершено",
    statusColor: "bg-green-600",
    rating: 7.32,
    image: "/assets/profile/mock-history-anime-card2.png",
  },
  {
    id: 6,
    title: "Як стати звичайним",
    enTitle: "Shoushimin Series",
    slug: "shoushimin-series",
    year: 2024,
    type: "TV Серіал",
    status: "Завершено",
    statusColor: "bg-green-600",
    rating: 7.32,
    image: "/assets/profile/mock-history-anime-card2.png",
  },
];

const categories = [
  {
    key: "anime",
    label: "Аніме",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="white"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          d="M9 15H6C5.20435 15 4.44129 14.6839 3.87868 14.1213C3.31607 13.5587 3 12.7956 3 12M3 12V6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H12C12.7956 3 13.5587 3.31607 14.1213 3.87868C14.6839 4.44129 15 5.20435 15 6V9M3 12L5.296 9.70404C5.74795 9.25215 6.36089 8.99829 7 8.99829C7.63911 8.99829 8.25205 9.25215 8.704 9.70404L9 10M7 6V6.01M9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9H18C18.7956 9 19.5587 9.31607 20.1213 9.87868C20.6839 10.4413 21 11.2044 21 12V18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21H12C11.2044 21 10.4413 20.6839 9.87868 20.1213C9.31607 19.5587 9 18.7956 9 18V12ZM14 13.5V16.5L16.5 15L14 13.5Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "character",
    label: "Персонаж",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="white"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          d="M13.5938 3C11.1158 3 8.35575 3.4215 6.30375 5.6955C4.25475 7.9695 3 11.91 3 18.75V19.5H9.492C10.2345 19.9688 11.0692 20.25 12 20.25C12.9308 20.25 13.7662 19.9627 14.508 19.5H21.75V18.75C21.75 12.6562 20.5725 9.117 19.0312 7.0545C17.6738 5.2395 16.1123 4.734 14.9528 4.617L14.25 3.375L14.04 3H13.5938ZM13.1715 4.54725L13.7812 5.625L13.9913 6H14.4375C15.195 6 16.5735 6.255 17.835 7.9455C19.0395 9.555 20.1 12.6225 20.2035 18H16.1722C16.2547 17.895 16.3297 17.781 16.407 17.6715C17.4247 16.2188 18 14.4053 18 12.75H16.5C16.5 14.0415 16.017 15.6203 15.1875 16.8045C14.358 17.9895 13.2487 18.75 12 18.75C10.7528 18.75 9.64275 17.9925 8.8125 16.8045C7.98225 15.618 7.5 14.0325 7.5 12.75C7.5 12.417 7.56375 12.2498 7.665 12.117C7.764 11.9843 7.938 11.8695 8.20275 11.766C8.733 11.556 9.62775 11.4697 10.5705 11.391C11.514 11.3115 12.498 11.2365 13.383 10.8285C14.268 10.4197 15 9.495 15 8.25H13.5C13.5 9.033 13.2945 9.228 12.7725 9.46875C12.252 9.70875 11.361 9.81225 10.4295 9.891C9.498 9.96975 8.517 10.0133 7.6395 10.359C7.20225 10.5315 6.7785 10.7925 6.4695 11.2035C6.1575 11.6137 6 12.1635 6 12.75C6 14.3985 6.576 16.1925 7.59375 17.6475C7.67625 17.768 7.76225 17.8855 7.85175 18H4.545C4.64625 11.8777 5.8275 8.478 7.428 6.70275C8.994 4.96725 11.0152 4.5915 13.17 4.54725H13.1715ZM9.75 12.75C9.55109 12.75 9.36032 12.829 9.21967 12.9697C9.07902 13.1103 9 13.3011 9 13.5C9 13.6989 9.07902 13.8897 9.21967 14.0303C9.36032 14.171 9.55109 14.25 9.75 14.25C9.94891 14.25 10.1397 14.171 10.2803 14.0303C10.421 13.8897 10.5 13.6989 10.5 13.5C10.5 13.3011 10.421 13.1103 10.2803 12.9697C10.1397 12.829 9.94891 12.75 9.75 12.75ZM14.25 12.75C14.0511 12.75 13.8603 12.829 13.7197 12.9697C13.579 13.1103 13.5 13.3011 13.5 13.5C13.5 13.6989 13.579 13.8897 13.7197 14.0303C13.8603 14.171 14.0511 14.25 14.25 14.25C14.4489 14.25 14.6397 14.171 14.7803 14.0303C14.921 13.8897 15 13.6989 15 13.5C15 13.3011 14.921 13.1103 14.7803 12.9697C14.6397 12.829 14.4489 12.75 14.25 12.75Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    key: "person",
    label: "Людина",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="white"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "user",
    label: "Користувач",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="white"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          d="M6 21V20C6 18.9391 6.42143 17.9217 7.17157 17.1716C7.92172 16.4214 8.93913 16 10 16H14C15.0609 16 16.0783 16.4214 16.8284 17.1716C17.5786 17.9217 18 18.9391 18 20V21M9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10ZM3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<Props> = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("anime");
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(mockResults);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  const Loader = () => (
    <div className="flex justify-center items-center h-40">
      <motion.div
        className="w-8 h-8 border-4 border-[#4B7FCC] border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      />
    </div>
  );

  React.useEffect(() => {
    if (query === "") {
      setResults(mockResults);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(() => {
      setResults(
        mockResults.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.enTitle.toLowerCase().includes(query.toLowerCase())
        )
      );
      setLoading(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, [query]);

  if (typeof window === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] isolate flex items-start justify-center bg-black/70 pt-10"
        >
          <motion.div
            ref={modalRef}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-[#1A1A1D] border border-[#787880] rounded-2xl w-full max-w-2xl shadow-xl relative z-[10000]"
          >
            <div className="flex items-center bg-[#1A1A1D] px-4 py-4 rounded-tr-2xl rounded-tl-2xl border border-[#787880]">
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-lg bg-[#2C2C30] text-sm font-medium min-w-[110px]"
                  onClick={() => setDropdown((v) => !v)}
                >
                  {categories.find((c) => c.key === category)?.icon}
                  {categories.find((c) => c.key === category)?.label}
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 mt-2 bg-[#18181B] rounded-2xl shadow-lg border border-[#52525B] z-10 py-3 px-3"
                    style={{ boxShadow: "0 2px 24px 0 #0008", width: "270px" }}
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat.key}
                        className={`flex items-center w-full gap-3 mb-1.5 last:mb-0 px-2 py-2 rounded-sm transition font-bold text-white text-sm ${
                          category === cat.key
                            ? "bg-[#23232A]"
                            : "hover:bg-[#23232A]/60"
                        }`}
                        onClick={() => {
                          setCategory(cat.key);
                          setDropdown(false);
                        }}
                        style={{ minHeight: "48px" }}
                      >
                        <span
                          className={`flex items-center justify-center mr-1`}
                        >
                          {category === cat.key ? (
                            <span className="w-6 h-6 bg-[#4B7FCC] rounded-sm flex items-center justify-center">
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#11181C"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                          ) : (
                            <span className="w-6 h-6 border-2 border-[#A1A1AA] rounded-sm flex items-center justify-center"></span>
                          )}
                        </span>
                        <span className="flex items-center justify-center">
                          {React.cloneElement(cat.icon, {
                            className: "w-7 h-7",
                          })}
                        </span>
                        <span className="flex-1 text-left">{cat.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
              <div className="flex items-center rounded-lg px-3 py-2 mr-4">
                <svg
                  className="w-5 h-5 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Введіть текст"
                  className="bg-transparent outline-none text-white placeholder-gray-400 w-40 sm:w-60"
                />
              </div>

              <button
                onClick={onClose}
                className="ml-auto text-gray-400 hover:text-white p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="px-2 py-2 max-h-[60vh] overflow-y-auto bg-[#09090B]">
              {loading ? (
                <Loader />
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.07,
                      },
                    },
                  }}
                >
                  {results.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className={`flex gap-4 rounded-2xl px-4 py-3 mb-3 transition-colors cursor-pointer hover:bg-[#2C2C30]`}
                    >
                      <Link
                        href={`/anime/${item.slug}`}
                        className="flex gap-4 flex-1 min-w-0"
                        onClick={onClose}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={70}
                          height={100}
                          className="rounded-xl object-cover w-[70px] h-[100px]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 justify-between">
                            <div className="flex gap-2 min-w-0">
                              <span className="text-white font-semibold text-base leading-tight truncate">
                                {item.title}
                              </span>
                              <span className="text-gray-400 text-sm leading-tight truncate">
                                / {item.enTitle}
                              </span>
                            </div>
                            <span className="flex items-center gap-1 text-white font-semibold text-lg min-w-[60px] justify-end">
                              {item.rating.toFixed(2)}
                              <Star
                                className="w-5 h-5 text-white"
                                fill="white"
                              />
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-300 text-sm">
                              {item.year}
                            </span>
                            <span className="text-gray-400 text-xs">•</span>
                            <span className="text-gray-300 text-sm">
                              {item.type}
                            </span>
                            <span
                              className={`ml-2 px-2 py-0.5 rounded-lg text-xs font-semibold text-white ${item.statusColor}`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SearchModal;
