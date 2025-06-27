import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-lg font-medium select-none">
        <span
          className="flex cursor-pointer items-center gap-2"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              d="M15 19l-7-7 7-7"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Показати ще
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#393939] text-2xl text-white disabled:opacity-40"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span>&larr;</span>
        </button>
        {getPageNumbers().map((num) => (
          <button
            key={num}
            className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-medium transition-colors duration-200 ${
              num === currentPage
                ? "bg-[#A259FF] text-white"
                : "bg-[#393939] text-white hover:bg-[#5a5a5a]"
            }`}
            onClick={() => onPageChange(num)}
            disabled={num === currentPage}
          >
            {num}
          </button>
        ))}
        <button
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#393939] text-2xl text-white disabled:opacity-40"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
