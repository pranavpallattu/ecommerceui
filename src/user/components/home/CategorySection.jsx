import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

const CategorySection = ({ category }) => {
  const categoryName =
    category.categoryName.charAt(0).toUpperCase() +
    category.categoryName.slice(1);

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            {categoryName}
          </h2>

          {category.categoryOffer > 0 && (
            <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
              {category.categoryOffer}% OFF
            </span>
          )}
        </div>

        <Link
          to={`/shop?category=${category.categoryId}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          View all →
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {category.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
