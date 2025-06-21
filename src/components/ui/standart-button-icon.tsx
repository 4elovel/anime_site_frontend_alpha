import React from "react";

interface StandartButtonIconProps {
  icon: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

const StandartButtonIcon: React.FC<StandartButtonIconProps> = ({
  icon,
  className = "",
  onClick,
  type = "button",
  ariaLabel = "icon button",
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`flex items-center justify-center w-12 h-12 rounded-xl border border-transparent bg-transparent hover:bg-[#223c5e] transition-colors ${className}`}
    aria-label={ariaLabel}
  >
    {icon}
  </button>
);

export default StandartButtonIcon;
