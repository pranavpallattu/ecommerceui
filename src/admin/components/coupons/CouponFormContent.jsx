// src/admin/components/coupons/CouponFormContent.jsx
import { useEffect, useState } from "react";

export default function CouponFormContent({ editData, handleSubmit, closeModal }) {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        code: editData.code || "",
        description: editData.description || "",
        discountType: editData.discountType || "",
        discount: editData.discount?.toString() || "",           // ← convert number to string for input
        minPurchase: editData.minPurchase?.toString() || "",
        expiryDate: editData.expiryDate?.split("T")[0] || "",
        usageLimit: editData.usageLimit?.toString() || "",
        perUserLimit: editData.perUserLimit?.toString() || "",
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Convert number fields to actual numbers (or undefined/null if empty)
    const submitData = {
      ...form,
      discount: form.discount ? Number(form.discount) : undefined,
      minPurchase: form.minPurchase ? Number(form.minPurchase) : undefined,
      usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
      perUserLimit: form.perUserLimit ? Number(form.perUserLimit) : undefined,
    };

    try {
      await handleSubmit(submitData);
      // Modal will close automatically from store
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
      {/* Coupon Code */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          Coupon Code
        </label>
        <input
          type="text"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="input input-bordered w-full text-sm sm:text-base"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Discount Type */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          Discount Type
        </label>

        {editData ? (
          <input
            type="text"
            value={editData.discountType}
            disabled
            className="input input-bordered w-full bg-gray-200 text-sm sm:text-base"
            required
          />
        ) : (
          <select
            value={form.discountType}
            onChange={(e) => setForm({ ...form, discountType: e.target.value })}
            className="select select-bordered w-full text-sm sm:text-base"
            required
            disabled={isSubmitting}
          >
            <option value="">Select discount type</option>
            <option value="flat">Flat (₹)</option>
            <option value="percentage">Percentage (%)</option>
          </select>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="textarea textarea-bordered w-full h-24 sm:h-32 text-sm sm:text-base"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Discount Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Discount {form.discountType === "flat" ? "(₹)" : "(%)"}
          </label>
          <input
            type="number"
            min="0"
            value={form.discount}
            onChange={(e) => setForm({ ...form, discount: e.target.value })}
            className="input input-bordered w-full text-sm sm:text-base"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Minimum Purchase (₹)
          </label>
          <input
            type="number"
            min="0"
            value={form.minPurchase}
            onChange={(e) => setForm({ ...form, minPurchase: e.target.value })}
            className="input input-bordered w-full text-sm sm:text-base"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="sm:col-span-2 md:col-span-1">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="date"
            value={form.expiryDate}
            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            className="input input-bordered w-full text-sm sm:text-base"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Usage Limits Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Usage Limit (Total)
          </label>
          <input
            type="number"
            min="1"
            value={form.usageLimit}
            onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
            className="input input-bordered w-full text-sm sm:text-base"
            placeholder="Optional"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Per User Limit
          </label>
          <input
            type="number"
            min="1"
            value={form.perUserLimit}
            onChange={(e) => setForm({ ...form, perUserLimit: e.target.value })}
            className="input input-bordered w-full text-sm sm:text-base"
            placeholder="Optional"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
        <button
          type="button"
          onClick={closeModal}
          className="btn btn-ghost w-full sm:w-auto text-sm sm:text-base"
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button 
          type="submit" 
          className="btn btn-primary w-full sm:w-auto sm:px-8 text-sm sm:text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : (editData ? "Update Coupon" : "Add Coupon")}
        </button>
      </div>
    </form>
  );
}