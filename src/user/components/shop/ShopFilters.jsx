// src/components/shop/ShopFilters.jsx
import { Filter } from "lucide-react";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "priceLowToHigh", label: "Price Low to High" },
  { value: "priceHighToLow", label: "Price High to Low" },
  { value: "newArrivals", label: "Newest" },
  { value: "nameAtoZ", label: "A to Z" },
  { value: "nameZtoA", label: "Z to A" },
];

export default function ShopFilters({ sort, onSortChange }) {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <label htmlFor="shop-drawer" className="btn btn-ghost lg:hidden flex items-center gap-2 text-gray-700">
          <Filter size={20} />
          Filters
        </label>

        {/* Desktop Sort */}
        <ul className="menu menu-horizontal bg-transparent p-0 hidden lg:flex">
          {sortOptions.map((opt) => (
            <li key={opt.value}>
              <a
                onClick={() => onSortChange(opt.value)}
                className={`text-gray-700 font-medium hover:text-blue-600 px-4 py-2 rounded-none border-b-2 transition-all ${
                  sort === opt.value ? "border-blue-600 text-blue-600" : "border-transparent"
                }`}
              >
                {opt.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Sort Dropdown */}
        <select
          className="select select-bordered w-full lg:hidden"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}