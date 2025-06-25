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
import SettingsSecurityTab from "@/components/settings-security-tab";
import SettingsNotificationsTab from "./settings-notifications-tab";

/*
список дивно зроблений в дизайні
платіжні дані не зроблені в дизайні
кастомізацію не робив бо не думаю що встигнемо зміну теми та локалізацію.
*/
const navItems = [
  { label: "Основні налаштування", icon: SettingsIcon },
  { label: "Профіль", icon: ProfileSettingsIcon },
  { label: "Безпека", icon: SecuritySettingsIcon },
  // { label: "Список", icon: ListSettingsIcon },
  // { label: "Платіжні дані", icon: PaymentSettingsIcon },
  { label: "Сповіщення", icon: NotificationSettingsIcon },
  // { label: "Кастомізація", icon: CustomizationSettingsIcon },
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

  // Security tab state
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Notification toggles state
  const [commentReply, setCommentReply] = useState(true);
  const [commentMention, setCommentMention] = useState(true);
  const [commentInCollection, setCommentInCollection] = useState(true);
  const [commentInEdit, setCommentInEdit] = useState(true);
  const [commentRating, setCommentRating] = useState(true);
  const [collectionRating, setCollectionRating] = useState(true);
  const [editAccepted, setEditAccepted] = useState(true);
  const [editRejected, setEditRejected] = useState(true);
  const [animeUpdate, setAnimeUpdate] = useState(true);
  const [myAnime, setMyAnime] = useState(true);
  const [userFollow, setUserFollow] = useState(true);
  const [system, setSystem] = useState(true);

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
            emailLang={emailLang}
            setEmailLang={setEmailLang}
            emailAll={emailAll}
            setEmailAll={setEmailAll}
            emailNews={emailNews}
            setEmailNews={setEmailNews}
            emailUpdates={emailUpdates}
            setEmailUpdates={setEmailUpdates}
          />
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
        {activeTab === 2 && (
          <SettingsSecurityTab
            email={email}
            setEmail={setEmail}
            emailConfirm={emailConfirm}
            setEmailConfirm={setEmailConfirm}
            password={password}
            setPassword={setPassword}
            passwordConfirm={passwordConfirm}
            setPasswordConfirm={setPasswordConfirm}
          />
        )}
        {activeTab === 3 && (//насправді 5
          <SettingsNotificationsTab
            commentReply={commentReply}
            setCommentReply={setCommentReply}
            commentMention={commentMention}
            setCommentMention={setCommentMention}
            commentInCollection={commentInCollection}
            setCommentInCollection={setCommentInCollection}
            commentInEdit={commentInEdit}
            setCommentInEdit={setCommentInEdit}
            commentRating={commentRating}
            setCommentRating={setCommentRating}
            collectionRating={collectionRating}
            setCollectionRating={setCollectionRating}
            editAccepted={editAccepted}
            setEditAccepted={setEditAccepted}
            editRejected={editRejected}
            setEditRejected={setEditRejected}
            animeUpdate={animeUpdate}
            setAnimeUpdate={setAnimeUpdate}
            myAnime={myAnime}
            setMyAnime={setMyAnime}
            userFollow={userFollow}
            setUserFollow={setUserFollow}
            system={system}
            setSystem={setSystem}
          />
        )}
        {activeTab !== 0 &&
          activeTab !== 1 &&
          activeTab !== 2 &&
          activeTab !== 3 &&  //насправді 5
          (
            <section className="flex-1 flex items-center justify-center text-white text-2xl font-bold">
              {navItems[activeTab]?.label || "Розділ"}
            </section>
          )}
      </main>
    </div>
  );
};

export default SettingsMenu;
