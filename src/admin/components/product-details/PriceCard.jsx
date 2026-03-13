// src/components/product-details/PriceCard.jsx
export default function PriceCard({ product }) {
  const hasDiscount = product.regularPrice > product.salePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
    : 0;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-7 border border-indigo-100 shadow-md">
      <p className="text-xs sm:text-sm text-indigo-700/80 font-medium mb-1 sm:mb-2">
        Selling Price
      </p>
      <div className="flex items-baseline gap-2 sm:gap-3 md:gap-4 flex-wrap">
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-indigo-900 tracking-tight">
          ₹{product.salePrice?.toLocaleString("en-IN") || "0"}
        </span>
        {hasDiscount && (
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl text-gray-500 line-through opacity-80">
              ₹{product.regularPrice?.toLocaleString("en-IN")}
            </span>
            <span className="text-base sm:text-lg md:text-xl font-bold text-green-700">
              {discountPercent}% OFF
            </span>
          </div>
        )}
      </div>
    </div>
  );
}