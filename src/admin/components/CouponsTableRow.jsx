// src/admin/components/customers/CustomerTableRow.jsx
import { Ban, CheckCircle, Edit3, Eye, EyeOff, IndianRupeeIcon, Percent, Trash2 } from "lucide-react";
import useCouponStore from "../../utils/stores/couponStore";
import { faPercentage } from "@fortawesome/free-solid-svg-icons";

const CouponsTableRow = ({ coupon }) => {
    const { openModal,updateCouponStatus, deleteCoupon  }=useCouponStore();
  return (
    <tr className="hover:bg-blue-50/30 transition-all duration-200">
      <td className="px-8 py-6">
        <div>
          <p className="font-semibold text-gray-900">{coupon.code}</p>
        </div>
      </td>

      <td className="px-8 py-6 text-gray-700 font-medium">
        {coupon.description}
      </td>
      <td className="px-8 py-6 text-gray-600">{coupon.discountType  || "—"} </td>
   <td className="px-8 py-6 text-gray-600 flex items-center mt-9">
  {coupon.discount ? (
    <>
      {coupon.discount}{coupon.discountType === "flat" ? (<IndianRupeeIcon className="w-4 h-4" />
      ) : (
        <Percent className="w-4 h-4" />
      )}
    </>
  ) : (
    "—"
  )}
</td>

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
      <td className="px-8 py-6 text-gray-600">{new Date(coupon.expiryDate).toLocaleDateString() || "—"}</td>
      <td className="px-8 py-6 text-gray-600">{coupon.usageLimit || "—"}</td>
      <td className="px-8 py-6 text-gray-600">{coupon.perUserLimit || "—"}</td>
            <td className="px-8 py-6 text-gray-600">{coupon.usedCount || "—"}</td>

   <td className="px-8 py-6">
        {
          coupon.isActive? <span className="inline-flex items-center py-2 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800">
  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
  Active
</span>
:
<span className="inline-flex items-center py-2 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800">
  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
  Inactive
</span>
        }
      </td>
      <td className="px-8 py-6">
        <div className="flex justify-center gap-4">
          <button onClick={()=>updateCouponStatus(coupon._id)} className="btn btn-ghost btn-xs">
            {coupon.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button onClick={() => openModal(coupon)} className="btn btn-ghost btn-xs">
            <Edit3 size={18} />
          </button>
          <button onClick={() => deleteCoupon(coupon._id)} className="btn btn-ghost btn-xs">
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CouponsTableRow;
