// src/components/Pagination.jsx (Updated for better mobile responsiveness)
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 sm:mt-8 md:mt-10 px-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="btn btn-square btn-xs sm:btn-sm hover:bg-base-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>

      {/* First Page + Ellipsis */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="btn btn-xs sm:btn-sm hidden xs:inline-flex"
          >
            1
          </button>
          {start > 2 && <span className="px-1 sm:px-2 text-xs sm:text-sm hidden xs:inline">...</span>}
        </>
      )}

      {/* Visible Pages */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`btn btn-xs sm:btn-sm ${
            page === p ? "btn-active" : ""
          }`}
        >
          {p}
        </button>
      ))}

      {/* Last Page + Ellipsis */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1 sm:px-2 text-xs sm:text-sm hidden xs:inline">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="btn btn-xs sm:btn-sm hidden xs:inline-flex"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="btn btn-square btn-xs sm:btn-sm hover:bg-base-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>

      {/* Mobile Page Info */}
      <div className="sm:hidden ml-2 text-xs text-gray-600">
        {page}/{totalPages}
      </div>
    </div>
  );
};

export default Pagination;