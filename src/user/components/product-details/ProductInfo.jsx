// src/components/product-details/ProductInfo.jsx
import { Heart, Star, Package } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import useAuthStore from "../../../utils/stores/userAuthStore";

export default function ProductInfo({
  product,
  inStock,
  hasDiscount,
  discountPercent,
  isInWishlist,
  alreadyInCart,
  onAddToCart,
  onWishlistToggle,
  onBuyNow,
}) 
{
  const {user}=useAuthStore()

  return (
    <div className="space-y-8 order-1 lg:order-2">
      {/* Title & Wishlist */}
      <div className="flex justify-between items-start gap-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {product.productName}
        </h1>
        <button
          onClick={onWishlistToggle}
          className="btn btn-ghost btn-circle hover:bg-gray-100"
          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart
            size={22}
            className={`transition-all ${isInWishlist ? "text-red-500 fill-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

 

      {/* Stock */}
      <div className="flex items-center gap-3">
        {inStock ? (
          <div className="flex items-center gap-2 px-5 py-2.5 bg-green-50 text-green-700 rounded-full font-semibold">
            <Package size={18} />
            In Stock ({product.quantity} left)
          </div>
        ) : (
          <div className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-700 rounded-full font-semibold">
            <Package size={18} />
            Out of Stock
          </div>
        )}
      </div>

      {/* Price */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-blue-700">
            ₹{product.salePrice?.toLocaleString("en-IN")}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.regularPrice?.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        {hasDiscount && (
          <p className="mt-1 text-sm font-semibold text-green-600">
            {discountPercent}% off • Save ₹{(product.regularPrice - product.salePrice).toLocaleString("en-IN")}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">

        <AddToCartButton
          inStock={inStock}
          alreadyInCart={alreadyInCart}
          onAdd={onAddToCart}
        />

        <BuyNowButton inStock={inStock} onBuyNow={onBuyNow} />
      </div>
    </div>
  );
}