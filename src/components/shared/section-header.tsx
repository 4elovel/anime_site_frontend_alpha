import React from "react";

interface SectionHeaderProps {
  title: string;
  badge: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  badge,
  className = "",
}) => (
  <div className={`${className} flex gap-2 items-center`}>
    <span className="font-semibold text-lg text-white">{title}</span>
    <span
      className="flex flex-row justify-center items-center px-2 py-0 gap-2 w-16 h-[35px] rounded-[12px] text-white text-[16px] font-medium leading-[19px] select-none border"
      style={{
        fontFamily: "Inter, sans-serif",
        background: "var(--color-language-button-color)",
        borderColor: "var(--color-language-button-color)",
      }}
    >
      {badge}
    </span>
  </div>
);

export default SectionHeader;
