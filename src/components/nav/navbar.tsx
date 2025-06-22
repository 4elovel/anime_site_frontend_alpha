"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex items-center justify-between px-8 py-4 bg-transparent"
      style={{ minHeight: 0 }}
    >
      {/* Логотип */}
      <div className="flex-shrink-0">
        <Image
          src="/logo.png"
          alt="Логотип"
          width={40}
          height={40}
          className="w-18 h-18 object-contain"
        />
      </div>

      {/* Іконки справа */}
      <div className="flex items-center gap-6 sm:gap-4 xs:gap-2">
        {/* Пошук: інпут на десктопі, іконка на мобільних */}
        <div className="hidden md:flex items-center border border-[#5B7CB2] rounded-xl px-4 py-2 w-72 max-w-xs">
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
            type="text"
            placeholder="Пошук..."
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>
        <button className="md:hidden border border-[#5B7CB2] rounded-xl w-14 h-14 sm:w-10 sm:h-10 xs:w-8 xs:h-8 flex items-center justify-center bg-transparent hover:bg-[#2C3650] transition p-0">
          <svg
            className="w-7 h-7 sm:w-5 sm:h-5 xs:w-4 xs:h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        {/* Дзвіночок */}
        <button className="border border-[#5B7CB2] rounded-xl w-14 h-14 sm:w-10 sm:h-10 xs:w-8 xs:h-8 flex items-center justify-center bg-transparent hover:bg-[#2C3650] transition p-0">
          <svg
            className="w-7 h-7 sm:w-5 sm:h-5 xs:w-4 xs:h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Аватар */}
        <img
          src="assets/mock-user-logo.png"
          alt="User"
          className="w-12 h-12 sm:w-9 sm:h-9 xs:w-7 xs:h-7 rounded-full object-cover border border-[#5B7CB2]"
        />
      </div>
    </motion.header>
  );
}
