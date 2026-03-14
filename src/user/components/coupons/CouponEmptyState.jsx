// src/components/coupons/CouponEmptyState.jsx
import { Tag } from "lucide-react";

export default function CouponEmptyState() {
  return (
    <div className="text-center py-20">
      <Tag size={64} className="text-gray-300 mx-auto mb-6" />
      <h3 className="text-2xl font-medium text-gray-700 mb-4">
        No active coupons right now
      </h3>
      <p className="text-gray-600">
        Check back later for exciting offers!
      </p>
    </div>
  );
}