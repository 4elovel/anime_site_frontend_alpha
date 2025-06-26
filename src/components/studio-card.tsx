import React from "react";
import Image from "next/image";
import Link from "next/link";

interface StudioCardProps {
  logo: string;
  name: string;
  description: React.ReactNode;
  releases: number;
  slug: string;
}

export default function StudioCard({ logo, name, description, releases, slug }: StudioCardProps) {
  return (
    <Link
      href={`/studio/${slug}`}
      className="block group focus:outline-none"
      tabIndex={0}
      style={{ textDecoration: 'none' }}
    >
      <div
        className="flex max-w-[650px] min-w-[400px] relative text-white min-h-[320px] h-[320px] box-border transition-shadow duration-200 group-hover:shadow-2xl group-focus:shadow-2xl
        md:max-w-full md:min-w-0 md:h-[260px]"
      >
        {/* Логотип */}
        <div className="flex-shrink-0 w-[110px] h-full bg-white rounded-l-2xl rounded-r-none flex items-center justify-center overflow-hidden
          xl:w-[150px] xl:max-w-[150px] xl:min-w-[120px] xl:h-full
          lg:w-[200px] lg:max-w-[200px] lg:min-w-[200px] lg:h-full
          md:w-[150px] md:max-w-[150px] md:min-w-[150px] md:h-full">
          <Image
            src={logo}
            alt={name + ' Logo'}
            width={160}
            height={160}
            className="object-contain max-w-[160px] max-h-[160px]
              xl:max-w-[110px] xl:max-h-[110px]
              lg:max-w-[80px] lg:max-h-[80px]
              md:max-w-[60px] md:max-h-[60px]"
          />
        </div>
        {/* Контент */}
        <div className="flex flex-col justify-start ml-2 mt-2 w-full relative h-full xl:ml-6 lg:ml-4 md:ml-2">
          <h2 className="text-3xl font-bold mb-4 leading-tight truncate group-hover:underline group-focus:underline
            xl:text-2xl xl:mb-3
            lg:text-xl lg:mb-2
            md:text-lg md:mb-1" title={name}>{name}</h2>
          <div className="lg:flex-1 lg:flex lg:items-center">
            <div className="w-full text-base leading-relaxed font-normal text-left pr-2 overflow-hidden line-clamp-5
              xl:text-sm xl:pr-1
              lg:text-xs lg:pr-0
              md:text-xs md:pr-0">
              {React.Children.map(description, (child) => {
                if (typeof child === 'string') return child;
                if (React.isValidElement(child) && child.type === 'a') {
                  const el = child as React.ReactElement<any>;
                  return (
                    <span className={el.props.className}>{el.props.children}</span>
                  );
                }
                return child;
              })}
            </div>
          </div>
          {/* Кількість релізів */}
          <div className="absolute bottom-2 right-4 text-[#A0A0A0] text-lg font-medium select-none truncate
            xl:text-base lg:text-sm md:text-xs md:bottom-1 md:right-2" style={{ letterSpacing: 0.5 }} title={releases + ' релізів'}>
            {releases} релізів
          </div>
        </div>
      </div>
    </Link>
  );
} 