import { ViewStatsCard } from "@/components/profile/view-stats-card";
import Navbar from "@/components/nav/navbar";

export default function ProfilePage() {
  return (
    <div>
      <Navbar />
      <div className="flex relative justify-center items-center h-screen overflow-hidden">
        <ViewStatsCard />
      </div>
    </div>
  );
}
