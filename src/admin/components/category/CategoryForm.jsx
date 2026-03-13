import React, { useEffect, useState } from "react";

const CategoryForm = ({
  isOpen,
  mode,            // "add" | "edit"
  initialData,     // category object or null
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    offer: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // ✅ Sync form safely when modal opens
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

  // ✅ Controlled submit
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
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-bold mb-6">
          {mode === "edit" ? "Edit Category" : "Add New Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <input
            type="text"
            placeholder="Category Name"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            className="input input-bordered w-full"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            className="textarea textarea-bordered w-full"
            rows={3}
            required
          />

          {/* Offer */}
          <input
            type="number"
            placeholder="Offer % (optional)"
            value={form.offer}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, offer: e.target.value }))
            }
            className="input input-bordered w-full"
            min={0}
            max={100}
          />

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
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : mode === "edit"
                ? "Update"
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
