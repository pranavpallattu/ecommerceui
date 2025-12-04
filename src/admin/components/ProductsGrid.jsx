// src/admin/components/products/ProductGrid.jsx
import useProductStore from "../../utils/stores/productStore";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const { products, loading } = useProductStore();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-lg animate-pulse p-6">
            <div className="bg-gray-200 rounded-2xl w-full h-64 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-500">No products found</p>
        <p className="text-gray-400 mt-2">Add your first product!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
      {products.map((product) => (
        <Link key={product._id} to={`/admin/products/${product._id}`} className="group">
          <ProductCard  product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;