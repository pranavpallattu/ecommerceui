import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const CategorySection = ({ category }) => {
  return (
    <div>
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {category.categoryName}
          </h2>

          {category.categoryOffer > 0 && (
            <p className="text-sm text-green-600 font-medium">
              {category.categoryOffer}% OFF
            </p>
          )}
        </div>

        <Link
          to={`/shop?category=${category.categoryId}`}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View all →
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {category.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
