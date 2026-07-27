const ProductCard = ({ product }) => {
  const discount =
    product.regularPrice > product.salePrice
      ? Math.round(
          ((product.regularPrice - product.salePrice) /
            product.regularPrice) *
            100
        )
      : 0;

  return (
 <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[440px]">
  <div className="relative h-60 bg-gray-50 shrink-0 overflow-hidden">
    <img
      src={product.productImage?.[0]?.imageUrl || "/placeholder.jpg"}
      alt={product.productName}
      className="w-full h-full object-cover"
    />

    <span
      className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
        product.status === "Available"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {product.status}
    </span>
  </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">
          {product.productName}
        </h3>

        <div className="mt-2 flex items-center gap-2 flex-wrap min-h-[32px]">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.salePrice.toFixed(2)}
          </span>

          {discount > 0 && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ₹{product.regularPrice.toFixed(2)}
              </span>

              <span className="text-xs font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Push footer to bottom */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">
              {product.quantity}
            </span>{" "}
            in stock
          </span>

          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              product.isActive
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {product.isActive ? "Listed" : "Unlisted"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;