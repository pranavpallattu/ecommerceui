import { X, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import useCartStore from "../../../utils/stores/user/useCartStore";

const WishlistCard = ({ product, onRemove, onAddToCart }) => {
  const { cartProducts } = useCartStore();
  const alreadyInCart = cartProducts?.items?.some(
    (item) => item?.product?._id == product?._id,
  );

  const inStock = product?.quantity > 0;

  const discount =
    product?.regularPrice > product?.salePrice
      ? Math.round(
          ((product?.regularPrice - product?.salePrice) /
            product?.regularPrice) *
            100,
        )
      : 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100">
      {/* Responsive Layout */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6">
        {/* Image */}
        <div className="w-full sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
          <Link to={`/product/${product?._id}`}>
            <img
              src={
                product?.productImage?.[0]?.imageUrl ||
                "https://via.placeholder.com/200"
              }
              alt={product?.productName}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>

        {/* Info */}
        <div className="flex-1 w-full">
          <h3 className="text-lg sm:text-xl font-medium">
            {product?.productName}
          </h3>

          <div className="flex items-baseline gap-2 sm:gap-3 mb-2 sm:mb-3">
            <span className="text-xl font-bold">₹{product?.salePrice}</span>
            {discount > 0 && (
              <>
                {product?.regularPrice > product?.salePrice && (
                  <span className="text-sm sm:text-lg text-gray-500 line-through">
                    ₹{product?.regularPrice}
                  </span>
                )}

                <span className="badge badge-success badge-sm">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <span
            className={`badge badge-outline ${
              inStock ? "badge-success" : "badge-error"
            }`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          {alreadyInCart ? (
            <Link to={"/cart"} className="w-full sm:w-auto">
              <button
                disabled={!inStock}
                className="btn btn-primary rounded-xl px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-40 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                <span>Go to Cart</span>
              </button>
            </Link>
          ) : (
            <button
              onClick={onAddToCart}
              disabled={!inStock}
              className="btn btn-primary rounded-xl px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-40 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
          )}

          <button
            onClick={onRemove}
            className="btn btn-error text-white rounded-xl px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
