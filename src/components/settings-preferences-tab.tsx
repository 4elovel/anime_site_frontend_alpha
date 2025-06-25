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
}) => {
  return (
    <section className="flex-1 max-w-xl min-w-[320px] flex flex-col gap-2">
      <h2 className="text-2xl font-bold mb-2 text-white">Уподобання</h2>
      <p className="text-white mb-8">
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
        <div className="flex items-start gap-4 mt-2">
          <ToggleSwitch checked={showHiddenSubs} onChange={setShowHiddenSubs} />
          <div className="flex flex-col">
            <span className="text-white font-semibold">
              Показати приховані субтитри
            </span>
            <span className="text-sm text-[#918C8C] leading-tight mt-2">
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
  );
};

export default SettingsPreferencesTab;
