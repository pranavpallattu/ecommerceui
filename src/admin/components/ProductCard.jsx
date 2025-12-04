// src/admin/components/products/ProductCard.jsx
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const isOutOfStock = product.quantity === 0;

  return (
    <Link to={`/admin/products/${product._id}`} className="block">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50">
          <img
            src={product.productImage?.[0] || "https://via.placeholder.com/300"}
            alt={product.productName}
            className="w-full h-full object-cover"
          />

          {/* Status Badges */}
          {!product.isActive && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Hidden
              </span>
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1.5 rounded text-xs font-medium">
              Out of Stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-2">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
            {product.productName}
          </h3>

          <p className="text-sm text-gray-500">
            {product.category?.name || "Uncategorized"}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-gray-900">
                ₹{product.salePrice?.toFixed(2)}
              </p>
              {product.regularPrice > product.salePrice && (
                <p className="text-sm text-gray-400 line-through">
                  ₹{product.regularPrice}
                </p>
              )}
            </div>

            <span className={`text-sm font-medium ${isOutOfStock ? "text-red-600" : "text-gray-700"}`}>
              {product.quantity} in stock
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;