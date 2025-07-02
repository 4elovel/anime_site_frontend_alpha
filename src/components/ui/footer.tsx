import React from "react";
import {
  Youtube,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
} from "lucide-react";

const socialLinks = [
  {
    href: "#",
    icon: Youtube,
    label: "YouTube",
    text: "YouTube",
  },
  {
    href: "#",
    icon: Facebook,
    label: "Facebook",
    text: "Facebook",
  },
  {
    href: "#",
    icon: Instagram,
    label: "Instagram",
    text: "Instagram",
  },
  {
    href: "#",
    icon: MessageCircle,
    label: "Discord",
    text: "Discord",
  },
  {
    href: "#",
    icon: Send,
    label: "Telegram",
    text: "Telegram",
  },
];

export default function Footer() {
  return (
    <footer className="w-full text-white pt-16 pb-6 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Про сайт</h3>
            <ul className="space-y-2 text-gray-400 text-lg">
              <li><a href="#" className="hover:text-white">Про нас</a></li>
              <li><a href="#" className="hover:text-white">Служба підтримки</a></li>
              <li><a href="#" className="hover:text-white">Умови використання</a></li>
              <li><a href="#" className="hover:text-white">Політика конфіденційності</a></li>
              <li><a href="#" className="hover:text-white">Використання cookies</a></li>
              <li><a href="#" className="hover:text-white">Запити на співпрацю</a></li>
              <li><a href="#" className="hover:text-white">Кар'єра</a></li>
            </ul>
          </div>
          {/* Навігація */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Навігація</h3>
            <ul className="space-y-2 text-gray-400 text-lg">
              <li><a href="#" className="hover:text-white">Популярне</a></li>
              <li><a href="#" className="hover:text-white">Сезони</a></li>
              <li><a href="#" className="hover:text-white">Розклад релізів</a></li>
              <li><a href="#" className="hover:text-white">Новини</a></li>
            </ul>
          </div>
          {/* Зв'язатися з нами */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Зв'язатися з нами</h3>
            <ul className="space-y-2 text-gray-400 text-lg">
              {socialLinks.map((link) => (
                <li key={link.label} className="flex items-center gap-2">
                  <link.icon className="opacity-70" size={24} />
                  <a href={link.href} className="hover:text-white">{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Акаунт */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Акаунт</h3>
            <ul className="space-y-2 text-gray-400 text-lg">
              <li><a href="#" className="hover:text-white">Змінити профіль</a></li>
              <li><a href="#" className="hover:text-white">Дивитись пізніше</a></li>
              <li><a href="#" className="hover:text-white">Мої списки</a></li>
              <li><a href="#" className="hover:text-white">Історія переглядів</a></li>
              <li><a href="#" className="hover:text-white">Акаунт</a></li>
              <li><a href="#" className="hover:text-white">Вийти</a></li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-700 mb-4" />
        <div className="text-gray-400 text-base">© 2025 AniHub</div>
      </div>
    </footer>
  );
} 