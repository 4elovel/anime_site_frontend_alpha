import React from "react";
import ActionButton from "@/components/ui/action-button";
import StandartButtonIcon from "@/components/ui/standart-button-icon";
import SectionHeader from "@/components/shared/section-header";
import Rating from "@/components/ui/rating";
import { Play, Share2Icon, EllipsisVertical } from "lucide-react";
import WatchTogether from "@/assets/watch-together.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface AnimeMainInfoSectionProps {
  anime: any;
  tags: string[];
  descriptionBlocks: any[];
  isLoading?: boolean;
}

const AnimeMainInfoSection: React.FC<AnimeMainInfoSectionProps> = ({
  anime,
  tags,
  descriptionBlocks,
  isLoading = false,
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
      <div className="flex flex-col w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-1">
          {isLoading ? (
            <Skeleton height={36} width={320} />
          ) : (
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {anime.name}
            </h1>
          )}
        </div>
        {isLoading ? (
          <Skeleton height={24} width={180} className="mb-2" />
        ) : (
          anime.seo?.title && (
            <div className="text-lg text-zinc-400 mb-2">{anime.seo.title}</div>
          )
        )}
        {isLoading ? (
          <Skeleton height={24} width={120} />
        ) : (
          <Rating
            localRating={anime.localRating}
            imdb={anime.imdb_score}
            maxRating={10}
          />
        )}
      </div>
    </div>
    <div className="flex flex-row flex-wrap items-center gap-3 min-h-[27px]">
      {isLoading ? (
        <>
          <Skeleton height={24} width={60} />
          <Skeleton height={24} width={60} />
          <Skeleton height={24} width={60} />
        </>
      ) : (
        <>
          <span className="font-sans text-white decoration-dotted text-base font-normal leading-6 underline underline-dotted underline-offset-4 decoration-[#49638A] cursor-pointer bg-none rounded-none p-0">
            Тест-тег
          </span>
          {tags &&
            tags.map((tag, idx) => (
              <span
                key={tag + idx}
                className="font-sans text-white text-base font-normal leading-6 underline underline-dotted underline-offset-4 decoration-[#49638A] cursor-pointer bg-none rounded-none p-0"
              >
                {tag}
              </span>
            ))}
        </>
      )}
    </div>
    <div className="items-center text-center content-center justify-center">
      <div className="flex flex-row gap-3 mb-4 justify-center content-center items-center">
        {isLoading ? (
          <>
            <Skeleton height={44} width={120} />
            <Skeleton height={44} width={120} />
            <Skeleton height={44} width={44} />
            <Skeleton height={44} width={44} />
          </>
        ) : (
          <>
            <ActionButton
              text="Дивитися E1"
              icon={<Play size={22} />}
              colorClass="bg-[#4B7FCC] text-white hover:bg-[#3c70bd]"
              className="w-full"
            />
            <ActionButton
              text="Дивитись разом"
              icon={<WatchTogether size={22} />}
              colorClass="bg-[#D06005] text-white hover:bg-[#c25903]"
              className="w-full"
            />
            <StandartButtonIcon
              className="w-23"
              icon={<Share2Icon color="white" size={22} />}
            />
            <StandartButtonIcon
              icon={<EllipsisVertical size={22} color="white" />}
            />
          </>
        )}
      </div>

      {isLoading ? (
        <>
          <Skeleton height={32} width={120} className="mb-2" />
          <div className="text-zinc-200 text-[20px] leading-[1.5] text-left">
            <Skeleton height={24} width={500} className="mb-2" />
            <Skeleton height={24} width={400} className="mb-2" />
            <Skeleton height={24} width={300} className="mb-2" />
          </div>
        </>
      ) : (
        <>
          <SectionHeader title="Опис" badge="UA" className="mb-2" />
          <div className="text-zinc-200 text-[20px] leading-[1.5] text-left">
            {descriptionBlocks.map((block, idx) =>
              block.description ? (
                <p
                  key={idx}
                  className="mb-4"
                  dangerouslySetInnerHTML={{ __html: block.description }}
                />
              ) : block.source && block.source.url ? (
                <div key={idx} className="mt-6">
                  Джерело{" "}
                  <a
                    href={block.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4B7FCC] underline text-[20px]"
                  >
                    {block.source.name}
                  </a>
                </div>
              ) : null
            )}
          </div>
        </>
      )}
    </div>
  </div>
);

export default AnimeMainInfoSection;
