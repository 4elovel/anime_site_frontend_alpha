import React, { useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import SettingsSelect2 from "@/components/ui/settings-select-2";
import CalendarIcon from "@/assets/calendar.svg";
import { Calendar } from "@/components/ui/calendar";
import BlueButton from "@/components/ui/blue-button";

interface SettingsProfileTabProps {
  username: string;
  setUsername: (v: string) => void;
  avatar: string;
  setAvatar: (v: string) => void;
  nickname: string;
  setNickname: (v: string) => void;
  about: string;
  setAbout: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  birthdate: string;
  setBirthdate: (v: string) => void;
  handleAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const genderOptions = [
  { value: "female", label: "Жіноча" },
  { value: "male", label: "Чоловіча" },
  { value: "other", label: "Інше" },
];

const SettingsProfileTab: React.FC<SettingsProfileTabProps> = ({
  username,
  setUsername,
  avatar,
  setAvatar,
  nickname,
  setNickname,
  about,
  setAbout,
  location,
  setLocation,
  birthdate,
  setBirthdate,
  handleAvatarUpload,
}) => {
  const [gender, setGender] = useState("female");
  const [cover, setCover] = useState<string | null>(null);
  const [birthdateError, setBirthdateError] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCover(url);
    }
  };

  // Validate birthdate: not in future, at least 10 years old
  const validateBirthdate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    if (date > now) return "Дата не може бути в майбутньому";
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 10);
    if (date > minDate) return "Вам має бути не менше 10 років";
    return "";
  };

  const handleBirthdateSelect = (date: Date | undefined) => {
    if (!date) return;
    const iso = date.toISOString().slice(0, 10);
    setBirthdate(iso);
    setBirthdateError(validateBirthdate(iso));
    setCalendarOpen(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-0 pt-8">
      <h2 className="text-2xl font-bold text-white mb-1">Профіль</h2>
      <p className="text-[#bfc6d5] mb-6 text-base">
        Налаштуйте вигляд та деталі свого профілю
      </p>
      <div className="mb-2">
        <div className="text-white text-base font-semibold mb-1">
          Зображення профілю
        </div>
        <div className="text-[#bfc6d5] text-sm mb-4">
          Рекомендований розмір обкладинки 1500 x 500, аватару 400 x 400
          <br />
          Максимальний розмір — 2 МБ, формат jpg, png, webp, aviff
        </div>
        <div className="relative w-full h-28 mb-8">
          <label
            htmlFor="cover-upload"
            className=" w-full h-full bg-[#23252a] rounded-xl flex items-center justify-center text-[#bfc6d5] text-base font-medium cursor-pointer border border-[#23252a] overflow-hidden relative"
          >
            {cover ? (
              <Image
                src={cover}
                alt="cover"
                fill
                className="object-cover w-full h-full absolute top-0 left-0 z-0 rounded-xl"
              />
            ) : null}
            <span className="relative z-10">
              Натисніть, щоб завантажити обкладинку
            </span>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverUpload}
            />
          </label>
          <div className="absolute left-8 -bottom-5 z-20">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-[#1a1a1a] border-4 border-[#23252a] shadow-lg">
                <Image
                  src={avatar}
                  alt="User avatar"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-[#4b7fcc] w-7 h-7 rounded-full flex items-center justify-center border-2 border-[#23252a]">
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer w-full h-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form className="w-full flex flex-col gap-4 mt-12">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="text-white text-base font-medium"
          >
            Нове ім'я користувача
          </label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-transparent border border-[#49638A] rounded-lg px-4 py-2 text-white text-base focus:border-blue-400 focus:ring-0 placeholder:text-[#bfc6d5]"
            placeholder="Введіть нове ім'я"
          />
          <BlueButton text="Зберегти" className="mt-2 w-32" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="about" className="text-white text-base font-medium">
            Опис
          </label>
          <textarea
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={3}
            className="bg-transparent h-28 border border-[#49638A] rounded-lg px-4 py-2 text-white text-base focus:border-blue-400 focus:outline-none focus:ring-0 placeholder:text-[#bfc6d5] resize-none"
            placeholder="Введіть опис"
          />
          <BlueButton text="Зберегти" className="mt-2 w-32" />
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-2">
            <label
              htmlFor="gender"
              className="text-white text-base font-medium"
            >
              Стать
            </label>
            <div className="relative text-white">
              <SettingsSelect2
                label=""
                value={gender}
                onChange={setGender}
                options={genderOptions}
                placeholder="Оберіть стать"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label
              htmlFor="birthdate"
              className="text-white text-base font-medium"
            >
              Дата народження
            </label>
            <div className="relative">
              <Input
                id="birthdate"
                type="text"
                value={
                  birthdate ? new Date(birthdate).toLocaleDateString() : ""
                }
                readOnly
                className={`bg-transparent border border-[#49638A] rounded-lg px-4 py-2 text-white text-base focus:border-blue-400 focus:ring-0 placeholder:text-[#bfc6d5] pr-12 ${
                  birthdateError ? "border-red-500" : ""
                }`}
                placeholder="ДД. ММ. РРРР"
                aria-invalid={!!birthdateError}
                onClick={() => setCalendarOpen(true)}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#bfc6d5] p-0 m-0 bg-transparent border-0 cursor-pointer"
                tabIndex={-1}
                onClick={() => setCalendarOpen((v) => !v)}
                aria-label="Вибрати дату"
                style={{ lineHeight: 0 }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M8 7V3M16 7V3M3 11H21M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                    stroke="#bfc6d5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {calendarOpen && (
                <div className="absolute z-30 right-0 bottom-full mb-2">
                  <Calendar
                    mode="single"
                    selected={birthdate ? new Date(birthdate) : undefined}
                    onSelect={handleBirthdateSelect}
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    onDayClick={() => setCalendarOpen(false)}
                    captionLayout="dropdown"
                    className="rounded-lg border border-[#49638A] shadow-sm text-white bg-black"
                  />
                </div>
              )}
              {birthdateError && (
                <span className="absolute left-0 -bottom-6 text-red-500 text-xs">
                  {birthdateError}
                </span>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsProfileTab;
