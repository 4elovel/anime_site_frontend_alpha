import Image from "next/image";

export default function ProfileBanner() {
  const userProfileBannerUrl = "/assets/user-profile-banner.png";

  return (
    <div className="pointer-events-none absolute top-0 left-0 z-0 h-[25vh] w-full sm:h-[55vh] xl:h-[45vh]">
      <Image
        src={userProfileBannerUrl}
        alt="User Profile Banner"
        fill
        className="h-full w-full object-cover opacity-30"
        priority
        unoptimized
      />
    </div>
  );
}
