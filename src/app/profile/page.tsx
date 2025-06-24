import { ViewStatsCard } from "@/components/profile/view-stats-card";
import Navbar from "@/components/nav/navbar";
import ProfileCard from "@/components/profile/profile-card";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-0">
      <Navbar />
      <div className="flex flex-col px-4 gap-6">
        <h1 className="font-[500] text-[2rem] text-white mb-0">Загальне</h1>
        <ProfileCard />
        <div className="flex justify-center items-center w-full">
          <ViewStatsCard />
        </div>
      </div>
    </div>
  );
}
