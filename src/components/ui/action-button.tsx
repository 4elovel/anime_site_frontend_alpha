import React from "react";

interface ActionButtonProps {
  text: string;
  icon?: React.ReactNode;
  colorClass?: string; // e.g. 'bg-blue-500 text-white'
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  icon,
  colorClass = "bg-blue-500 text-white hover:bg-blue-600 ",
  className = "",
  onClick,
  type = "button",
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`flex items-center hover:cursor-pointer justify-center gap-2 px-6 py-2 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${colorClass} ${className}`}
  >
    {text}
    {icon && <span className="ml-2 flex items-center">{icon}</span>}
  </button>
);

export default ActionButton;
