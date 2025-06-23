import ReviewCard from "@/components/main-page/ReviewSection/review-card";

export type Review = {
  userName: string;
  date: string;
  title: string;
  rating: number;
  review: string;
  adminReply?: string;
};

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  // Для мобільних — тільки 3, для desktop — всі
  const mobileReviews = reviews.slice(0, 3);

  return (
    <section className="w-full px-4 md:px-10 py-10">
      <h2 className="text-white text-3xl font-bold mb-2">Останні рецензії</h2>
      <p className="text-[#918C8C] text-lg mb-6">Нам важлива твоя думка!</p>
      {/* Mobile: тільки 3, без скролу */}
      <div className="flex flex-col gap-6 items-start md:hidden">
        {mobileReviews.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </div>
      {/* Desktop: всі, але видно лише 3, скрол горизонтальний */}
      <div
        className="hidden md:flex gap-6 items-start overflow-x-auto flex-nowrap scrollbar-none"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {reviews.map((review, idx) => (
          <div key={idx} className="min-w-[350px] max-w-[400px] flex-shrink-0">
            <ReviewCard {...review} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
