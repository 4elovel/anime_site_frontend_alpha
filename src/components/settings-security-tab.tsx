import React from "react";
import BlueButton from "@/components/ui/blue-button";
import { Input } from "@/components/ui/input";

interface SettingsSecurityTabProps {
  email: string;
  setEmail: (v: string) => void;
  emailConfirm: string;
  setEmailConfirm: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (v: string) => void;
}

const SettingsSecurityTab: React.FC<SettingsSecurityTabProps> = ({
  email,
  setEmail,
  emailConfirm,
  setEmailConfirm,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-0 pt-8">
      <h2 className="text-2xl font-bold text-white mb-1">Безпека</h2>
      <p className="text-white mb-6 text-base">
        Захистіть свій обліковий запис: змініть пароль чи email
      </p>
      <div className="mb-8">
        <h3 className="text-white text-lg font-semibold mb-2">
          Поштова адреса
        </h3>
        <form className="flex flex-col gap-2">
          <label
            htmlFor="new-email"
            className="text-white text-base font-medium"
          >
            Новий email
          </label>
          <Input
            id="new-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border border-[#49638A] rounded-lg px-4 py-2 text-white text-base focus:border-blue-400 focus:ring-0 placeholder:text-[#bfc6d5]"
            placeholder="Введіть новий email"
          />
          <label
            htmlFor="confirm-email"
            className="text-white text-base font-medium"
          >
            Підтвердити email
          </label>
          <Input
            id="confirm-email"
            type="email"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
            className="bg-transparent border border-[#49638A] rounded-lg px-4 py-2 text-white text-base focus:border-blue-400 focus:ring-0 placeholder:text-[#bfc6d5]"
            placeholder="Підтвердити новий email"
          />
          <BlueButton text="Зберегти" className="mt-2 w-32" />
        </form>
      </div>
      <div>
        <h3 className="text-white text-lg font-semibold mb-2">Пароль</h3>
        <form className="flex flex-col gap-2">
          <label
            htmlFor="new-password"
            className="text-white text-base font-medium"
          >
            Новий пароль
          </label>
          <Input
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border border-[#49638A] rounded-lg px-4 py-2 text-white text-base focus:border-blue-400 focus:ring-0 placeholder:text-[#bfc6d5]"
            placeholder="Введіть новий пароль"
          />
          <label
            htmlFor="confirm-password"
            className="text-white text-base font-medium"
          >
            Підтвердити email
          </label>
          <Input
            id="confirm-password"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="bg-transparent border border-[#49638A] rounded-lg px-4 py-2 text-white text-base focus:border-blue-400 focus:ring-0 placeholder:text-[#bfc6d5]"
            placeholder="Підтвердити новий пароль"
          />
          <BlueButton text="Зберегти" className="mt-2 w-32" />
        </form>
      </div>
    </div>
  );
};

export default SettingsSecurityTab;
