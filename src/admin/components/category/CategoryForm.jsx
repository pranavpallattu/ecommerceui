import React, { useEffect, useState } from "react";

const CategoryForm = ({ isOpen, mode, initialData, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    offer: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialData) {
      setForm({
        name: initialData.name ?? "",
        description: initialData.description ?? "",
        offer: initialData.offer ?? "",
      });
    }

    if (mode === "add") {
      setForm({
        name: "",
        description: "",
        offer: "",
      });
    }
  }, [isOpen, mode, initialData?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in">
        <button
          onClick={onClose}
          disabled={submitting}
          className="btn btn-ghost btn-circle btn-sm sm:btn-md absolute top-4 right-4"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {mode === "edit" ? "Edit Category" : "Add New Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              autoComplete="off"
              maxLength={50}
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              maxLength={200}
              placeholder="Enter category description"
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              className="textarea textarea-bordered w-full"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              {form.description.length}/200
            </p>
          </div>
          {/* Offer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Offer (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              placeholder="Enter discount percentage (optional)"
              value={form.offer}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, offer: e.target.value }))
              }
              className="input input-bordered w-full"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-5 py-2.5 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? mode === "edit"
                  ? "Updating..."
                  : "Adding..."
                : mode === "edit"
                  ? "Update Category"
                  : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;