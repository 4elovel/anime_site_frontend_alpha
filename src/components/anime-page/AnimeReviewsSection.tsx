import React from "react";
import ReviewCard from "@/components/main-page/ReviewSection/review-card";
import { Heart } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Review {
  id: number;
  username: string;
  date: string;
  rating: number;
  text: string;
  adminReply?: string;
}

interface AnimeReviewsSectionProps {
  reviews: Review[];
  animeName: string;
  isLoading?: boolean;
}

const Star = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 23 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.15268 6.88484L1.77268 7.80984L1.65968 7.83284C1.48862 7.87826 1.33267 7.96825 1.20777 8.09365C1.08287 8.21904 0.993482 8.37533 0.94874 8.54657C0.903999 8.71781 0.905505 8.89785 0.953106 9.06832C1.00071 9.23878 1.09269 9.39356 1.21968 9.51684L5.84168 14.0158L4.75168 20.3708L4.73868 20.4808C4.72821 20.6578 4.76494 20.8343 4.84513 20.9923C4.92531 21.1504 5.04606 21.2843 5.19501 21.3804C5.34397 21.4764 5.51577 21.5311 5.69283 21.539C5.86989 21.5468 6.04584 21.5074 6.20268 21.4248L11.9087 18.4248L17.6017 21.4248L17.7017 21.4708C17.8667 21.5359 18.0461 21.5558 18.2214 21.5286C18.3967 21.5014 18.5617 21.4281 18.6993 21.3161C18.8369 21.2041 18.9422 21.0576 19.0045 20.8915C19.0668 20.7254 19.0838 20.5457 19.0537 20.3708L17.9627 14.0158L22.5867 9.51584L22.6647 9.43084C22.7761 9.29361 22.8492 9.1293 22.8764 8.95464C22.9036 8.77998 22.8841 8.60122 22.8198 8.43657C22.7554 8.27193 22.6486 8.12728 22.5102 8.01736C22.3717 7.90744 22.2066 7.83618 22.0317 7.81084L15.6517 6.88484L12.7997 1.10484C12.7172 0.937379 12.5894 0.796359 12.4309 0.697749C12.2723 0.599138 12.0894 0.546875 11.9027 0.546875C11.716 0.546875 11.533 0.599138 11.3745 0.697749C11.216 0.796359 11.0882 0.937379 11.0057 1.10484L8.15268 6.88484Z"
      fill="#DFD50A"
    />
  </svg>
);
const EmptyStar = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 23 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.15268 6.88484L1.77268 7.80984L1.65968 7.83284C1.48862 7.87826 1.33267 7.96825 1.20777 8.09365C1.08287 8.21904 0.993482 8.37533 0.94874 8.54657C0.903999 8.71781 0.905505 8.89785 0.953106 9.06832C1.00071 9.23878 1.09269 9.39356 1.21968 9.51684L5.84168 14.0158L4.75168 20.3708L4.73868 20.4808C4.72821 20.6578 4.76494 20.8343 4.84513 20.9923C4.92531 21.1504 5.04606 21.2843 5.19501 21.3804C5.34397 21.4764 5.51577 21.5311 5.69283 21.539C5.86989 21.5468 6.04584 21.5074 6.20268 21.4248L11.9087 18.4248L17.6017 21.4248L17.7017 21.4708C17.8667 21.5359 18.0461 21.5558 18.2214 21.5286C18.3967 21.5014 18.5617 21.4281 18.6993 21.3161C18.8369 21.2041 18.9422 21.0576 19.0045 20.8915C19.0668 20.7254 19.0838 20.5457 19.0537 20.3708L17.9627 14.0158L22.5867 9.51584L22.6647 9.43084C22.7761 9.29361 22.8492 9.1293 22.8764 8.95464C22.9036 8.77998 22.8841 8.60122 22.8198 8.43657C22.7554 8.27193 22.6486 8.12728 22.5102 8.01736C22.3717 7.90744 22.2066 7.83618 22.0317 7.81084L15.6517 6.88484L12.7997 1.10484C12.7172 0.937379 12.5894 0.796359 12.4309 0.697749C12.2723 0.599138 12.0894 0.546875 11.9027 0.546875C11.716 0.546875 11.533 0.599138 11.3745 0.697749C11.216 0.796359 11.0882 0.937379 11.0057 1.10484L8.15268 6.88484Z"
      fill="#232323"
      stroke="#444"
      strokeWidth="1.5"
    />
  </svg>
);
const HalfStar = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 23 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="half-gradient">
        <stop offset="50%" stopColor="#DFD50A" />
        <stop offset="50%" stopColor="#232323" />
      </linearGradient>
    </defs>
    <path
      d="M8.15268 6.88484L1.77268 7.80984L1.65968 7.83284C1.48862 7.87826 1.33267 7.96825 1.20777 8.09365C1.08287 8.21904 0.993482 8.37533 0.94874 8.54657C0.903999 8.71781 0.905505 8.89785 0.953106 9.06832C1.00071 9.23878 1.09269 9.39356 1.21968 9.51684L5.84168 14.0158L4.75168 20.3708L4.73868 20.4808C4.72821 20.6578 4.76494 20.8343 4.84513 20.9923C4.92531 21.1504 5.04606 21.2843 5.19501 21.3804C5.34397 21.4764 5.51577 21.5311 5.69283 21.539C5.86989 21.5468 6.04584 21.5074 6.20268 21.4248L11.9087 18.4248L17.6017 21.4248L17.7017 21.4708C17.8667 21.5359 18.0461 21.5558 18.2214 21.5286C18.3967 21.5014 18.5617 21.4281 18.6993 21.3161C18.8369 21.2041 18.9422 21.0576 19.0045 20.8915C19.0668 20.7254 19.0838 20.5457 19.0537 20.3708L17.9627 14.0158L22.5867 9.51584L22.6647 9.43084C22.7761 9.29361 22.8492 9.1293 22.8764 8.95464C22.9036 8.77998 22.8841 8.60122 22.8198 8.43657C22.7554 8.27193 22.6486 8.12728 22.5102 8.01736C22.3717 7.90744 22.2066 7.83618 22.0317 7.81084L15.6517 6.88484L12.7997 1.10484C12.7172 0.937379 12.5894 0.796359 12.4309 0.697749C12.2723 0.599138 12.0894 0.546875 11.9027 0.546875C11.716 0.546875 11.533 0.599138 11.3745 0.697749C11.216 0.796359 11.0882 0.937379 11.0057 1.10484L8.15268 6.88484Z"
      fill="url(#half-gradient)"
      stroke="#444"
      strokeWidth="1.5"
    />
  </svg>
);

