import Image from "next/image";

export default function ProfileBanner() {
  const userProfileBannerUrl = "/assets/user-profile-banner.png";

  return (
    <div className="absolute top-0 left-0 w-full h-[30vh] sm:h-[45vh] z-0 pointer-events-none">
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
