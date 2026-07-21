import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

export default function Breadcrumb({ productName }) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
            <Home size={16} />
            Home
          </Link>
          <ChevronRight size={16} />
          <Link to="/shop" className="hover:text-blue-600">
            Shop
          </Link>
          <ChevronRight size={16} />
          <span className="font-medium text-gray-900">{productName}</span>
        </nav>
      </div>
    </div>
  );
}
