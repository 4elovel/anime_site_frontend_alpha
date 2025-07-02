import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User, Heart, ImagePlay, Settings, LogOut } from "lucide-react";

interface UserProfilePopoverProps {
  isSignedIn: boolean;
  username: string;
}

export default function UserProfilePopover({
  isSignedIn,
  username,
}: UserProfilePopoverProps) {
  const signMessage = isSignedIn ? "Log out" : "Sign In";
  const avatarUrl = "assets/mock-user-logo.png";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer w-12 h-12 sm:w-9 sm:h-9 xs:w-7 xs:h-7 rounded-full object-cover border border-[#5B7CB2]">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>VM</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-50 md:w-fit text-white border-[#787880] border-[1px] p-0 bg-transparent backdrop-blur-md font-semibold md:mr-2"
        align="start"
      >
        <DropdownMenuLabel className="flex items-center gap-2 text-center border-b-[1px] border-[#787880]">
          <Avatar className="cursor-pointer w-12 h-12 sm:w-9 sm:h-9 xs:w-7 xs:h-7 rounded-full object-cover border border-[#5B7CB2]">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-[1rem]">{username}</h1>
        </DropdownMenuLabel>
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className="group hover:bg-none group">
            <User className="text-white group-hover:text-black" />
            Профіль
          </DropdownMenuItem>
          <DropdownMenuItem className="group">
            <Heart className="text-white group-hover:text-black" />
            Улюблене
          </DropdownMenuItem>
          <DropdownMenuItem className="group">
            <ImagePlay className="text-white group-hover:text-black" />
            Список аніме
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#787880]" />
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className="group">
            <Settings className="text-white group-hover:text-black" />
            Налаштування
          </DropdownMenuItem>
          <DropdownMenuItem className="group">
            <LogOut className="text-red-500 group-hover:text-black" />
            Вийти
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
