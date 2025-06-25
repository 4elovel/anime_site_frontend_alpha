import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Settings } from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    image: "/assets/profile/mock-history-anime-card.png",
    icon: "🎬",
    title: "Новий епізод!",
    subtitle: "«Demon Slayer» — S3E5",
    time: "5 хв тому",
    unread: true,
  },
  {
    id: 2,
    image: "/assets/profile/mock-history-anime-card2.png",
    icon: "🔥",
    title: "Популярне аніме — в топі тижня!",
    subtitle: "«Війни сакури» топ-1 серед користувачів цього тижня",
    time: "7 хв тому",
    unread: true,
  },
  {
    id: 3,
    image: "/assets/profile/mock-history-anime-card.png",
    icon: "📢",
    title: "Прем'єра сезону!",
    subtitle: "«Bleach: TYBW» — 1 серія нового арку!",
    time: "10 хв тому",
    unread: true,
  },
  {
    id: 4,
    image: "/assets/profile/mock-history-anime-card.png",
    icon: "📢",
    title: "Прем'єра сезону!",
    subtitle: "«Bleach: TYBW» — 1 серія нового арку!",
    time: "10 хв тому",
    unread: true,
  },
  {
    id: 5,
    image: "/assets/profile/mock-history-anime-card.png",
    icon: "📢",
    title: "Прем'єра сезону!",
    subtitle: "«Bleach: TYBW» — 1 серія нового арку!",
    time: "10 хв тому",
    unread: true,
  },
  {
    id: 6,
    image: "/assets/profile/mock-history-anime-card.png",
    icon: "📢",
    title: "Прем'єра сезону!",
    subtitle: "«Bleach: TYBW» — 1 серія нового арку!",
    time: "10 хв тому",
    unread: true,
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

const NotificationModal: React.FC<Props> = ({ open, onClose, anchorRef }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] =
    React.useState(initialNotifications);

  const [pos, setPos] = React.useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    function updatePos() {
      if (open && anchorRef.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        setPos({
          top: rect.bottom + 10,
          left: rect.right - 380,
        });
      }
    }
    updatePos();
    if (open) {
      window.addEventListener("scroll", updatePos);
      window.addEventListener("resize", updatePos);
    }
    return () => {
      window.removeEventListener("scroll", updatePos);
      window.removeEventListener("resize", updatePos);
    };
  }, [open, anchorRef]);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose, anchorRef]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            zIndex: 1000,
            width: 380,
          }}
          className="bg-[#18181B] border border-[#787880] rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-[#787880] rounded-t-2xl">
            <span className="text-white text-xl font-semibold">Сповіщення</span>
            <button className="p-2 rounded-full hover:bg-[#23232A] transition">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="px-4 py-2">
            <button
              className="text-[#A1A1AA] text-sm font-medium hover:text-white transition"
              onClick={markAllRead}
            >
              Позначити всі як прочитані
            </button>
          </div>

          <div className="px-4 max-h-[240px] overflow-y-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
            >
              {notifications.slice(0, 3).map((n) => (
                <motion.div
                  key={n.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="flex items-center gap-4 rounded-2xl px-4 py-3 mb-3 bg-transparent transition-colors cursor-pointer hover:bg-[#23232A]"
                  onClick={() =>
                    setNotifications((prev) =>
                      prev.map((item) =>
                        item.id === n.id ? { ...item, unread: false } : item
                      )
                    )
                  }
                >
                  <Image
                    src={n.image}
                    alt={n.title}
                    width={60}
                    height={60}
                    className="rounded-xl object-cover w-[60px] h-[60px]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ fontSize: 22 }}>
                        {n.icon}
                      </span>
                      <span className="text-white font-semibold text-sm">
                        {n.title}
                      </span>
                    </div>
                    <div className="text-[#A1A1AA] text-sm truncate">
                      {n.subtitle}
                    </div>
                    <div className="text-[#787880] text-sm mt-1">{n.time}</div>
                  </div>
                  {n.unread && (
                    <span className="w-3 h-3 bg-[#4B7FCC] rounded-full ml-2" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
