// src/components/WishlistCardAlt.jsx
import { X, ShoppingCart, Trash2 } from "lucide-react";

const WishlistCardAlt = ({ product, onRemove, onAddToCart }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex items-center gap-6 p-6">
        {/* Product Image */}
        <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
          <img
            src={product.productImage?.[0] || "https://via.placeholder.com/200"}
            alt={product.productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h3 className="text-xl font-medium text-gray-900 line-clamp-2 mb-2">
            {product.productName}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.salePrice?.toFixed(0)}
            </span>
            {product.regularPrice > product.salePrice && (
              <span className="text-lg text-gray-500 line-through">
                ₹{product.regularPrice}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <p className={`text-sm font-medium ${product.quantity > 0 ? "text-green-700" : "text-red-700"}`}>
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-shrink-0">
          {/* Add to Cart */}
          <button
            onClick={onAddToCart}
            disabled={product.quantity === 0}
            className="btn btn-primary rounded-xl px-6 py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>

          {/* Remove from Wishlist (Always Visible) */}
          <button
            onClick={onRemove}
            className="btn btn-primary rounded-xl px-6 py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={20} />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCardAlt;