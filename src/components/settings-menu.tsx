"use client";

import { useState } from "react";
import Image from "next/image";
import ToggleSwitch from "@/components/toggle-switch";
import SettingsSidebar from "@/components/settings-sidebar";
import {
  SettingsIcon,
  ProfileSettingsIcon,
  SecuritySettingsIcon,
  ListSettingsIcon,
  PaymentSettingsIcon,
  NotificationSettingsIcon,
  CustomizationSettingsIcon,
} from "@/components/settings-icons";
import SettingsSelect from "@/components/ui/settings-select";
import { Input } from "@/components/ui/input";
import StandartButtonIcon from "@/components/ui/standart-button-icon";
import SettingsProfileTab from "@/components/settings-profile-tab";
import SettingsPreferencesTab from "@/components/settings-preferences-tab";
import SettingsNotificationsTab from "@/components/settings-notifications-tab";

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
  const [activeTab, setActiveTab] = useState(0);

  // Profile settings state
  const [username, setUsername] = useState("AnimeUser");
  const [avatar, setAvatar] = useState("/assets/mock-user-logo.png");
  const [nickname, setNickname] = useState("NickName");
  const [about, setAbout] = useState(
    "Аніме — це особлива форма мистецтва з Японії, яка поєднує в собі барвисту анімацію, фантастичні сюжети та глибоких персонажів."
  );
  const [location, setLocation] = useState("Україна");
  const [birthdate, setBirthdate] = useState("2000-01-01");

  // Function to handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server here
      // For now, just create a temporary URL
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-transparent">
      {/* Sidebar */}
      <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row gap-16 px-4 md:px-8 pt-6 lg:pt-12 pb-16 w-full">
        {activeTab === 0 && (
          <div className="flex flex-col lg:flex-row gap-16 w-full">
            <SettingsPreferencesTab
              lang={lang}
              setLang={setLang}
              audioLang={audioLang}
              setAudioLang={setAudioLang}
              subsLang={subsLang}
              setSubsLang={setSubsLang}
              showHiddenSubs={showHiddenSubs}
              setShowHiddenSubs={setShowHiddenSubs}
              contentRestriction={contentRestriction}
              setContentRestriction={setContentRestriction}
            />
            <SettingsNotificationsTab
              emailLang={emailLang}
              setEmailLang={setEmailLang}
              emailAll={emailAll}
              setEmailAll={setEmailAll}
              emailNews={emailNews}
              setEmailNews={setEmailNews}
              emailUpdates={emailUpdates}
              setEmailUpdates={setEmailUpdates}
            />
          </div>
        )}
        {activeTab === 1 && (
          <SettingsProfileTab
            username={username}
            setUsername={setUsername}
            avatar={avatar}
            setAvatar={setAvatar}
            nickname={nickname}
            setNickname={setNickname}
            about={about}
            setAbout={setAbout}
            location={location}
            setLocation={setLocation}
            birthdate={birthdate}
            setBirthdate={setBirthdate}
            handleAvatarUpload={handleAvatarUpload}
          />
        )}
        {activeTab !== 0 && activeTab !== 1 && (
          <section className="flex-1 flex items-center justify-center text-white text-2xl font-bold">
            {navItems[activeTab]?.label || "Розділ"}
          </section>
        )}
      </main>
    </div>
  );
};

export default SettingsMenu;
