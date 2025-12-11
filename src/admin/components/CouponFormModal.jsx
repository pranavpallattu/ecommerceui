// src/admin/components/products/ProductFormModal.jsx
import useCouponStore from "../../utils/stores/couponStore";
import CouponFormContent from "./CouponFormContent";

const CouponFormModal = () => {
  const { isModalOpen, closeModal } = useCouponStore();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {useCouponStore.getState().editData ? "Edit Coupon" : "Add New Coupon"}
          </h2>
          <button
            onClick={closeModal}
            className="btn btn-ghost btn-circle"
          >
            X
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <CouponFormContent />
        </div>
      </div>
    </div>
  );
};

export default CouponFormModal
;