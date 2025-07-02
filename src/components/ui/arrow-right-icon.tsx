import React from "react";
import Link from "next/link";

interface ArrowRightIconProps {
  href: string;
  className?: string;
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
  href,
  className = "",
}) => (
  <Link
    href={href}
    className={"hover:cursor-pointer " + className}
    tabIndex={-1}
    aria-label="Go to link"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H19M19 12L15 16M19 12L15 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Link>
);

export default ArrowRightIcon;
