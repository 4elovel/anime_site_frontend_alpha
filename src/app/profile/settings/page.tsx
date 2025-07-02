"use client";
import SettingsMenu from "@/components/settings-menu";

export default function ProfileSettingsPage() {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Sidebar Navigation and Main Content */}
      <SettingsMenu />
    </div>
  );
}
