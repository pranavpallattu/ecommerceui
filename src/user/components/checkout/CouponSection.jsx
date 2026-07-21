import { Tag, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const CouponSection = ({
  couponCode,
  setCouponCode,
  handleApplyCoupon,
  handleRemoveCoupon,
  couponLoading,
  checkoutData,
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
          disabled={checkoutData?.appliedCoupon}
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

      {checkoutData?.appliedCoupon && (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="badge badge-success badge-sm">
                  ✓ Coupon Applied
                </span>

                <span className="font-semibold text-green-800">
                  {checkoutData.appliedCoupon.code}
                </span>
              </div>

              <p className="mt-2 text-sm text-green-700">
                You saved{" "}
                <span className="font-semibold">
                  ₹{Number(checkoutData.discount).toFixed(2)}
                </span>
              </p>
            </div>

            <button
              onClick={handleRemoveCoupon}
              disabled={couponLoading}
              className="btn btn-ghost btn-circle btn-sm hover:bg-red-100"
            >
              <X size={18} className="text-red-600" />
            </button>
          </div>
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
