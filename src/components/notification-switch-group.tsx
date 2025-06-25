import React from "react";

interface NotificationSwitchGroupProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const NotificationSwitchGroup: React.FC<NotificationSwitchGroupProps> = ({
  title,
  children,
  className = "mb-8",
}) => (
  <div className={className}>
    <div className="text-white text-lg font-semibold mb-2">{title}</div>
    {children}
  </div>
);

export default NotificationSwitchGroup;
