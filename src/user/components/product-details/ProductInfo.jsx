import { Heart, Star, Package } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import { useState } from "react";

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
}) {
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 180;
  const shouldTruncate = product.description.length > MAX_LENGTH;

  return (
    <div className="space-y-8">
      {/* Title & Wishlist */}
      <div className="pb-6 border-b">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <h1 className="flex-1 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight break-words">
            {product.productName}
          </h1>

          <button
            onClick={onWishlistToggle}
            className=" top-4 right-4 lg:flex w-11 h-11 rounded-full bg-white/95 shadow-lg border border-gray-200 flex items-center justify-center hover:scale-105 transition"
            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart
              size={22}
              className={`transition-all ${
                isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="pb-6 border-b">
        <div className="flex flex-wrap items-end gap-2 sm:gap-3">
          <h2 className="text-3xl sm:text-4xl font-bold">
            {" "}
            ₹{product.salePrice.toLocaleString("en-IN")}
          </h2>

          {hasDiscount && (
            <>
              <span className="text-base sm:text-lg text-gray-400 line-through">
                {" "}
                ₹{product.regularPrice.toLocaleString("en-IN")}
              </span>

              <span className="badge badge-success">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {hasDiscount && (
          <p className="text-green-600 text-sm mt-2">
            You save ₹
            {(product.regularPrice - product.salePrice).toLocaleString("en-IN")}
          </p>
        )}
      </div>

      {/* Stock */}
      <div className="flex flex-wrap items-center gap-3">
        {" "}
        {inStock ? (
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <Package size={18} />
            In Stock
            <span className="text-gray-500">({product.quantity} left)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-700 rounded-full font-semibold">
            <Package size={18} />
            Out of Stock
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="pt-6 border-t space-y-3">
        {" "}
        <div className="flex flex-col sm:flex-row gap-3">
          <AddToCartButton
            inStock={inStock}
            alreadyInCart={alreadyInCart}
            onAdd={onAddToCart}
          />

          <BuyNowButton inStock={inStock} onBuyNow={onBuyNow} />
        </div>
      </div>
      <div>
        <p className="text-gray-600 text-sm sm:text-base leading-7 whitespace-pre-line break-words">
          {" "}
          {expanded || !shouldTruncate
            ? product.description
            : `${product.description.slice(0, MAX_LENGTH)}...`}
        </p>

        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-primary font-medium hover:underline"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
}
