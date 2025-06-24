import React from "react";
import DownArrow from "@/assets/arrow-down.svg";

interface SettingsSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  haveArrow?: boolean;
}

const SettingsSelect: React.FC<SettingsSelectProps> = ({
  label,
  options,
  value,
  haveArrow = true,
  onChange,
  ...props
}) => {
  return (
    <div className="w-full mb-2">
      <label className="block text-[#918C8C] text-base mb-1 font-medium select-none">
        {label}
      </label>
      <div className="relative">
        {/* Custom arrow absolutely positioned, left-aligned, vertically centered with select text */}
        {haveArrow && (
          <div className="mt-1 absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
            <DownArrow className="w-4 h-4 text-[#918C8C]" />
          </div>
        )}
        <select
          value={value}
          onChange={onChange}
          className="appearance-none w-full bg-transparent border-0 border-b border-[#49638A] rounded-none px-0 py-2 text-white text-lg font-semibold focus:outline-none focus:ring-0 focus:border-blue-400 pl-6 pr-8"
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="text-black dark:text-white bg-[#181c23]"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SettingsSelect;
