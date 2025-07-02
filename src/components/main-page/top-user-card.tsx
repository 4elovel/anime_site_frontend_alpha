import React from "react";
import Image from "next/image";

interface TopUserCardProps {
  rank: number;
  avatarUrl: string;
  username: string;
  registration: string;
  stars: string;
  comments: string;
  folders: string;
}

const TopUserCard: React.FC<TopUserCardProps> = ({
  rank,
  avatarUrl,
  username,
  registration,
  stars,
  comments,
  folders,
}) => {
  const getCrownColor = (rank: number) => {
    if (rank === 1) return "#FFD700";
    if (rank === 2) return "#C0C0C0";
    if (rank === 3) return "#CD7F32";
    return "#666666";
  };

  return (
    <div className="flex items-center w-[320px] xs:w-full py-3 px-2 justify-center gap-x-4">
      <div className="flex items-center">
        <span
          className="text-lg font-bold mr-1 xs:text-base"
          style={{ color: getCrownColor(rank) }}
        >
          {rank}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={getCrownColor(rank)}
        >
          <path d="M5 16L3 7l5.5 5L12 4l3.5 8L21 7l-2 9H5zm2.7-2h8.6l.9-4.4L14 12.5l-2-4.5-2 4.5-3.2-2.9L7.7 14z" />
        </svg>
      </div>

      <div className="w-24 h-24 xs:w-16 xs:h-16 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={avatarUrl}
          alt={username}
          width={96}
          height={96}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <div className="flex-1 flex flex-col items-start justify-center">
        <div className="text-white font-bold text-base mb-0.5 xs:text-sm">
          {username}
        </div>
        <div className="text-gray-400 text-xs mb-2 xs:text-[10px]">
          Реєстрація: {registration}
        </div>

        <div className="flex items-center gap-6 xs:gap-3">
          <div className="flex flex-col items-center">
            <svg
              className="w-6 h-6 xs:w-3 xs:h-3 text-gray-400 mb-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12.2276 1.67953L13.9874 5.22823C14.2274 5.72222 14.8673 6.19605 15.4073 6.28678L18.5969 6.8211C20.6367 7.16388 21.1167 8.65595 19.6468 10.1278L17.1671 12.628C16.7471 13.0514 16.5172 13.868 16.6471 14.4528L17.3571 17.5478C17.917 19.9977 16.6271 20.9453 14.4774 19.6649L11.4877 17.8806C10.9478 17.558 10.0579 17.558 9.5079 17.8806L6.51827 19.6649C4.3785 20.9453 3.07865 19.9875 3.63859 17.5478L4.34851 14.4528C4.47849 13.868 4.24852 13.0514 3.82856 12.628L1.34884 10.1278C-0.111001 8.65595 0.35895 7.16388 2.39872 6.8211L5.58837 6.28678C6.11831 6.19605 6.75824 5.72222 6.99821 5.22823L8.758 1.67953C9.7179 -0.246041 11.2777 -0.246041 12.2276 1.67953Z"
                fill="#918C8C"
              />
            </svg>
            <span className="text-white text-sm xs:text-xs font-semibold">
              {stars}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <svg
              className="w-6 h-6 xs:w-3 xs:h-3 text-gray-400 mb-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M0.493164 16.2458L1.79316 12.3458C-0.530836 8.90882 0.367164 4.47382 3.89316 1.97182C7.41916 -0.529184 12.4832 -0.324184 15.7382 2.45182C18.9932 5.22882 19.4332 9.71782 16.7672 12.9528C14.1012 16.1878 9.15216 17.1678 5.19316 15.2458L0.493164 16.2458Z"
                fill="#918C8C"
              />
            </svg>
            <span className="text-white text-sm xs:text-xs font-semibold">
              {comments}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <svg
              className="w-6 h-6 xs:w-3 xs:h-3 text-gray-400 mb-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M18.6252 1.73536H11.3179C11.0959 1.73604 10.8788 1.67078 10.694 1.54786L9.39083 0.67645C8.95931 0.387894 8.45165 0.234341 7.93255 0.235357H4.3752C3.67924 0.236101 3.01199 0.512902 2.51987 1.00502C2.02775 1.49715 1.75095 2.16439 1.7502 2.86036V3.98536H21.2502C21.2502 2.53786 20.0727 1.73536 18.6252 1.73536ZM19.3635 18.2354H3.63692C2.94814 18.2346 2.28727 17.9631 1.79682 17.4795C1.30638 16.9959 1.02566 16.3389 1.0152 15.6502L0.258639 7.92801V7.91489C0.233864 7.60538 0.273417 7.29409 0.37481 7.00062C0.476203 6.70714 0.637241 6.43783 0.84779 6.20962C1.05834 5.98142 1.31384 5.79926 1.59822 5.67461C1.8826 5.54997 2.1897 5.48553 2.5002 5.48536H20.5049C20.8153 5.48566 21.1223 5.55019 21.4066 5.6749C21.6908 5.7996 21.9462 5.98178 22.1567 6.20997C22.3671 6.43816 22.5281 6.70743 22.6294 7.00084C22.7308 7.29425 22.7703 7.60546 22.7455 7.91489V7.92801L21.9852 15.6502C21.9747 16.3389 21.694 16.9959 21.2036 17.4795C20.7131 17.9631 20.0523 18.2346 19.3635 18.2354Z"
                fill="#918C8C"
              />
            </svg>
            <span className="text-white text-sm xs:text-xs font-semibold">
              {folders}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUserCard;
