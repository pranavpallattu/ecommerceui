// src/components/WishlistCardAlt.jsx
import { X, ShoppingCart, Trash2 } from "lucide-react";

const WishlistCard = ({ product, onRemove, onAddToCart }) => {
  const inStock = product.quantity > 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100">

      <div className="flex items-center gap-6 p-6">
        {/* Image */}
        <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
          <img
            src={product.productImage?.[0] || "https://via.placeholder.com/200"}
            alt={product.productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-xl font-medium text-gray-900 line-clamp-2 mb-2">
            {product.productName}
          </h3>
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.salePrice}
            </span>
            {product.regularPrice > product.salePrice && (
              <span className="text-lg text-gray-500 line-through">
                ₹{product.regularPrice}
              </span>
            )}
          </div>
          <p className={`text-sm font-medium ${inStock ? "text-green-700" : "text-red-700"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onAddToCart}
            disabled={!inStock}
            className="btn btn-primary rounded-xl px-6 py-3 flex items-center gap-2 disabled:opacity-50"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>

          <button
            onClick={onRemove}
            className="btn btn-error rounded-xl px-6 py-3 flex items-center gap-2"
          >
            <Trash2 size={20} />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;