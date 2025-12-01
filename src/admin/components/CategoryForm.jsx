import React, { useState, useEffect } from "react";

const CategoryForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    offer: "",
  });

  // LOAD INITIAL DATA FOR EDIT
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        offer: initialData.offer || "",
      });
    } else {
      setForm({ name: "", description: "", offer: "" });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

    if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-3xl">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Category" : "Add New Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="textarea textarea-bordered w-full"
            required
            rows="3"
          />

          <input
            name="offer"
            placeholder="Offer % (e.g., 15)"
            value={form.offer}
            onChange={(e) => setForm({ ...form, offer: e.target.value })}
            className="input input-bordered w-full"
            type="number"
          />

          <div className="flex justify-end gap-3 mt-8">
            {/* Cancel */}
            <button type="button" onClick={onClose}  className="px-5 py-2.5 text-blue-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
              Cancel
            </button>

            <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
