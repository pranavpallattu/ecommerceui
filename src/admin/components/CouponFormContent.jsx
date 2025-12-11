// src/admin/components/coupons/CouponFormContent.jsx
import { useEffect, useState } from "react";
import useCouponStore from "../../utils/stores/couponStore";

const CouponFormContent = () => {
  const { editData, handleSubmit, closeModal } = useCouponStore();

  const [form, setForm] = useState({
    code: "",
    description: "",
    discountType: "",
    discount: "",
    minPurchase: "",
    expiryDate: "",
    usageLimit: "",
    perUserLimit: "",
  });

  // Fill form in edit mode
  useEffect(() => {
    if (editData) {
      setForm({
        code: editData.code || "",
        description: editData.description || "",
        discountType: editData.discountType || "",   // ✅ FIXED
        discount: editData.discount || "",
        minPurchase: editData.minPurchase || "",
        expiryDate: editData.expiryDate?.split("T")[0] || "",
        usageLimit: editData.usageLimit || "",
        perUserLimit: editData.perUserLimit || "",
      });
    } else {
      setForm({
        code: "",
        description: "",
        discountType: "",
        discount: "",
        minPurchase: "",
        expiryDate: "",
        usageLimit: "",
        perUserLimit: "",
      });
    }
  }, [editData]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(form);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Coupon Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Coupon Code
        </label>
        <input
          type="text"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Discount Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Discount Type
        </label>

        {editData ? (
          <input
            type="text"
            value={editData.discountType}
            disabled
            className="input input-bordered w-full bg-gray-200 p-2"
            required
          />
        ) : (
          <select
            value={form.discountType}
            onChange={(e) =>
              setForm({ ...form, discountType: e.target.value })
            }
            className="select select-bordered w-full"
            required
          >
            <option value="">Select discount type</option>
            <option value="flat">Flat (₹)</option>
            <option value="percentage">Percentage (%)</option>
          </select>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="textarea textarea-bordered w-full h-32"
          required
        />
      </div>

      {/* Discount Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount{" "}
            {form.discountType === "flat" ? "(₹)" : "(%)"}
          </label>
          <input
            type="number"
            min="0"
            value={form.discount}
            onChange={(e) =>
              setForm({ ...form, discount: e.target.value })
            }
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Minimum Purchase */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Purchase (₹)
          </label>
          <input
            type="number"
            min="0"
            value={form.minPurchase}
            onChange={(e) =>
              setForm({ ...form, minPurchase: e.target.value })
            }
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="date"
            value={form.expiryDate}
            onChange={(e) =>
              setForm({ ...form, expiryDate: e.target.value })
            }
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>

      {/* Usage Limits Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Usage Limit (Total)
          </label>
          <input
            type="number"
            min="1"
            value={form.usageLimit}
            onChange={(e) =>
              setForm({ ...form, usageLimit: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Per User Limit
          </label>
          <input
            type="number"
            min="1"
            value={form.perUserLimit}
            onChange={(e) =>
              setForm({ ...form, perUserLimit: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={closeModal}
          className="btn btn-ghost"
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-primary px-8">
          {editData ? "Update Coupon" : "Add Coupon"}
        </button>
      </div>
    </form>
  );
};

export default CouponFormContent;
