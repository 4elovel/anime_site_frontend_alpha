import React from "react";
import Link from "next/link";

interface AuthorCardProps {
  name: string;
  role: string;
  image: string;
  link: string;
}

const AuthorCardComponent: React.FC<AuthorCardProps> = ({
  name,
  role,
  image,
  link,
}) => (
  <Link
    href={link}
    className="flex max-w-[240px] min-w-[220px] flex-col overflow-hidden rounded-2xl bg-black shadow-lg transition-all"
  >
    <div className="flex aspect-[3/4] w-full items-center justify-center bg-[#23242A]">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover"
        style={{ borderRadius: 18 }}
      />
    </div>
    <div className="flex flex-1 flex-col px-4 py-3">
      <span className="mb-1 text-sm text-gray-400">{role}</span>
      <span className="text-xl leading-tight font-semibold text-white">
        {name}
      </span>
    </div>
  </Link>
);

export default AuthorCardComponent;
