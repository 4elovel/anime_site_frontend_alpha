"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface CollectionItem {
  img: string;
  title: string;
  href: string;
}

interface CustomCollectionCardProps {
  title?: string;
  comments?: number;
  likes?: number;
  time?: string;
  tags?: string[];
  items?: CollectionItem[];
  userAvatar?: string;
  userName?: string;
}

const CustomCollectionSection: React.FC<CustomCollectionCardProps> = ({
  title = "Підбірки користувачів",
  comments = 60,
  likes = 70,
  time = "близько 5 годин тому",
  tags = ["Україна", "Українці"],
  items = [
    {
      img: "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
      title: "Війни Сакури. Цяівафіва",
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
  ],
  userAvatar = "/assets/mock-user-logo.png",
  userName = "Україна в аніме",
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const ITEMS_PER_PAGE_SM = 2;
  const pagesCount = Math.ceil(items.length / ITEMS_PER_PAGE_SM);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (activePage > pagesCount - 1) setActivePage(0);
  }, [pagesCount]);

  return (
    <div className="select-none text-white p-6 w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold ">{title}</h2>
        {isMobile && pagesCount > 1 && (
          <div className="flex gap-2 ml-4">
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
      <div className="flex flex-col items-start mb-4 sm:flex-row sm:items-center">
        <Image
          src={userAvatar}
          alt={userName}
          width={80}
          height={80}
          className="w-20 h-20 rounded-xl mb-2 sm:mb-0 sm:mr-4 object-cover"
        />
        <div className="flex flex-col items-start sm:items-start flex-1">
          <span className="text-white text-lg font-semibold mb-2 text-left sm:text-left">
            {userName}
          </span>
          <div className="flex items-center space-x-4 text-gray-400 text-base mb-2">
            <div className="flex items-center">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                className="mr-2"
              >
                <path
                  d="M0.75 7.74655C0.551088 7.74655 0.360322 7.66753 0.21967 7.52688C0.0790178 7.38622 0 7.19546 0 6.99655V0.998047C0 0.799134 0.0790178 0.608369 0.21967 0.467717C0.360322 0.327065 0.551088 0.248047 0.75 0.248047H6.75C6.94891 0.248047 7.13968 0.327065 7.28033 0.467717C7.42098 0.608369 7.5 0.799134 7.5 0.998047V6.99655C7.5 7.19546 7.42098 7.38622 7.28033 7.52688C7.13968 7.66753 6.94891 7.74655 6.75 7.74655H0.75ZM11.25 7.74655C11.0511 7.74655 10.8603 7.66753 10.7197 7.52688C10.579 7.38622 10.5 7.19546 10.5 6.99655V0.998047C10.5 0.799134 10.579 0.608369 10.7197 0.467717C10.8603 0.327065 11.0511 0.248047 11.25 0.248047H17.2485C17.4474 0.248047 17.6382 0.327065 17.7788 0.467717C17.9195 0.608369 17.9985 0.799134 17.9985 0.998047V6.99655C17.9985 7.19546 17.9195 7.38622 17.7788 7.52688C17.6382 7.66753 17.4474 7.74655 17.2485 7.74655H11.25ZM0.75 18.2465C0.551088 18.2465 0.360322 18.1675 0.21967 18.0269C0.0790178 17.8862 0 17.6955 0 17.4965V11.4965C0 11.2976 0.0790178 11.1069 0.21967 10.9662C0.360322 10.8256 0.551088 10.7465 0.75 10.7465H6.75C6.94891 10.7465 7.13968 10.8256 7.28033 10.9662C7.42098 11.1069 7.5 11.2976 7.5 11.4965V17.4965C7.5 17.6955 7.42098 17.8862 7.28033 18.0269C7.13968 18.1675 6.94891 18.2465 6.75 18.2465H0.75ZM11.25 18.2465C11.0511 18.2465 10.8603 18.1675 10.7197 18.0269C10.579 17.8862 10.5 17.6955 10.5 17.4965V11.4965C10.5 11.2976 10.579 11.1069 10.7197 10.9662C10.8603 10.8256 11.0511 10.7465 11.25 10.7465H17.2485C17.4474 10.7465 17.6382 10.8256 17.7788 10.9662C17.9195 11.1069 17.9985 11.2976 17.9985 11.4965V17.4965C17.9985 17.6955 17.9195 17.8862 17.7788 18.0269C17.6382 18.1675 17.4474 18.2465 17.2485 18.2465H11.25Z"
                  fill="#787880"
                />
              </svg>
              <span>{items.length}</span>
            </div>
            <div className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 20 18" className="mr-2">
                <path
                  d="M1 17.2458L2.3 13.3458C-0.0239997 9.90882 0.874 5.47382 4.4 2.97182C7.926 0.470816 12.99 0.675816 16.245 3.45182C19.5 6.22882 19.94 10.7178 17.274 13.9528C14.608 17.1878 9.659 18.1678 5.7 16.2458L1 17.2458Z"
                  stroke="#787880"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{comments}</span>
            </div>
            <div className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 18 20" className="mr-2">
                <path
                  d="M6.00009 18.2459V10.2459H2.41409C2.21634 10.2459 2.02305 10.1872 1.85864 10.0773C1.69423 9.96746 1.56609 9.8113 1.49042 9.6286C1.41475 9.4459 1.39494 9.24486 1.43351 9.05091C1.47208 8.85696 1.56728 8.67879 1.70709 8.53894L8.29309 1.95294C8.48062 1.76547 8.73493 1.66016 9.00009 1.66016C9.26526 1.66016 9.51957 1.76547 9.70709 1.95294L16.2931 8.53894C16.4329 8.67879 16.5281 8.85696 16.5667 9.05091C16.6052 9.24486 16.5854 9.4459 16.5098 9.6286C16.4341 9.8113 16.306 9.96746 16.1416 10.0773C15.9771 10.1872 15.7838 10.2459 15.5861 10.2459H12.0001V18.2459C12.0001 18.5112 11.8947 18.7655 11.7072 18.9531C11.5197 19.1406 11.2653 19.2459 11.0001 19.2459H7.00009C6.73488 19.2459 6.48052 19.1406 6.29299 18.9531C6.10545 18.7655 6.00009 18.5112 6.00009 18.2459Z"
                  stroke="#787880"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{likes}</span>
            </div>
            <div className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 19 19" className="mr-2">
                <path
                  d="M11 4.24609L18 11.2461L14 15.2461M1 18.2465L2.768 16.4785M2.828 16.4182C3.09062 16.6809 3.40241 16.8892 3.74558 17.0314C4.08874 17.1736 4.45655 17.2468 4.828 17.2468C5.19945 17.2468 5.56726 17.1736 5.91043 17.0314C6.25359 16.8892 6.56539 16.6809 6.828 16.4182L17.414 5.83217C17.5998 5.64644 17.7472 5.42592 17.8478 5.18322C17.9483 4.94052 18.0001 4.68038 18.0001 4.41767C18.0001 4.15495 17.9483 3.89482 17.8478 3.65211C17.7472 3.40941 17.5998 3.18889 17.414 3.00317L16.243 1.83217C16.0573 1.64636 15.8368 1.49897 15.5941 1.39841C15.3514 1.29785 15.0912 1.24609 14.8285 1.24609C14.5658 1.24609 14.3057 1.29785 14.0629 1.39841C13.8202 1.49897 13.5997 1.64636 13.414 1.83217L2.828 12.4182C2.56531 12.6808 2.35692 12.9926 2.21475 13.3357C2.07257 13.6789 1.9994 14.0467 1.9994 14.4182C1.9994 14.7896 2.07257 15.1574 2.21475 15.5006C2.35692 15.8438 2.56531 16.1556 2.828 16.4182Z"
                  stroke="#787880"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-gray-400 text-base">{time}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6 justify-start">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-[#78788066] text-white font-medium px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      {isMobile ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-2">
            {items
              .slice(
                activePage * ITEMS_PER_PAGE_SM,
                activePage * ITEMS_PER_PAGE_SM + ITEMS_PER_PAGE_SM
              )
              .map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group cursor-pointer"
                >
                  <div className="relative">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={180}
                      height={240}
                      className="w-full aspect-[3/4] object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-white text-sm mt-2 truncate group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                </a>
              ))}
          </div>
        </>
      ) : (
        <div
          className="hidden lg:flex gap-4 overflow-x-auto py-2 my-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="group cursor-pointer min-w-[180px] max-w-[220px]"
            >
              <div className="relative">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={180}
                  height={240}
                  className="w-full aspect-[3/4] object-cover rounded-lg transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-white text-sm mt-2 truncate group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomCollectionSection;
