// src/admin/components/products/ProductCard.jsx
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden cursor-pointer border border-gray-100">
      <img
        src={product.productImage?.[0] || "/placeholder.jpg"}
        alt={product.productName}
        className="w-full h-40 sm:h-48 md:h-56 object-cover"
      />

      <div className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">
          {product.productName}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 truncate">
          {product.category?.name || "Uncategorized"}
        </p>

        <div className="flex justify-between items-center pt-1">
          <div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              ₹{product.salePrice?.toFixed(2)}
            </p>
            {product.regularPrice > product.salePrice && (
              <p className="text-xs sm:text-sm text-gray-500 line-through">
                ₹{product.regularPrice}
              </p>
            )}
          </div>

          <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">
            {product.quantity} in stock
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;