function pluralizeReview(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) return "відгук";
  return "відгуків";
}

const AnimeReviewsSection: React.FC<AnimeReviewsSectionProps> = ({
  reviews,
  animeName,
  isLoading = false,
}) => {
  const reviewsCount = reviews.length;
  const maxStars = 5;
  const avgRating =
    reviewsCount > 0
      ? Math.round(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount) * 10
        ) / 10
      : 0;
  const roundedRating = Math.round(avgRating * 2) / 2;
  const starsArray = Array.from({ length: maxStars }, (_, i) => {
    if (roundedRating >= i + 1) return "full";
    if (roundedRating >= i + 0.5) return "half";
    return "empty";
  });
  const recommendedCount = reviews.filter((r) => r.rating >= 4).length;
  const recommendPercent =
    reviewsCount > 0 ? Math.round((recommendedCount / reviewsCount) * 100) : 0;

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 mb-6">
        {isLoading ? (
          <>
            <Skeleton height={24} width={120} className="mb-2" />
            <Skeleton height={24} width={220} className="mb-2" />
            <Skeleton height={24} width={180} />
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              {starsArray.map((type, i) =>
                type === "full" ? (
                  <Star key={i} />
                ) : type === "half" ? (
                  <HalfStar key={i} />
                ) : (
                  <EmptyStar key={i} />
                )
              )}
            </div>
            <div className="text-white text-lg font-semibold">
              Загальний рейтинг на основі {reviewsCount}{" "}
              {pluralizeReview(reviewsCount)}
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Heart className="w-6 h-6 text-[#FF4B55] fill-[#FF4B55]" />
              <span className="text-white">
                {recommendPercent}% глядачів рекомендують це аніме друзям
              </span>
            </div>
          </>
        )}
      </div>
      {isLoading ? (
        <>
          <Skeleton height={32} width={320} className="mb-2" />
          <Skeleton height={24} width={220} className="mb-4" />
          <Skeleton height={44} width={180} className="mb-8" />
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} height={120} className="mb-6" />
          ))}
        </>
      ) : (
        <>
          <h3 className="text-white text-3xl font-bold mb-2">
            {pluralizeReview(reviewsCount).charAt(0).toUpperCase() +
              pluralizeReview(reviewsCount).slice(1)}{" "}
            про аніме "{animeName}"
          </h3>
          <div className="text-[#B6B6B6] text-lg mb-4">
            Нам важлива твоя думка! Сподобалося це аніме?
          </div>
          <button className="mb-8 px-6 py-3 rounded-xl text-white text-sm font-semibold border border-[#49638A] hover:bg-[#33344A] transition w-fit">
            Залишити відгук
          </button>
          <div className="flex flex-col gap-6">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                userName={review.username}
                date={review.date}
                title={""}
                rating={review.rating}
                review={review.text}
                adminReply={review.adminReply}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AnimeReviewsSection;
