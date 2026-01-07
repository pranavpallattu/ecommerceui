// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import useUserWishlistStore from "../../utils/stores/WishlistStore";

const ProductCard = ({ product }) => {
  const { wishlistProducts, addtoWishlist, removeFromWishlist, loading } = useUserWishlistStore();

  // Safely check if product is in wishlist
  const isInWishlist = wishlistProducts?.some(
    (item) => item._id === product._id || item.productId?._id === product._id
  ) || false;

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id);
      } else {
        await addtoWishlist(product._id);
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Wishlist Heart */}
      <button
        onClick={handleWishlistToggle}
        disabled={loading}
        className="absolute top-3 right-3 z-10 btn btn-circle btn-ghost btn-sm hover:bg-red-50 transition-all disabled:opacity-50"
      >
        <Heart
          size={20}
          className={`transition-all ${
            isInWishlist
              ? "fill-red-500 text-red-500 scale-110"
              : "text-gray-600 hover:text-red-500"
          }`}
        />
      </button>

      <Link to={`/product/${product._id}`} className="block p-4">
        {/* Image */}
        <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-50">
          <img
            src={product.productImage?.[0] || "https://via.placeholder.com/300"}
            alt={product.productName}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Name */}
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-2">
          {product.productName}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.salePrice}
          </span>
          {product.regularPrice > product.salePrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.regularPrice}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.quantity === 0 && (
          <p className="text-sm text-red-600 font-medium">Out of Stock</p>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;