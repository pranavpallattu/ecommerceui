import { Link } from "react-router-dom";
import useProductStore from "../../../utils/stores/admin/useProductStore";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const { products, loading } = useProductStore();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(12)].map(
          (
            _,
            i, // 3 rows × 4 columns shimmer
          ) => (
            <div
              key={i}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg animate-pulse p-4 sm:p-6"
            >
              <div className="bg-gray-200 rounded-xl sm:rounded-2xl w-full h-40 sm:h-48 md:h-64 mb-3 sm:mb-4" />
              <div className="h-5 bg-gray-200 rounded w-4/5 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ),
        )}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20">
        <p className="text-xl sm:text-2xl text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/admin/products/${product._id}`}
          className="block group"
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
