"use client";

import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

export default function SuccessfulEmailVerificationMessage() {
  return (
    <div className={"flex gap-6 w-full md:max-w-lg items-center"}>
      <Card className="bg-transparent border-none w-full pt-0">
        <CardContent className="flex flex-col justify-center items-center text-center gap-8">
          <X className="w-24 h-24 border-3 rounded-full text-white mx-auto stroke-1" />
          <p className="text-white text-wrap text-2xl">
            Сталася <span className="text-blue">помилка</span>, спробуйте
            пізніше
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
