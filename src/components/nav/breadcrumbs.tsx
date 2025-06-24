import React from "react";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
  icon?: React.ReactNode;
}

const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 sm:gap-4 py-2 select-none">
      {items.map((item, idx) => (
        <React.Fragment key={item.label + idx}>
          {idx > 0 && (
            <span className="text-[#3A4A6A] text-xl font-light">/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className={`flex items-center gap-2 px-3 py-1.5 border border-[#3A4A6A] rounded-lg bg-transparent text-white text-base font-medium hover:bg-[#1a2336] transition ${
                item.isActive ? "font-bold" : ""
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span
              className={`flex items-center gap-2 text-white text-base font-medium ${
                item.isActive ? "font-bold" : ""
              }`}
            >
              {item.icon}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
