import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import useUserWishlistStore from "../../../utils/stores/user/useWishlistStore";

const ProductCard = ({ product }) => {
  const { wishlistProducts, addtoWishlist, removeFromWishlist, loading } =
    useUserWishlistStore();

  // Safely check if product is in wishlist
  const isInWishlist =
    wishlistProducts?.some(
      (item) => item._id === product._id || item.productId?._id === product._id,
    ) || false;
  const discount =
    product.regularPrice > product.salePrice
      ? Math.round(
          ((product.regularPrice - product.salePrice) / product.regularPrice) *
            100,
        )
      : 0;

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

      <Link to={`/product/${product._id}`} className="block p-5">
        {/* Image */}
        <div className="w-full h-60 mb-4 rounded-lg overflow-hidden bg-gray-50">
          <img
            src={
              product.productImage?.[0]?.imageUrl ||
              "https://via.placeholder.com/300"
            }
            alt={product.productName}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Name */}
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-2">
          {product.productName}
        </h3>

        {/* Price */}
        <div className="flex items-end gap-2 mt-3">
          <span className="text-2xl font-bold">₹{product.salePrice}</span>

          {product.regularPrice > product.salePrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.regularPrice}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          {discount > 0 ? (
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {discount}% OFF
            </span>
          ) : (
            <div />
          )}

          {product.quantity <= 0 && (
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
              Out of Stock
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
