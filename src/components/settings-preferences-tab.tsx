import React from "react";
import SettingsSelect from "@/components/ui/settings-select";
import ToggleSwitch from "@/components/toggle-switch";

interface SettingsPreferencesTabProps {
  lang: string;
  setLang: (v: string) => void;
  audioLang: string;
  setAudioLang: (v: string) => void;
  subsLang: string;
  setSubsLang: (v: string) => void;
  showHiddenSubs: boolean;
  setShowHiddenSubs: (v: boolean) => void;
  contentRestriction: string;
  setContentRestriction: (v: string) => void;
  emailLang: string;
  setEmailLang: (v: string) => void;
  emailAll: boolean;
  setEmailAll: (v: boolean) => void;
  emailNews: boolean;
  setEmailNews: (v: boolean) => void;
  emailUpdates: boolean;
  setEmailUpdates: (v: boolean) => void;
}

const SettingsPreferencesTab: React.FC<SettingsPreferencesTabProps> = ({
  lang,
  setLang,
  audioLang,
  setAudioLang,
  subsLang,
  setSubsLang,
  showHiddenSubs,
  setShowHiddenSubs,
  contentRestriction,
  setContentRestriction,
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
    <div className="flex w-full flex-col gap-16 lg:flex-row">
      <section className="flex max-w-xl min-w-[320px] flex-1 flex-col gap-2">
        <h2 className="mb-2 text-2xl font-bold text-white">Уподобання</h2>
        <p className="mb-8 text-white">
          Вкажіть бажані налаштування мови та відео
        </p>
        <div className="flex flex-col gap-6">
          <SettingsSelect
            label="Мова"
            value={lang}
            onChange={setLang}
            options={[
              { value: "ua", label: "Українська" },
              { value: "en", label: "Англійська" },
            ]}
          />
          <SettingsSelect
            label="Мова аудіо"
            value={audioLang}
            onChange={setAudioLang}
            options={[
              { value: "ua", label: "Українська" },
              { value: "en", label: "Англійська" },
            ]}
          />
          <SettingsSelect
            label="Мова субтитрів"
            value={subsLang}
            onChange={setSubsLang}
            options={[
              { value: "ua", label: "Українська" },
              { value: "en", label: "Англійська" },
            ]}
          />
          <div className="mt-2 flex items-start gap-4">
            <ToggleSwitch
              checked={showHiddenSubs}
              onChange={setShowHiddenSubs}
            />
            <div className="flex flex-col">
              <span className="font-semibold text-white">
                Показати приховані субтитри
              </span>
              <span className="mt-2 text-sm leading-tight text-[#918C8C]">
                Увімкнувши це налаштування, ми автоматично показуватимемо
                приховані субтитри, коли вони доступні
              </span>
            </div>
          </div>
          <SettingsSelect
            label="Обмеження контенту"
            value={contentRestriction}
            onChange={setContentRestriction}
            options={[
              { value: "16+", label: "З 16 років і старше" },
              { value: "18+", label: "З 18 років і старше" },
              { value: "all", label: "Без обмежень" },
            ]}
          />
          <div className="mt-1 text-sm text-white">
            Ознайомтеся з нашим{" "}
            <a href="#" className="text-[#4B7FCC] underline underline-offset-2">
              FAQ щодо обмежень контенту
            </a>
            , щоб дізнатися більше про попередження
          </div>
        </div>
      </section>
      <section className="flex max-w-xl min-w-[320px] flex-1 flex-col gap-2">
        <h2 className="mb-2 text-2xl font-bold text-white">Email сповіщення</h2>
        <p className="mb-8 text-white">
          Виберіть, які сповіщення ви хочете отримувати на електронну пошту
        </p>
        <div className="flex flex-col gap-6">
          <SettingsSelect
            label="Мова спілкування в Email"
            value={emailLang}
            onChange={setEmailLang}
            options={[
              { value: "ua", label: "Українська" },
              { value: "en", label: "Англійська" },
            ]}
          />
          <div className="mt-2 flex items-center gap-4">
            <ToggleSwitch checked={emailAll} onChange={setEmailAll} />
            <span className="font-semibold text-white">Всі сповіщення</span>
          </div>
          <div className="mt-2 flex items-start gap-4">
            <ToggleSwitch checked={emailNews} onChange={setEmailNews} />
            <div className="flex flex-col">
              <span className="font-semibold text-white">Розсилка новин</span>
              <span className="mt-2 text-sm leading-tight text-[#918C8C]">
                Підпишіться на нашу розсилку і будьте в курсі останніх новин та
                пропозицій
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-start gap-4">
            <ToggleSwitch checked={emailUpdates} onChange={setEmailUpdates} />
            <div className="flex flex-col">
              <span className="font-semibold text-white">
                Новини та оновлення
              </span>
              <span className="mt-2 text-sm leading-tight text-[#918C8C]">
                Отримуйте новини про продукти, послуги та пропозиції партнерів
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPreferencesTab;
