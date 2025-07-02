import React from "react";
import ToggleSwitch from "@/components/toggle-switch";

interface NotificationSwitchRowProps {
  label: string;
  sublabel?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const NotificationSwitchRow: React.FC<NotificationSwitchRowProps> = ({
  label,
  sublabel,
  checked,
  onChange,
}) => (
  <div className="flex items-center justify-between mb-4">
    <div>
      <div className="text-white text-base font-medium">{label}</div>
      {sublabel && (
        <div className="text-[#918C8C] text-xs max-w-[340px]">{sublabel}</div>
      )}
    </div>
    <ToggleSwitch checked={checked} onChange={onChange} />
  </div>
);

export default NotificationSwitchRow;
