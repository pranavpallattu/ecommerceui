// src/components/cart/OrderSummary.jsx
import { Link } from "react-router-dom";

const OrderSummary = ({ cart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 top-8">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span className="font-medium">₹{cart?.subTotal || 0}</span>
        </div>

        {cart?.discount > 0 ? (
          <div className="flex justify-between text-lg">
            <span>Discount</span>
            <span className="font-medium text-green-600">
              -₹{cart.discount}
            </span>
          </div>
        ) : (
          <p className="text-sm text-blue-600 text-center mb-3 cursor-pointer hover:underline">
            🏷️ Coupons available — apply one to get a discount!
          </p>
        )}

        <div className="border-t pt-4">
          <div className="flex justify-between text-2xl font-bold">
            <span>Grand Total</span>
            <span>₹{cart?.finalTotal || 0}</span>
          </div>
        </div>
      </div>

      <Link to="/checkout">
        <button className="btn btn-primary btn-lg w-full mb-4">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default OrderSummary;