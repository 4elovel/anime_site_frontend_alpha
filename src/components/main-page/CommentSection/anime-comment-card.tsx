import React from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface AnimeCommentCardProps {
  avatarUrl: string;
  username: string;
  timeAgo: string;
  text: string;
  likes?: number;
  dislikes?: number;
  onLike?: () => void;
  onDislike?: () => void;
  onReply?: () => void;
  isReply?: boolean;
  isLoading?: boolean;
}

const UpArrow = ({ hovered }: { hovered: boolean }) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.00009 20.9741V12.9741H5.41409C5.21634 12.9741 5.02305 12.9154 4.85864 12.8055C4.69423 12.6956 4.56609 12.5394 4.49042 12.3567C4.41475 12.174 4.39494 11.973 4.43351 11.7791C4.47208 11.5851 4.56728 11.4069 4.70709 11.2671L11.2931 4.68109C11.4806 4.49362 11.7349 4.38831 12.0001 4.38831C12.2653 4.38831 12.5196 4.49362 12.7071 4.68109L19.2931 11.2671C19.4329 11.4069 19.5281 11.5851 19.5667 11.7791C19.6052 11.973 19.5854 12.174 19.5098 12.3567C19.4341 12.5394 19.306 12.6956 19.1416 12.8055C18.9771 12.9154 18.7838 12.9741 18.5861 12.9741H15.0001V20.9741C15.0001 21.2393 14.8947 21.4937 14.7072 21.6812C14.5197 21.8687 14.2653 21.9741 14.0001 21.9741H10.0001C9.73488 21.9741 9.48052 21.8687 9.29299 21.6812C9.10545 21.4937 9.00009 21.2393 9.00009 20.9741Z"
      stroke={hovered ? "#fff" : "#918C8C"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownArrow = ({ hovered }: { hovered: boolean }) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 4.97412V12.9741H18.586C18.7838 12.9741 18.9771 13.0328 19.1415 13.1427C19.306 13.2526 19.4341 13.4088 19.5098 13.5915C19.5854 13.7742 19.6052 13.9752 19.5667 14.1691C19.5281 14.3631 19.4329 14.5413 19.2931 14.6811L12.7071 21.2671C12.5196 21.4546 12.2653 21.5599 12.0001 21.5599C11.7349 21.5599 11.4806 21.4546 11.2931 21.2671L4.70709 14.6811C4.56728 14.5413 4.47208 14.3631 4.43351 14.1691C4.39494 13.9752 4.41475 13.7742 4.49042 13.5915C4.56609 13.4088 4.69423 13.2526 4.85864 13.1427C5.02305 13.0328 5.21634 12.9741 5.41409 12.9741H9.00009V4.97412C9.00009 4.7089 9.10545 4.45454 9.29299 4.26701C9.48052 4.07947 9.73488 3.97412 10.0001 3.97412H14.0001C14.2653 3.97412 14.5197 4.07947 14.7072 4.26701C14.8947 4.45454 15.0001 4.7089 15.0001 4.97412Z"
      stroke={hovered ? "#fff" : "#918C8C"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReplyIcon = ({ hovered }: { hovered: boolean }) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.18309 7.09109C7.8891 6.83122 6.54552 7.00527 5.36045 7.58627C4.17539 8.16727 3.21495 9.12281 2.62791 10.3049C2.04086 11.487 1.85996 12.8296 2.11321 14.125C2.36647 15.4203 3.03975 16.5959 4.02879 17.4698C5.01783 18.3438 6.26743 18.8672 7.58405 18.9591C8.90068 19.051 10.2109 18.7061 11.3117 17.978C12.4125 17.2499 13.2426 16.1792 13.6733 14.9316C14.104 13.684 14.1113 12.3293 13.6941 11.0771M14.8131 18.8571C16.1085 19.1183 17.4538 18.9445 18.6403 18.3628C19.8268 17.7811 20.7881 16.824 21.3749 15.64C21.9618 14.456 22.1413 13.1114 21.8857 11.8149C21.6301 10.5185 20.9537 9.34262 19.9614 8.46996C18.9691 7.59729 17.7165 7.07661 16.398 6.98875C15.0795 6.90088 13.7688 7.25075 12.6695 7.98403C11.5702 8.71732 10.7437 9.793 10.3184 11.0441C9.89301 12.2952 9.89256 13.6517 10.3171 14.9031"
      stroke={hovered ? "#fff" : "#918C8C"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AnimeCommentCard: React.FC<AnimeCommentCardProps> = ({
  avatarUrl,
  username,
  timeAgo,
  text,
  likes = 0,
  dislikes = 0,
  onLike,
  onDislike,
  onReply,
  isReply = false,
  isLoading = false,
}) => {
  const [upHover, setUpHover] = React.useState(false);
  const [downHover, setDownHover] = React.useState(false);
  const [replyHover, setReplyHover] = React.useState(false);

  if (isLoading) {
    return (
      <div
        className={`relative bg-transparent border-none select-none p-0 flex flex-col${
          isReply ? " pl-4" : ""
        }`}
      >
        <div className="flex items-start gap-4">
          <Skeleton circle height={48} width={48} className="mt-1" />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-1">
              <div className="flex flex-col">
                <Skeleton height={18} width={100} />
                <Skeleton height={12} width={60} className="mt-1" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton height={24} width={24} />
                <Skeleton height={18} width={24} />
                <Skeleton height={24} width={24} />
              </div>
            </div>
            <Skeleton height={18} width={180} className="mb-2" />
            <Skeleton height={18} width={80} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`relative bg-transparent border-none select-none p-0 flex flex-col${
        isReply ? " pl-4" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <Image
          src={avatarUrl}
          alt={username}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover mt-1"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <div className="flex flex-col">
              <span className="text-white font-semibold text-base">
                {username}
              </span>
              <span className="text-[#B6B6B6] text-xs mt-0.5">{timeAgo}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="group p-0 m-0 bg-transparent border-none"
                onMouseEnter={() => setUpHover(true)}
                onMouseLeave={() => setUpHover(false)}
                onClick={onLike}
              >
                <span className="inline-flex">
                  <UpArrow hovered={upHover} />
                </span>
              </button>
              <span className="text-[#B6B6B6] text-base font-medium">
                {likes}
              </span>
              <button
                className="group p-0 m-0 bg-transparent border-none"
                onMouseEnter={() => setDownHover(true)}
                onMouseLeave={() => setDownHover(false)}
                onClick={onDislike}
              >
                <span className="inline-flex">
                  <DownArrow hovered={downHover} />
                </span>
              </button>
            </div>
          </div>
          <div className="text-white text-base mb-2">{text}</div>
          <button
            className="text-[#B6B6B6] text-sm flex items-center gap-1 hover:underline"
            onMouseEnter={() => setReplyHover(true)}
            onMouseLeave={() => setReplyHover(false)}
            onClick={onReply}
          >
            Відповісти
            <ReplyIcon hovered={replyHover} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeCommentCard;
