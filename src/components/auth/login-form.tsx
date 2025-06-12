"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Custom
import { AuthInput } from "@/components/auth/auth-input";
import { Mail, Lock, Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Controlled input state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  // Basic email validation
  const isEmailValid =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length > 0;
  const emailError =
    touched.email && !isEmailValid ? "Введіть дійсний e-mail" : "";
  const passwordError =
    touched.password && !isPasswordValid ? "Введіть пароль" : "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (isEmailValid && isPasswordValid) {
      // submit logic here
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full md:max-w-lg items-center",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center w-[4.5rem] h-[4.5rem] md:w-[7.75rem] md:h-[7.75rem] bg-dark-blue mb-2">
        {/* You can keep or replace this icon as desired */}
        <Mail className="w-[4rem] h-[4rem] md:w-[7rem] md:h-[7rem] text-blue-950" />
      </div>
      <Card className="bg-transparent border-none w-full">
        <CardHeader>
          <CardTitle className="flex gap-4 items-center justify-center text-center text-white text-2xl md:text-4xl">
            <Image
              className="w-20"
              src="/auth/login-line.svg"
              alt="Logo"
              width={75}
              height={10}
              unoptimized
            />
            Вхід
            <Image
              className="rotate-180 w-20"
              src="/auth/login-line.svg"
              alt="Logo"
              width={75}
              height={10}
              unoptimized
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <AuthInput
                  icon={Mail}
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  required
                  aria-invalid={touched.email && !isEmailValid}
                />
                {emailError && (
                  <span className="text-red-500 text-xs pl-2">
                    {emailError}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <AuthInput
                  icon={Lock}
                  id="password"
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  required
                  aria-invalid={touched.password && !isPasswordValid}
                />
                {passwordError && (
                  <span className="text-red-500 text-xs pl-2">
                    {passwordError}
                  </span>
                )}
                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="data-[state=checked]:bg-blue w-5 h-5 border-blue"
                      id="rememberUser"
                    />
                    <Label className="font-sans text-white text-sm font-light">
                      Запам'ятати мене
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline font-sans bg-transparent text-white font-light"
                  >
                    Забули пароль?
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="sm"
                  className={cn(
                    "text-white hover:text-dark-white bg-blue hover:bg-dark-blue cursor-pointer font-semibold text-lg font-sans",
                    "rounded-[3.25rem]", // 52px / 16 = 3.25rem
                    "px-0 py-0", // override default padding
                    "w-[7.5rem] md:w-[8.5rem] h-[3.75rem]", // 136px = 8.5rem, 60px = 3.75rem
                    !isEmailValid || !isPasswordValid
                      ? "opacity-60 pointer-events-none"
                      : ""
                  )}
                  disabled={!isEmailValid || !isPasswordValid}
                >
                  Далі
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
          <Image
            className="rotate-180 w-full mt-4"
            src="/auth/separator-line.svg"
            alt="Logo"
            width={75}
            height={10}
            unoptimized
          />

          {/* The 4 extra elements you requested */}
          <div className="flex flex-col gap-6 mt-6 items-center">
            {/* 1. Registration row */}
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

            {/* 2. "Вхід за допомогою" */}
            <div className="text-white font-sans text-base md:text-lg text-center">
              Вхід за допомогою
            </div>

            {/* 3. Social icons row */}
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
        </CardContent>
      </Card>
    </div>
  );
}
