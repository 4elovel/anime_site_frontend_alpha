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
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
        </span>
        <Input
          id={inputId}
          className="pl-13 py-6 border-blue rounded-[52px] h-13 font-[400] text-[24px]! placeholder:text-white"
          {...props}
        />
      </div>
    </div>
  );
}
