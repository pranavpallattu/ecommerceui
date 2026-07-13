// src/components/cart/CouponSection.jsx
import { Tag, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const CouponSection = ({
  couponCode,
  setCouponCode,
  handleApplyCoupon,
  handleRemoveCoupon,
  couponLoading,
  cart,
}) => {
  const location = useLocation();
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Tag size={22} />
        Apply Coupon
      </h3>

      <div className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="input input-bordered flex-1 rounded-xl"
        />
        <button
          onClick={handleApplyCoupon}
          disabled={couponLoading || !couponCode.trim()}
          className="btn btn-outline rounded-xl min-w-[92px]"
        >
          {couponLoading ? "Applying..." : "Apply"}
        </button>
      </div>

      {cart?.appliedCoupon && (
        <div className="mt-4 p-4 bg-green-50 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-green-800 font-medium">
              {cart.appliedCoupon.code} applied
            </span>
            <p className="text-sm text-green-700">Saved ₹{cart.discount}</p>
          </div>

          <button
            onClick={handleRemoveCoupon}
            disabled={couponLoading}
            className="btn btn-ghost btn-circle btn-sm hover:bg-red-100"
          >
            <X size={18} className="text-red-600" />
          </button>
        </div>
      )}

      <Link
        to="/coupons"
        state={{ from: location.pathname }}
        className="block text-center mt-4 text-blue-600 hover:underline text-sm"
      >
        View available coupons →
      </Link>
    </div>
  );
};

export default CouponSection;
