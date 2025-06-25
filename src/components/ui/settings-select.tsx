import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DownArrowNotFilled from "@/assets/arrow-down-not-filled.svg";
import DownArrow from "@/assets/arrow-down.svg";

interface SettingsSelectProps {
  label: string;
  options: { value: string; label: string }[];
  haveLeftArrow?: boolean;
  haveRightArrow?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const SettingsSelect: React.FC<SettingsSelectProps> = ({
  label,
  options,
  value,
  haveLeftArrow = true,
  haveRightArrow = false,
  onChange,
  ...props
}) => {
  return (
    <div className="w-full mb-2">
      <label className="block text-[#918C8C] text-base mb-1 font-medium select-none">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="focus-visible:border-[#49638A]! w-full shadow-none ring-0 inset-ring-0 focus-visible:inset-ring-0! focus-visible:shadow-none! focus-visible:ring-0! select-none bg-transparent border-0 border-b border-[#49638A] rounded-none px-0 py-2 text-white text-lg font-semibold focus:outline-none focus:ring-0 focus:border-blue-400 pl-6 pr-8 relative appearance-none">
          <SelectValue />
          {haveLeftArrow && (
            <span className="mt-1 absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none flex items-center pl-2">
              <DownArrow className="w-4 h-4 text-[#918C8C]" />
            </span>
          )}
          {haveRightArrow && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none flex items-center pr-2">
              <DownArrowNotFilled className="w-4 h-4 text-[#918C8C]" />
            </span>
          )}
        </SelectTrigger>
        <SelectContent className="bg-[#181C24] shadow-none ring-0 inset-ring-0 focus-visible:inset-ring-0! focus-visible:shadow-none! focus-visible:ring-0! border border-[#49638A] rounded-xl z-50 text-white">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="focus:text-white! hover:bg-[#223c5e] shadow-none ring-0 inset-ring-0 focus-visible:inset-ring-0! focus-visible:shadow-none! focus-visible:ring-0! hover:text-white! focus:bg-[#223c5e] px-4 py-2 cursor-pointer text-base font-medium rounded-md"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SettingsSelect;
