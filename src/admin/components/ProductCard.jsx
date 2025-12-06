// src/admin/components/products/ProductCard.jsx
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition overflow-hidden cursor-pointer border border-gray-100">
      <img
        src={product.productImage?.[0] || "/placeholder.jpg"}
        className="w-full h-56 object-cover"
      />

      <div className="p-6 space-y-3">
        <h3 className="text-lg font-bold text-gray-900 truncate">
          {product.productName}
        </h3>

        <p className="text-sm text-gray-500">
          {product.category?.name || "Uncategorized"}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ₹{product.salePrice?.toFixed(2)}
            </p>
            {product.regularPrice > product.salePrice && (
              <p className="text-sm text-gray-500 line-through">
                ₹{product.regularPrice}
              </p>
            )}
          </div>

          <span className="text-sm text-gray-700">
            {product.quantity} in stock
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
