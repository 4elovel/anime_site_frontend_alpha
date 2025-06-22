"use react";

import UserProfilePopover from "@/components/nav/legacy/user-profile-popover";

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-center">
      <nav className="flex flex-row justify-end! bg-none h-9 w-full mx-4 mt-8 border-1 border-red-600">
        <UserProfilePopover />
      </nav>
    </div>
  );
}
