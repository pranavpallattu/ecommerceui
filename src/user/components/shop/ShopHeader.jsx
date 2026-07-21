import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function ShopHeader({ search, category, shopCategories }) {
  const categoryName = shopCategories?.find((c) => c._id === category)?.name;

  return (
    <header className="bg-white border-b border-gray-200 py-5">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to={"/shop"}>
            <span
              className={
                category === "all" && !search ? "text-gray-900 font-medium" : ""
              }
            >
              Shop
            </span>
          </Link>
          {category !== "all" && categoryName && (
            <>
              <ChevronRight size={14} />
              <span className="text-gray-900 font-medium">{categoryName}</span>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
