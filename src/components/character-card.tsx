import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CharacterCardProps {
  image: string;
  name: string;
  originalName: string;
  description: React.ReactNode;
  subtitle?: string;
  href: string;
}

export default function CharacterCard({
  image,
  name,
  originalName,
  description,
  subtitle,
  href = "",
}: CharacterCardProps) {
  return (
    <Link
      href={href}
      className="group block focus:outline-none"
      tabIndex={0}
      style={{ textDecoration: "none" }}
    >
      <div className="relative box-border flex h-[340px] min-h-[340px] max-w-[700px] min-w-[400px] bg-transparent text-white shadow-none transition-shadow duration-200 md:h-[260px] md:max-w-full md:min-w-0">
        <div className="relative h-full w-[150px] flex-shrink-0 overflow-hidden rounded-l-2xl rounded-r-none md:h-full md:w-[220px] md:max-w-[220px] md:min-w-[220px]">
          <Image
            src={image}
            alt={name}
            fill
            className="h-full w-full object-cover object-top"
            priority
          />
        </div>
        <div className="relative flex h-full w-full flex-col justify-between py-0 pl-8 md:py-2 md:pl-2 lg:pl-4 xl:pl-6">
          <div>
            <h2
              className="mb-0 truncate text-xl leading-tight font-extrabold md:mb-1 md:text-lg lg:mb-2 lg:text-xl xl:mb-3 xl:text-2xl"
              title={name}
            >
              {name}
            </h2>
            <div className="text-sm font-medium text-[#A0A0A0] md:text-xs lg:text-sm xl:text-base">
              {originalName}
            </div>
          </div>
          <div className="my-2 flex w-full items-center justify-center md:items-start md:justify-start">
            <div className="line-clamp-none w-full text-left text-base leading-relaxed font-normal text-white md:line-clamp-none md:text-xs lg:text-xs xl:text-sm">
              {description}
            </div>
          </div>
          {subtitle && (
            <div
              className="w-full text-lg font-medium text-[#A0A0A0] select-none md:text-xs lg:text-sm xl:text-base"
              style={{ letterSpacing: 0.5 }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
