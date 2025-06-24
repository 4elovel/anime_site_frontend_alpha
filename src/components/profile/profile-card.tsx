import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileCard() {
  const avatarUrl = "assets/mock-user-logo.png";
  const username = "SakuraShadow";
  const followerCount = 0;
  const followingCount = 0;

  return (
    <div className="flex flex-col w-full">
      <Card className="bg-transparent p-0 border-none">
        <CardContent className="flex flex-row gap-6 p-0">
          <Avatar className="cursor-pointer w-30 h-30 sm:w-9 sm:h-9 xs:w-7 xs:h-7 rounded-md object-cover border-none">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>VM</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-[1.5rem] font-[700]">{username}</h1>
            <p className="text-[1rem] text-[#918c8c] font-[500]">
              <span className="text-white">{followerCount}</span> стежать
            </p>
            <p className="text-[1rem] text-[#918c8c] font-[500]">
              <span className="text-white">{followingCount}</span> відстежується
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
