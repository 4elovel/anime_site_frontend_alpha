"use client";

import { useState } from "react";
import ToggleSwitch from "@/components/toggle-switch";
import {
  SettingsIcon,
  ProfileSettingsIcon,
  SecuritySettingsIcon,
  ListSettingsIcon,
  PaymentSettingsIcon,
  NotificationSettingsIcon,
  CustomizationSettingsIcon,
} from "@/components/settings-icons";

const navItems = [
  { label: "Основні налаштування", icon: SettingsIcon },
  { label: "Профіль", icon: ProfileSettingsIcon },
  { label: "Безпека", icon: SecuritySettingsIcon },
  { label: "Список", icon: ListSettingsIcon },
  { label: "Платіжні дані", icon: PaymentSettingsIcon },
  { label: "Сповіщення", icon: NotificationSettingsIcon },
  { label: "Кастомізація", icon: CustomizationSettingsIcon },
];

const SettingsMenu = () => {
  // State for toggles and selects
  const [showHiddenSubs, setShowHiddenSubs] = useState(false);
  const [contentRestriction, setContentRestriction] = useState("16+");
  const [lang, setLang] = useState("ua");
  const [audioLang, setAudioLang] = useState("ua");
  const [subsLang, setSubsLang] = useState("ua");
  const [emailLang, setEmailLang] = useState("ua");
  const [emailAll, setEmailAll] = useState(true);
  const [emailNews, setEmailNews] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-transparent">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col pt-16 pl-14 pr-8 min-w-[270px] max-w-[320px]">
        <h1 className="font-sans font-bold text-3xl mb-10 text-white">
          Налаштування
        </h1>
        <nav className="flex flex-col gap-1">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, idx) => (
              <li
                key={item.label}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-white transition border ${
                  idx === 0
                    ? "border-[#49638A]" // active
                    : "border-transparent hover:bg-[#232b3a] cursor-pointer"
                }`}
              >
                <item.icon className="w-6 h-6" />
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row gap-16 px-4 md:px-8 pt-16 w-full justify-center">
        {/* Preferences */}
        <section className="flex-1 max-w-xl min-w-[320px] flex flex-col gap-2">
          <h2 className="text-2xl font-bold mb-2 text-white">Уподобання</h2>
          <p className="text-[#b0b0b0] mb-6">
            Вкажіть бажані налаштування мови та відео
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-white mb-1">Мова</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#49638A] rounded-none px-0 py-2 text-white focus:outline-none focus:ring-0 focus:border-blue-400 appearance-none"
              >
                <option value="ua">Українська</option>
                <option value="en">Англійська</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-1">Мова аудіо</label>
              <select
                value={audioLang}
                onChange={(e) => setAudioLang(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#49638A] rounded-none px-0 py-2 text-white focus:outline-none focus:ring-0 focus:border-blue-400 appearance-none"
              >
                <option value="ua">Українська</option>
                <option value="en">Англійська</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-1">Мова субтитрів</label>
              <select
                value={subsLang}
                onChange={(e) => setSubsLang(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#49638A] rounded-none px-0 py-2 text-white focus:outline-none focus:ring-0 focus:border-blue-400 appearance-none"
              >
                <option value="ua">Українська</option>
                <option value="en">Англійська</option>
              </select>
            </div>
            <div className="flex items-start gap-3 mt-2">
              <ToggleSwitch
                checked={showHiddenSubs}
                onChange={setShowHiddenSubs}
              />
              <div className="flex flex-col">
                <span className="text-white font-medium">
                  Показати приховані субтитри
                </span>
                <span className="text-xs text-[#b0b0b0] leading-tight mt-1">
                  Увімкнувши це налаштування, ми автоматично показуватимемо
                  приховані субтитри, коли вони доступні
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={contentRestriction === "16+"}
                onChange={() => setContentRestriction("16+")}
                className="accent-blue-500 w-4 h-4"
                id="age16"
              />
              <label htmlFor="age16" className="text-white text-base">
                З 16 років і старше
              </label>
            </div>
            <div className="mt-2 text-xs text-[#b0b0b0]">
              Ознайомтеся з нашим{" "}
              <a
                href="#"
                className="text-[#3A7AD9] underline underline-offset-2"
              >
                FAQ щодо обмежень контенту
              </a>
              , щоб дізнатися більше про попередження
            </div>
          </div>
        </section>
        {/* Email Notifications */}
        <section className="flex-1 max-w-xl min-w-[320px] flex flex-col gap-2">
          <h2 className="text-2xl font-bold mb-2 text-white">
            Email сповіщення
          </h2>
          <p className="text-[#b0b0b0] mb-6">
            Виберіть, які сповіщення ви хочете отримувати на електронну пошту
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-white mb-1">
                Мова спілкування в Email
              </label>
              <select
                value={emailLang}
                onChange={(e) => setEmailLang(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#49638A] rounded-none px-0 py-2 text-white focus:outline-none focus:ring-0 focus:border-blue-400 appearance-none"
              >
                <option value="ua">Українська</option>
                <option value="en">Англійська</option>
              </select>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <ToggleSwitch checked={emailAll} onChange={setEmailAll} />
              <span className="text-white font-medium">Всі сповіщення</span>
            </div>
            <div className="flex items-start gap-3 mt-2">
              <ToggleSwitch checked={emailNews} onChange={setEmailNews} />
              <div className="flex flex-col">
                <span className="text-white font-medium">Розсилка новин</span>
                <span className="text-xs text-[#b0b0b0] leading-tight mt-1">
                  Підпишіться на нашу розсилку і будьте в курсі останніх новин
                  та пропозицій
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-2">
              <ToggleSwitch checked={emailUpdates} onChange={setEmailUpdates} />
              <div className="flex flex-col">
                <span className="text-white font-medium">
                  Новини та оновлення
                </span>
                <span className="text-xs text-[#b0b0b0] leading-tight mt-1">
                  Отримуйте новини про продукти, послуги та пропозиції партнерів
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsMenu;
