// basic component for auth form
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuthInput } from "@/components/auth/auth-input";
import { Mail, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function AuthForm({}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const isEmailValid =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length > 0;
  const emailError =
    touched.email && !isEmailValid ? "Введіть дійсний e-mail" : "";
  const passwordError =
    touched.password && !isPasswordValid ? "Введіть пароль" : "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (isEmailValid && isPasswordValid) {
      const success = await login(email, password);
      if (success) {
        router.push("/");
      }
    }
  }

  return (
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
            <span className="text-red-500 text-xs pl-2">{emailError}</span>
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
            <span className="text-red-500 text-xs pl-2">{passwordError}</span>
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
            disabled={loading || !isEmailValid || !isPasswordValid}
          >
            {loading ? "Вхід..." : "Далі"}
          </Button>
        </div>
        {error && <span className="text-red-500 text-xs pl-2">{error}</span>}
      </div>
    </form>
  );
}
