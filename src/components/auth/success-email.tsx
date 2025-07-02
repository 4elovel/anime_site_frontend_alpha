"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function SuccessfulEmailVerificationMessage() {
  // replace with actual logic to get the email!!!
  const email = "example@gmail.com";

  return (
    <div className={"flex gap-6 w-full md:max-w-lg items-center"}>
      <Card className="bg-transparent border-none w-full pt-0">
        <CardContent className="flex flex-col justify-center items-center text-center gap-8">
          <Check className="w-24 h-24 border-3 rounded-full text-white mx-auto stroke-1" />
          <p className="text-white text-wrap text-2xl">
            Пошта <span className="text-blue">{email}</span> була успішно
            підтверджена
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
