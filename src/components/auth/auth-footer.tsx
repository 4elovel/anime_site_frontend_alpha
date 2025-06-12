// basic ts component for the auth header
import React from 'react';
import Image from "next/image";
import { Send } from "lucide-react";

export function AuthFooter() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full mt-4">
          <Image
            className="rotate-180 w-full"
            src="/auth/separator-line.svg"
            alt="Logo"
            width={75}
            height={10}
            unoptimized
          />

          <div className="flex flex-col gap-6 mt-6 items-center">
            <div className="flex flex-row items-center gap-2">
              <span className="text-dark-blue font-sans text-base md:text-lg">
                Немає аккаунту ?
              </span>
              <a
                href="#"
                className="text-white font-sans text-base md:text-lg underline underline-offset-4"
              >
                Реєстрація
              </a>
            </div>

            <div className="text-white font-sans text-base md:text-lg text-center">
              Вхід за допомогою
            </div>

            <div className="flex flex-row items-center gap-[3rem]">
              <a href="#" aria-label="Discord">
                <span className="flex items-center justify-center w-[3rem] h-[3rem] rounded-full bg-blue">
                  <Send className="w-6 h-6 text-white" />
                </span>
              </a>
              <a href="#" aria-label="Google">
                <span className="flex items-center justify-center w-[3rem] h-[3rem] rounded-full bg-blue">
                  <Send className="w-6 h-6 text-white" />
                </span>
              </a>
              <a href="#" aria-label="Telegram">
                <span className="flex items-center justify-center w-[3rem] h-[3rem] rounded-full bg-blue">
                  <Send className="w-6 h-6 text-white" />
                </span>
              </a>
            </div>
          </div>
          </div>
  );
}