import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSummary = ({ cart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{Number(cart?.subTotal || 0).toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-success font-medium">FREE</span>
        </div>

        {cart?.appliedCoupon ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm font-semibold text-green-700">
              ✓ {cart.appliedCoupon.code} Applied
            </p>
            <p className="text-sm text-green-600">
              Saved ₹{Number(cart.discount).toLocaleString("en-IN")}
            </p>
          </div>
        ) : (
          <Link to="/checkout" className="text-sm text-primary hover:underline">
            🏷 Apply coupon during checkout →
          </Link>
        )}

        <div className="border-t pt-4 flex justify-between text-xl font-bold">
          <span>Grand Total</span>
          <span>₹{Number(cart?.finalTotal || 0).toLocaleString("en-IN")}</span>
        </div>
      </div>

      <Link to="/checkout" className="btn btn-primary btn-lg w-full">
        Proceed to Checkout • ₹
        {Number(cart?.finalTotal || 0).toLocaleString("en-IN")}
      </Link>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <ShieldCheck size={18} className="text-green-600" />
        <span>Secure Checkout • 100% Safe Payments</span>
      </div>

      <Link to="/shop" className="btn btn-ghost w-full mt-3">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSummary;
