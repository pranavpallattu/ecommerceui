// src/admin/components/products/ProductGrid.jsx
import useProductStore from "../../utils/stores/productStore";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const { products, loading } = useProductStore();

  if (loading) {
    return (
      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl sm:rounded-3xl shadow-lg animate-pulse p-4 sm:p-6">
            <div className="bg-gray-200 rounded-xl sm:rounded-2xl w-full h-40 sm:h-48 md:h-64 mb-3 sm:mb-4"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20">
        <p className="text-xl sm:text-2xl text-gray-500">No products found</p>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">Add your first product!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 sm:gap-6 md:gap-8">
      {products.map((product) => (
        <Link key={product._id} to={`/admin/products/${product._id}`} className="group">
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;