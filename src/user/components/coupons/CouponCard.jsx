import { Copy, Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CouponCard({ coupon, copiedCode, onCopy, formatDate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleCopy = async () => {
    await onCopy(coupon?.code);
    setTimeout(() => {
      navigate(location.state?.from || "/cart");
    }, 700);
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Coupon Header - Dotted Pattern */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 relative">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 10px 10px, white 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="relative z-10">
          {/* Coupon Code + Copy */}
          <div className="flex items-center justify-between mb-3">
            <code className="text-2xl font-bold tracking-wider">
              {coupon?.code}
            </code>
            <button
              onClick={handleCopy}
              className="btn btn-ghost btn-circle btn-sm text-white hover:bg-white/20"
            >
              {copiedCode === coupon?.code ? (
                <Check size={20} />
              ) : (
                <Copy size={20} />
              )}
            </button>
          </div>

          {/* Discount Highlight */}
          <p className="text-3xl font-bold">
            {coupon?.discountType === "percentage"
              ? `${coupon?.discount}% OFF`
              : `₹${coupon?.discount} OFF`}
          </p>
        </div>
      </div>

      {/* Coupon Body */}
      <div className="p-6 space-y-4">
        <p className="text-gray-700 text-lg leading-relaxed break-words line-clamp-5 min-h-[84px]">
          {coupon?.description}
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Minimum Purchase</span>
            <span className="font-medium">₹{coupon?.minPurchase}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Expires on</span>
            <span className="font-medium">
              {formatDate(coupon?.expiryDate)}
            </span>
          </div>

          {coupon?.usageLimit && (
            <div className="flex justify-between">
              <span className="text-gray-600">Usage Limit</span>
              <span className="font-medium">
                {coupon?.usedCount}/{coupon?.usageLimit} used
              </span>
            </div>
          )}

          {coupon?.perUserLimit && (
            <div className="flex justify-between">
              <span className="text-gray-600">Per User Limit</span>
              <span className="font-medium">{coupon?.perUserLimit} times</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={handleCopy}
            className="btn btn-outline btn-primary w-full rounded-xl"
          >
            {copiedCode === coupon?.code
              ? "Copied! Returning..."
              : "Copy Code & Return"}
          </button>
        </div>
      </div>
    </div>
  );
}
