import React from "react";

interface BlueButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

const BlueButton: React.FC<BlueButtonProps> = ({
  text,
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      className={`bg-[#4B7FCC] text-white rounded-lg px-6 py-2 hover:cursor-pointer font-semibold transition-colors duration-200 hover:bg-[#3a6bb0] focus:bg-[#3a6bb0] ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default BlueButton;
