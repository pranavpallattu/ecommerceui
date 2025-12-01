// src/components/Pagination.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="join-item btn btn-square btn-sm hover:bg-base-300 disabled:opacity-50"
      >
        <ChevronLeft size={18} />
      </button>

      {/* First Page + Ellipsis */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="join-item btn btn-sm"
          >
            1
          </button>
          {start > 2 && <span className="join-item px-3">...</span>}
        </>
      )}

      {/* Visible Pages */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`join-item btn btn-sm ${
            page === p ? "btn-active" : ""
          }`}
        >
          {p}
        </button>
      ))}

      {/* Last Page + Ellipsis */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="join-item px-3">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="join-item btn btn-sm"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="join-item btn btn-square btn-sm hover:bg-base-300 disabled:opacity-50"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;