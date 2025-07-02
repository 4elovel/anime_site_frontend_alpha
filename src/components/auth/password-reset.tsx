"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useState } from "react";

import { AuthHeader } from "@/components/auth/auth-header";
import { AuthInput } from "@/components/auth/auth-input";
import { useAuth } from "@/contexts/auth-context";

import { Button } from "@/components/ui/button";

export default function PasswordResetForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const { login, loading, error } = useAuth();

  const isEmailValid =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailError =
    touched.email && !isEmailValid ? "Введіть дійсний e-mail" : "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (isEmailValid) {
      await login(email, password);
      // Optionally redirect or show success
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
      <Card className="bg-transparent border-none w-full pt-0">
        <AuthHeader title="Відновити пароль" />
        <div
          style={{ margin: "0 auto", width: "75%" }}
          className="text-center text-white mx-auto max-w-full break-words"
        >
          <span className="block w-full whitespace-pre-line">
            На ваш <span className="text-blue-500">E-mail</span> буде
            відправлена посилання для відновлення паролю
          </span>
        </div>
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
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="sm"
                  className={cn(
                    "text-white hover:text-dark-white bg-blue hover:bg-dark-blue cursor-pointer font-semibold text-lg font-sans",
                    "rounded-[3.25rem]",
                    "px-0 py-0",
                    "w-[8.5rem] md:w-[8.5rem] h-[3.75rem]",
                    !isEmailValid ? "opacity-60 pointer-events-none" : ""
                  )}
                  disabled={loading || !isEmailValid}
                >
                  {loading ? "Вхід..." : "Надіслати"}
                </Button>
              </div>
              {/* <AuthFooter /> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
