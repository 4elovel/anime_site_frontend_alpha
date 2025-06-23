"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Custom
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFooter } from "@/components/auth/auth-footer";
import { Mail, Lock, Send } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full md:max-w-lg items-center",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center w-[4.5rem] h-[4.5rem] md:w-[7.75rem] md:h-[7.75rem] bg-dark-blue">
        <Mail className="w-[4rem] h-[4rem] md:w-[7rem] md:h-[7rem] text-blue-950" />
      </div>
      <Card className="bg-transparent border-none w-full pt-0">
        <AuthHeader />
        <CardContent className="p-3">
          <AuthForm />
          <AuthFooter />
        </CardContent>
      </Card>
    </div>
  );
}
