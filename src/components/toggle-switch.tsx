import React from "react";

interface ToggleSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked = false,
  onChange,
  className = "",
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      className={`relative w-14 h-7 rounded-full ${
        checked ? "bg-[#34C759]" : "bg-[#23252a]"
      } transition-colors duration-200 flex items-center focus:outline-none focus:ring-1 focus:ring-blue-400 ${className}`}
      onClick={() => onChange && onChange(!checked)}
      style={{ minWidth: 56, minHeight: 28 }}
    >
      <span
        className={`absolute left-1 top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
        style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,0.25)" }}
      />
    </button>
  );
};

export default ToggleSwitch;
