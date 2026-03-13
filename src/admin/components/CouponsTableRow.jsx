// src/admin/components/coupons/CouponsTableRow.jsx
import {
  Edit3,
  Eye,
  EyeOff,
  IndianRupee,
  Percent,
  Trash2,
} from "lucide-react";
import useCouponStore from "../../utils/stores/couponStore";
import useConfirmModalStore from "../../utils/stores/useConfirmModalStore";

const CouponsTableRow = ({ coupon }) => {
  const { openModal, updateCouponStatus, deleteCoupon } = useCouponStore();
  const { openConfirm } = useConfirmModalStore();

  return (
    <tr className="hover:bg-blue-50/40 transition-all duration-150 border-b">
      {/* Coupon Code */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <p className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base whitespace-nowrap">
          {coupon.code}
        </p>
      </td>

      {/* Description */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <p className="text-gray-700 text-xs sm:text-sm max-w-[200px] truncate" title={coupon.description}>
          {coupon.description}
        </p>
      </td>

      {/* Discount Type */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <span className="text-gray-600 capitalize text-xs sm:text-sm whitespace-nowrap">
          {coupon.discountType || "—"}
        </span>
      </td>

      {/* Discount */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        {coupon.discount ? (
          <span className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
            {coupon.discount}
            {coupon.discountType === "flat" ? (
              <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4" />
            ) : (
              <Percent className="w-3 h-3 sm:w-4 sm:h-4" />
            )}
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>

      {/* Min Purchase */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-center">
        {coupon.minPurchase ? (
          <span className="inline-flex items-center gap-1 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
            {coupon.minPurchase}
            <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>

      {/* Expiry Date */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-center">
        <span className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">
          {coupon.expiryDate
            ? new Date(coupon.expiryDate).toLocaleDateString()
            : "—"}
        </span>
      </td>

      {/* Usage Limit */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-center">
        <span className="text-gray-600 text-xs sm:text-sm">{coupon.usageLimit || "—"}</span>
      </td>

      {/* Per User Limit */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-center">
        <span className="text-gray-600 text-xs sm:text-sm">{coupon.perUserLimit || "—"}</span>
      </td>

      {/* Used Count */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-center">
        <span className="text-gray-600 text-xs sm:text-sm">{coupon.usedCount || "0"}</span>
      </td>

      {/* Status */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <div className="flex justify-center">
          {coupon.isActive ? (
            <span className="inline-flex items-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-700 whitespace-nowrap">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 mr-1 sm:mr-2"></span>
              Active
            </span>
          ) : (
            <span className="inline-flex items-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-full text-[10px] sm:text-xs font-medium bg-red-100 text-red-700 whitespace-nowrap">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500 mr-1 sm:mr-2"></span>
              Inactive
            </span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <div className="flex justify-center gap-1 sm:gap-2 md:gap-3">
          {/* Activate / Deactivate */}
          <button
            className="btn btn-ghost btn-xs p-1 sm:p-2 min-h-0 h-auto"
            onClick={() =>
              openConfirm({
                title: coupon.isActive
                  ? "Deactivate Coupon?"
                  : "Activate Coupon?",
                message: coupon.isActive
                  ? "This coupon will no longer be usable by customers."
                  : "This coupon will become active and usable.",
                confirmText: coupon.isActive
                  ? "Deactivate"
                  : "Activate",
                confirmVariant: coupon.isActive
                  ? "error"
                  : "success",
                onConfirm: () => updateCouponStatus(coupon._id),
              })
            }
            aria-label={coupon.isActive ? "Deactivate" : "Activate"}
          >
            {coupon.isActive ? (
              <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" />
            ) : (
              <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
            )}
          </button>

          {/* Edit */}
          <button
            onClick={() => openModal(coupon)}
            className="btn btn-ghost btn-xs p-1 sm:p-2 min-h-0 h-auto"
            aria-label="Edit"
          >
            <Edit3 size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          {/* Delete */}
          <button
            className="btn btn-ghost btn-xs p-1 sm:p-2 min-h-0 h-auto"
            onClick={() =>
              openConfirm({
                title: "Delete Coupon?",
                message: "This action is permanent and cannot be undone.",
                confirmText: "Delete",
                confirmVariant: "error",
                onConfirm: () => deleteCoupon(coupon._id),
              })
            }
            aria-label="Delete"
          >
            <Trash2 size={16} className="sm:w-[18px] sm:h-[18px] text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CouponsTableRow;