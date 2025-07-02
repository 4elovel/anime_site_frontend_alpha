import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LucideIcon } from "lucide-react";
import React from "react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label?: string;
}

export function AuthInput({ icon: Icon, label, id, ...props }: IconInputProps) {
  const inputId = id || props.name || "input";
  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </span>
        <Input
          id={inputId}
          className="pl-12 py-6 border-blue rounded-[52px] h-13 font-[400] text-[1rem] md:text-2xl! placeholder:text-white"
          {...props}
        />
      </div>
    </div>
  );
}
