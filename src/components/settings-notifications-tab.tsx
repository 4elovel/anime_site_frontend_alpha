import React from "react";
import SettingsSelect from "@/components/ui/settings-select";
import ToggleSwitch from "@/components/toggle-switch";

interface SettingsNotificationsTabProps {
  emailLang: string;
  setEmailLang: (v: string) => void;
  emailAll: boolean;
  setEmailAll: (v: boolean) => void;
  emailNews: boolean;
  setEmailNews: (v: boolean) => void;
  emailUpdates: boolean;
  setEmailUpdates: (v: boolean) => void;
}

const SettingsNotificationsTab: React.FC<SettingsNotificationsTabProps> = ({
  emailLang,
  setEmailLang,
  emailAll,
  setEmailAll,
  emailNews,
  setEmailNews,
  emailUpdates,
  setEmailUpdates,
}) => {
  return (
    <section className="flex-1 max-w-xl min-w-[320px] flex flex-col gap-2">
      <h2 className="text-2xl font-bold mb-2 text-white">Email сповіщення</h2>
      <p className="text-white mb-8">
        Виберіть, які сповіщення ви хочете отримувати на електронну пошту
      </p>
      <div className="flex flex-col gap-6">
        <SettingsSelect
          label="Мова спілкування в Email"
          value={emailLang}
          onChange={(e) => setEmailLang(e.target.value)}
          options={[
            { value: "ua", label: "Українська" },
            { value: "en", label: "Англійська" },
          ]}
        />
        <div className="flex items-center gap-4 mt-2">
          <ToggleSwitch checked={emailAll} onChange={setEmailAll} />
          <span className="text-white font-semibold">Всі сповіщення</span>
        </div>
        <div className="flex items-start gap-4 mt-2">
          <ToggleSwitch checked={emailNews} onChange={setEmailNews} />
          <div className="flex flex-col">
            <span className="text-white font-semibold">Розсилка новин</span>
            <span className="text-sm text-[#918C8C] leading-tight mt-2">
              Підпишіться на нашу розсилку і будьте в курсі останніх новин та пропозицій
            </span>
          </div>
        </div>
        <div className="flex items-start gap-4 mt-2">
          <ToggleSwitch checked={emailUpdates} onChange={setEmailUpdates} />
          <div className="flex flex-col">
            <span className="text-white font-semibold">Новини та оновлення</span>
            <span className="text-sm text-[#918C8C] leading-tight mt-2">
              Отримуйте новини про продукти, послуги та пропозиції партнерів
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsNotificationsTab;
