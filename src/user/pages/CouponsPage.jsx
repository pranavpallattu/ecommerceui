import { useEffect, useState } from "react";
import useCouponStore from "../../utils/stores/user/useCouponStore";

import CouponsHeader from "../components/coupons/CouponsHeader";
import CouponCard from "../components/coupons/CouponCard";
import CouponEmptyState from "../components/coupons/CouponEmptyState";

export default function CouponsPage() {
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
        <CouponsHeader />

        {availableCoupons?.length === 0 ? (
          <CouponEmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {availableCoupons?.map((coupon) => (
              <CouponCard
                key={coupon?._id}
                coupon={coupon}
                copiedCode={copiedCode}
                onCopy={handleCopy}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
