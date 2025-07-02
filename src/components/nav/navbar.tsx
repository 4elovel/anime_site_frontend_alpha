"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Breadcrumbs, { BreadcrumbItem } from "@/components/nav/breadcrumbs";
import Image from "next/image";
import { LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

import UserProfilePopover from "@/components/nav/user-profile-popover";
import SearchModal from "./SearchModal";
import NotificationModal from "./NotificationModal";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const notifBtnRef = React.useRef<HTMLButtonElement>(null);
  const { user } = useAuth();
  const router = useRouter();

  if (!pathname) return null;

  // Динамічний ланцюжок для прикладу (можна замінити на реальні дані)
  let breadcrumbs: BreadcrumbItem[] = [];
  if (pathname !== "/") {
    breadcrumbs = [
      {
        label: "Аніме",
        href: "/anime",
        icon: <LayoutGrid className="h-5 w-5 text-[#4B7FCC]" />,
      },
    ];
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "anime" && parts[1]) {
      breadcrumbs.push({ label: decodeURIComponent(parts[1]), isActive: true });
    }
  }

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="z-9999 flex w-full items-center justify-between bg-transparent px-8 py-4"
      style={{ minHeight: 0 }}
    >
      {pathname === "/" ? (
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Логотип"
            width={256}
            height={256}
            className="h-18 w-18 object-contain"
          />
        </Link>
      ) : (
        <Breadcrumbs items={isMobile ? breadcrumbs.slice(0, 1) : breadcrumbs} />
      )}

      <div className="xs:gap-2 flex items-center gap-6 sm:gap-4">
        {!user ? (
          <>
            <button
              className="rounded-xl border border-[#5B7CB2] bg-transparent px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-[#232b45]"
              onClick={() => router.push("/signin")}
            >
              Увійти
            </button>
            <button
              className="rounded-xl bg-[#4B7FCC] px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-[#3a65b2]"
              onClick={() => router.push("/signup")}
            >
              Реєстрація
            </button>
          </>
        ) : (
          <>
            <div
              className="hidden w-72 max-w-xs cursor-pointer items-center rounded-xl border border-[#5B7CB2] px-4 py-2 md:flex"
              onClick={() => setSearchOpen(true)}
            >
              <svg
                className="mr-2 h-5 w-5 text-white"
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
                className="w-full cursor-pointer bg-transparent text-white placeholder-gray-400 outline-none"
                readOnly
              />
            </div>

            <button
              className="xs:w-8 xs:h-8 flex h-12 w-12 items-center justify-center rounded-xl border border-[#5B7CB2] bg-transparent p-0 transition hover:bg-[#2C3650] sm:h-10 sm:w-10 md:hidden"
              onClick={() => setSearchOpen(true)}
            >
              <svg
                className="xs:w-4 xs:h-4 h-5 w-5 text-white sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              ref={notifBtnRef}
              className={`xs:w-8 xs:h-8 flex h-12 w-12 items-center justify-center rounded-xl border border-[#5B7CB2] bg-transparent p-0 transition sm:h-10 sm:w-10 ${
                notifOpen ? "bg-[#2C3650]" : "hover:bg-[#2C3650]"
              }`}
              onClick={() => setNotifOpen((v) => !v)}
            >
              <svg
                className="xs:w-4 xs:h-4 h-5 w-5 text-white sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <UserProfilePopover
              isSignedIn={true}
              username={user?.name || user?.email || "User"}
            />
            <SearchModal
              open={searchOpen}
              onClose={() => setSearchOpen(false)}
            />
            <NotificationModal
              open={notifOpen}
              onClose={() => setNotifOpen(false)}
              anchorRef={notifBtnRef}
            />
          </>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
