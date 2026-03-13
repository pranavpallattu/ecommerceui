// src/components/cart/EmptyCart.jsx
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">
        Your cart is empty
      </h3>
      <p className="text-gray-600 mb-8">
        Looks like you haven't added anything yet.
      </p>
      <Link to="/shop" className="btn btn-primary btn-lg px-10">
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;