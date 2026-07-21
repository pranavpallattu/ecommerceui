export default function PriceCard({ product }) {
  const hasDiscount = product.regularPrice > product.salePrice;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.regularPrice - product.salePrice) / product.regularPrice) *
          100,
      )
    : 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-bold text-gray-900">Pricing Details</h3>
        <p className="text-sm text-gray-500">Product pricing information</p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        {/* Sale Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">Selling Price</p>
            <h2 className="text-5xl font-black text-blue-700">
              ₹{product.salePrice.toLocaleString("en-IN")}
            </h2>
          </div>

          {hasDiscount && (
            <span className="bg-blue-50 text-blue-700 border border-blue-200 font-semibold text-sm px-3 py-1.5 rounded-full">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Regular Price</span>
            <span className="font-semibold text-gray-900">
              ₹{product.regularPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Product Offer</span>
            <span className="font-semibold text-gray-900">
              {product.offer || 0}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Category Offer</span>
            <span className="font-semibold text-gray-900">
              {product.category?.offer || 0}%
            </span>
          </div>

          <div className="flex justify-between border-t border-gray-100 pt-3">
            <span className="font-medium text-gray-700">Applied Discount</span>
            <span className="font-bold text-blue-700">{discountPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
