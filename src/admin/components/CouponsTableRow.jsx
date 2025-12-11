// src/admin/components/customers/CustomerTableRow.jsx
import {
  Ban,
  CheckCircle,
  Edit3,
  Eye,
  EyeOff,
  IndianRupeeIcon,
  Percent,
  Trash2,
} from "lucide-react";
import useCouponStore from "../../utils/stores/couponStore";

const CouponsTableRow = ({ coupon }) => {
  const { openModal, updateCouponStatus, deleteCoupon } = useCouponStore();

  return (
    <tr className="hover:bg-blue-50/40 transition-all duration-150 border-b">
      {/* Coupon Code */}
      <td className="px-8 py-6">
        <p className="font-semibold text-gray-900">{coupon.code}</p>
      </td>

      {/* Description */}
      <td className="px-8 py-6 text-gray-700">{coupon.description}</td>

      {/* Discount Type */}
      <td className="px-8 py-6 text-gray-600 capitalize">
        {coupon.discountType || "—"}
      </td>

      {/* Discount */}
      <td className="px-8 py-6 text-gray-600">
        {coupon.discount ? (
          <span className="flex items-center gap-1">
            {coupon.discount}
            {coupon.discountType === "flat" ? (
              <IndianRupeeIcon className="w-4 h-4" />
            ) : (
              <Percent className="w-4 h-4" />
            )}
          </span>
        ) : (
          "—"
        )}
      </td>

      {/* Min Purchase */}
      <td className="px-8 py-6 text-gray-600">
        {coupon.minPurchase ? (
          <span className="flex items-center gap-1">
            {coupon.minPurchase}
            <IndianRupeeIcon className="w-4 h-4" />
          </span>
        ) : (
          "—"
        )}
      </td>

      {/* Expiry Date */}
      <td className="px-8 py-6 text-gray-600">
        {coupon.expiryDate
          ? new Date(coupon.expiryDate).toLocaleDateString()
          : "—"}
      </td>

      {/* Usage Limit */}
      <td className="px-8 py-6 text-gray-600">{coupon.usageLimit || "—"}</td>

      {/* Per User Limit */}
      <td className="px-8 py-6 text-gray-600">{coupon.perUserLimit || "—"}</td>

      {/* Used Count */}
      <td className="px-8 py-6 text-gray-600">{coupon.usedCount || "—"}</td>

      {/* Status */}
      <td className="px-8 py-6">
        {coupon.isActive ? (
          <span className="inline-flex items-center py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
            Active
          </span>
        ) : (
          <span className="inline-flex items-center py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
            Inactive
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="px-8 py-6">
        <div className="flex justify-center gap-3">
          <button
            onClick={() => updateCouponStatus(coupon._id)}
            className="btn btn-ghost btn-xs"
          >
            {coupon.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          <button
            onClick={() => openModal(coupon)}
            className="btn btn-ghost btn-xs"
          >
            <Edit3 size={18} />
          </button>

          <button
            onClick={() => deleteCoupon(coupon._id)}
            className="btn btn-ghost btn-xs"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CouponsTableRow;
