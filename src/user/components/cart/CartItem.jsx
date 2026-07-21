import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, handleQuantity, removeFromCart }) => {
  const p = item.product;
  const lineTotal = item.price * item.quantity;
  const discount =
    p.regularPrice > item.price
      ? Math.round(((p.regularPrice - item.price) / p.regularPrice) * 100)
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 sm:p-5">
      <div className="flex gap-4">
        {/* Image */}
        <Link
          to={`/product/${p._id}`}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-50 shrink-0"
        >
          <img
            src={p.productImage?.[0]?.imageUrl}
            alt={p.productName}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <Link to={`/product/${p._id}`}>
            <h3 className="font-semibold text-lg hover:text-primary line-clamp-2">
              {p.productName}
            </h3>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xl font-bold">
              ₹{item.price.toLocaleString("en-IN")}
            </span>

            {discount > 0 && (
              <>
                <span className="text-sm line-through text-gray-400">
                  ₹{p.regularPrice.toLocaleString("en-IN")}
                </span>
                <span className="badge badge-success badge-sm">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Qty <b>{item.quantity}</b> • Total{" "}
            <b>₹{lineTotal.toLocaleString("en-IN")}</b>
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
            {/* Quantity */}
            <div className="join">
              <button
                onClick={() => handleQuantity(p._id, -1)}
                disabled={item.quantity === 1}
                className="btn btn-sm join-item"
              >
                <Minus size={15} />
              </button>

              <button className="btn btn-sm join-item pointer-events-none">
                {item.quantity}
              </button>

              <button
                onClick={() => handleQuantity(p._id, 1)}
                disabled={item.quantity >= p.quantity}
                className="btn btn-sm join-item"
              >
                <Plus size={15} />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(p._id)}
              className="btn btn-outline btn-error btn-sm"
            >
              <Trash2 size={15} />
              Remove
            </button>
          </div>

          {p.quantity <= 10 && (
            <span className="badge badge-warning mt-3">
              Only {p.quantity} left
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
