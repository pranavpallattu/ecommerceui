// src/components/cart/CartItem.jsx
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, handleQuantity, removeFromCart }) => {
  const p = item.product;
  const lineTotal = item.price * item.quantity;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex gap-6 hover:shadow-md transition">
      <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
        <Link to={`/product/${p._id}`}>
          <img
            src={p.productImage?.[0] || "https://via.placeholder.com/200"}
            alt={p.productName}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          {p.productName}
        </h3>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-lg font-semibold">₹{item.price}</span>
          <span className="text-sm text-gray-500">
            × {item.quantity} ={" "}
            <span className="font-bold">₹{lineTotal}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantity(p._id, -1)}
            className="btn btn-outline btn-circle btn-sm"
          >
            <Minus size={18} />
          </button>

          <span className="text-lg font-bold w-12 text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => handleQuantity(p._id, 1)}
            className="btn btn-outline btn-circle btn-sm"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(p._id)}
        className="btn btn-ghost btn-circle hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={22} />
      </button>
    </div>
  );
};

export default CartItem;