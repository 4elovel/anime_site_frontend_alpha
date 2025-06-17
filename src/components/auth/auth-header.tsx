// basic ts component for the auth header
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function AuthHeader( { title }: { title?: string }) {

  return (
    <CardHeader>
      <CardTitle className="flex gap-4 items-center justify-center text-center text-white text-2xl md:text-4xl">
        <Image
          className="w-20"
          src="/assets/auth/login-line.svg"
          alt="Logo"
          width={75}
          height={10}
          unoptimized
        />
        {title}
        <Image
          className="rotate-180 w-20"
          src="/assets/auth/login-line.svg"
          alt="Logo"
          width={75}
          height={10}
          unoptimized
        />
      </CardTitle>
    </CardHeader>
  );
}
