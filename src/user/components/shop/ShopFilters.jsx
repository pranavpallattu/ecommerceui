import { Filter } from "lucide-react";
import { sortOptions } from "../../../utils/helpers/sortOptions";

export default function ShopFilters({ sort, onSortChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Mobile */}
      <label
        htmlFor="shop-drawer"
        className="btn btn-outline btn-sm lg:hidden w-full sm:w-auto"
      >
        <Filter size={16} />
        Categories
      </label>

      {/* Desktop Sort */}
      <div className="hidden lg:flex flex-wrap gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`btn btn-sm rounded-full transition-all ${
              sort === option.value
                ? "bg-gray-900 text-white"
                : "btn-ghost border border-base-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Mobile Sort */}
      <select
        className="select select-bordered w-full sm:w-56 lg:hidden"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
