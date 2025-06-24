import * as React from "react";

export function Popover({ open, onOpenChange, children }: any) {
  return <div>{children}</div>;
}

export function PopoverTrigger({ asChild, children }: any) {
  return <>{children}</>;
}

export function PopoverContent({ className = "", children }: any) {
  return <div className={className}>{children}</div>;
}
