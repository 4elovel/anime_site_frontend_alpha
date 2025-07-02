// basic ts component for the auth header
import React from "react";
import Image from "next/image";

export function AuthFooter({
  showRegister = true,
}: {
  showRegister?: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full mt-4">
      <Image
        className="rotate-180 w-full"
        src="/assets/auth/separator-line.svg"
        alt="Logo"
        width={75}
        height={10}
        unoptimized
      />

      <div className="flex flex-col gap-6 mt-6 items-center">
        {showRegister && (
          <div className="flex flex-row items-center gap-2">
            <span className="text-blue font-sans text-base md:text-lg">
              Немає аккаунту ?
            </span>
            <a
              href="#"
              className="text-white font-sans text-base md:text-lg underline underline-offset-4"
            >
              Реєстрація
            </a>
          </div>
        )}

        <div className="text-white font-sans text-base md:text-lg text-center">
          Вхід за допомогою
        </div>

        <div className="flex flex-row items-center gap-[3rem]">
          <a href="#" aria-label="Discord">
            <span className="flex items-center justify-center w-[3rem] h-[3rem] md:w-18 md:h-18 rounded-full bg-blue hover:bg-dark-blue hover:cursor-pointer">
              <Image
                className="w-6 h-6 md:w-13 md:h-13 text-white bg-transparent rounded-full"
                src="/assets/auth/discord.svg"
                alt="Logo"
                width={24}
                height={24}
                unoptimized
              />
            </span>
          </a>
          <a href="#" aria-label="Google">
            <span className="flex items-center justify-center w-[3rem] h-[3rem] md:w-18 md:h-18 rounded-full bg-blue hover:bg-dark-blue hover:cursor-pointer">
              <Image
                className="w-6 h-6 md:w-13 md:h-13 text-white bg-transparent rounded-full"
                src="/assets/auth/google.svg"
                alt="Logo"
                width={24}
                height={24}
                unoptimized
              />
            </span>
          </a>
          <a href="#" aria-label="Telegram">
            <span className="flex items-center justify-center w-[3rem] h-[3rem] md:w-18 md:h-18 rounded-full bg-blue hover:bg-dark-blue hover:cursor-pointer">
              <Image
                className="w-6 h-[1.8rem] md:w-13 md:h-15 text-white bg-transparent rounded-full"
                src="/assets/auth/telegram.svg"
                alt="Logo"
                width={24}
                height={24}
                unoptimized
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
