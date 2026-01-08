// src/pages/CouponsPage.jsx
import { useEffect, useState } from "react";
import { Copy, Check, Tag } from "lucide-react";
import useCouponStore from "../../utils/stores/useCouponStore";

const CouponsPage = () => {
  const { availableCoupons, loading, fetchAvailableCoupons } = useCouponStore();
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    fetchAvailableCoupons();
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Available Coupons
          </h1>
          <p className="text-xl text-gray-600">
            Save more on your favorite products
          </p>
        </div>

        {availableCoupons.length === 0 ? (
          <div className="text-center py-20">
            <Tag size={64} className="text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-medium text-gray-700 mb-4">
              No active coupons right now
            </h3>
            <p className="text-gray-600">
              Check back later for exciting offers!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {availableCoupons.map((coupon) => (
              <div
                key={coupon._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Coupon Header - Dotted Pattern */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 relative">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 10px 10px, white 1px, transparent 0)`,
                      backgroundSize: "20px 20px"
                    }}></div>
                  </div>

                  <div className="relative z-10">
                    {/* Coupon Code + Copy */}
                    <div className="flex items-center justify-between mb-3">
                      <code className="text-2xl font-bold tracking-wider">
                        {coupon.code}
                      </code>
                      <button
                        onClick={() => handleCopy(coupon.code)}
                        className="btn btn-ghost btn-circle btn-sm text-white hover:bg-white/20"
                      >
                        {copiedCode === coupon.code ? (
                          <Check size={20} />
                        ) : (
                          <Copy size={20} />
                        )}
                      </button>
                    </div>

                    {/* Discount Highlight */}
                    <p className="text-3xl font-bold">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discount}% OFF`
                        : `₹${coupon.discount} OFF`}
                    </p>
                  </div>
                </div>

                {/* Coupon Body */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {coupon.description}
                  </p>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Purchase</span>
                      <span className="font-medium">₹{coupon.minPurchase}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires on</span>
                      <span className="font-medium">{formatDate(coupon.expiryDate)}</span>
                    </div>

                    {coupon.usageLimit && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Usage Limit</span>
                        <span className="font-medium">
                          {coupon.usedCount}/{coupon.usageLimit} used
                        </span>
                      </div>
                    )}

                    {coupon.perUserLimit && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Per User Limit</span>
                        <span className="font-medium">{coupon.perUserLimit} times</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="btn btn-outline btn-primary w-full rounded-xl"
                    >
                      {copiedCode === coupon.code ? "Copied!" : "Copy Code & Shop Now"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsPage;