import { ViewStatsCard } from "@/components/profile/view-stats-card";
import Navbar from "@/components/nav/navbar";
import ProfileBanner from "@/components/profile/profile-banner";
import ProfileCard from "@/components/profile/profile-card";
import AnimeHistory from "@/components/profile/anime-history";
import Image from "next/image";

export default function ProfilePage() {
  const userProfileBannerUrl = "/assets/user-profile-banner.png";
  return (
    <div className="flex flex-col gap-6">
      <Navbar />
      <ProfileBanner />
      <div className="flex flex-col px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <ProfileCard />
          <ViewStatsCard />
        </div>
      </div>
    </div>
    // <div className="relative flex flex-col min-h-screen">
    //   <div className="absolute top-0 left-0 w-full h-[30vh] z-0 pointer-events-none">
    //     <Image
    //       src={userProfileBannerUrl}
    //       alt="User Profile Banner"
    //       fill
    //       className="object-cover w-full h-full opacity-30"
    //       priority
    //       unoptimized
    //     />
    //   </div>
    //   {/* NavBar (on top of banner) */}
    //   <div className="z-10">
    //     <Navbar />
    //   </div>
    //   <div className="flex flex-col px-4 gap-6 z-10">
    //     <h1 className="font-[500] text-[2rem] text-white mb-0">Загальне</h1>
    //     <ProfileCard />
    //     <div className="flex justify-center items-center w-full">
    //       <ViewStatsCard />
    //     </div>
    //     <AnimeHistory />
    //   </div>
    // </div>
  );
}
