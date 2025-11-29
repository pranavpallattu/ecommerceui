// src/components/Pagination.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="btn btn-square btn-sm"
      >
        <ChevronLeft size={18} />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-ghost"}`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="btn btn-square btn-sm"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;