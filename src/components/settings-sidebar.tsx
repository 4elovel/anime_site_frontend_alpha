"use client";
import React, { useState } from "react";
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
  // { label: "Список", icon: ListSettingsIcon },
  // { label: "Платіжні дані", icon: PaymentSettingsIcon },
  { label: "Сповіщення", icon: NotificationSettingsIcon },
  // { label: "Кастомізація", icon: CustomizationSettingsIcon },
];

interface SettingsSidebarProps {
  activeTab: number;
  onTabChange: (idx: number) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar - hidden on mobile, shown on large screens */}
      <aside className="hidden lg:flex flex-col pt-20 pl-16 pr-10 min-w-[270px] max-w-[320px]">
        <h1 className="font-sans font-bold text-3xl mb-12 text-white">
          Налаштування
        </h1>
        <nav className="flex flex-col gap-2">
          <ul className="flex flex-col gap-2">
            {navItems.map((item, idx) => (
              <li
                key={item.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-white transition ${
                  idx === activeTab
                    ? "border-[#49638A]/70 bg-[#1a2332] border"
                    : "border-transparent hover:bg-[#232b3a] cursor-pointer"
                }`}
                onClick={() => onTabChange(idx)}
                style={{ userSelect: "none" }}
              >
                <item.icon className="w-6 h-6" />
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile navigation - shown on small screens, hidden on large screens */}
      <div className="lg:hidden w-full fixed top-0 left-0 z-20 bg-[#101218] border-b border-[#49638A]/30">
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-sans font-bold text-2xl text-white">
              Налаштування
            </h1>
            <button
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                // X icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                // Menu icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile navigation icons - always visible */}
          <div className="flex overflow-x-auto scrollbar-hide py-4 gap-4">
            {navItems.map((item, idx) => (
              <div
                key={item.label}
                className={`flex flex-col items-center justify-center p-2 min-w-[70px] rounded-lg cursor-pointer transition ${
                  idx === activeTab
                    ? "bg-[#1a2332] border border-[#49638A]/70"
                    : "bg-transparent"
                }`}
                onClick={() => {
                  onTabChange(idx);
                  setMobileMenuOpen(false);
                }}
              >
                <item.icon className="w-7 h-7 text-white mb-1" />
                <span className="text-white text-xs text-center">
                  {item.label.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable menu for mobile */}
        {mobileMenuOpen && (
          <div className="bg-[#101218] border-t border-[#49638A]/30 p-4 shadow-lg">
            <ul className="flex flex-col gap-2">
              {navItems.map((item, idx) => (
                <li
                  key={item.label}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-white transition ${
                    idx === activeTab
                      ? "border-[#49638A]/70 bg-[#1a2332] border"
                      : "border-transparent hover:bg-[#232b3a]"
                  }`}
                  onClick={() => {
                    onTabChange(idx);
                    setMobileMenuOpen(false);
                  }}
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Spacer to compensate for fixed header on mobile */}
      <div className="lg:hidden h-32"></div>
    </>
  );
};

export default SettingsSidebar;
