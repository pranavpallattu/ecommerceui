import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="border rounded-lg p-3 hover:shadow-md transition bg-white"
    >
      <img
        src={product?.productImage[0]}
        alt={product.productName}
        className="w-full h-40 object-contain mb-2"
      />

      <h3 className="text-sm font-medium text-gray-800 truncate">
        {product.productName}
      </h3>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-blue-600 font-bold">
          ₹{product.salePrice}
        </span>

        {product.regularPrice > product.salePrice && (
          <span className="text-gray-400 line-through text-sm">
            ₹{product.regularPrice}
          </span>
        )}
      </div>

      {product.quantity === 0 && (
        <p className="text-xs text-red-500 mt-1">Out of stock</p>
      )}
    </Link>
  );
};

export default ProductCard;
