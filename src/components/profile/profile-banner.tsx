import Image from "next/image";

export default function ProfileBanner() {
  const userProfileBannerUrl = "/assets/user-profile-banner.png";

  return (
    <div className="absolute top-0 left-0 w-full h-[25vh] sm:h-[55vh] z-0 pointer-events-none">
      <Image
        src={userProfileBannerUrl}
        alt="User Profile Banner"
        fill
        className="object-cover w-full h-full opacity-30"
        priority
        unoptimized
      />
    </div>
  );
}
