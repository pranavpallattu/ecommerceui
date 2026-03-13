// src/admin/components/products/ProductFormContent.jsx
import { useEffect, useState } from "react";
import useProductStore from "../../utils/stores/productStore";
import useCategoryStore from "../../utils/stores/categoryStore";

const ProductFormContent = () => {
  const { editData, handleSubmit, closeModal } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [form, setForm] = useState({
    productName: "",
    category: "",
    description: "",
    quantity: "",
    regularPrice: "",
    offer: "",
    productImage: [],
    existingImages: [],
    removedImages: [],
  });

  // Reset form on open/edit
  useEffect(() => {
    fetchCategories();

    if (editData) {
      setForm({
        productName: editData.productName || "",
        category: editData.category?._id || "",
        description: editData.description || "",
        quantity: editData.quantity || "",
        regularPrice: editData.regularPrice || "",
        offer: editData.offer || "",
        productImage: [],
        existingImages: editData.productImage || [],
        removedImages: [],
      });
    } else {
      setForm({
        productName: "",
        category: "",
        description: "",
        quantity: "",
        regularPrice: "",
        offer: "",
        productImage: [],
        existingImages: [],
        removedImages: [],
      });
    }
  }, [editData, fetchCategories]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // TOTAL IMAGES = existing + new + uploaded again
    const totalImages =
      form.existingImages.length + form.productImage.length + files.length;

    if (totalImages > 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    setForm({
      ...form,
      productImage: [...form.productImage, ...files], // append instead of replace
    });
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      const removed = form.existingImages[index];
      setForm({
        ...form,
        existingImages: form.existingImages.filter((_, i) => i !== index),
        removedImages: [...form.removedImages, removed],
      });
    } else {
      setForm({
        ...form,
        productImage: form.productImage.filter((_, i) => i !== index),
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("quantity", form.quantity);
    formData.append("regularPrice", form.regularPrice);
    formData.append("offer", form.offer || 0);

    form.existingImages.forEach((url) => formData.append("existingImages", url));
    form.removedImages.forEach((url) => formData.append("removedImages", url));
    form.productImage.forEach((file) => formData.append("productImage", file));

    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
      {/* Product Name */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          value={form.productName}
          onChange={(e) => setForm({ ...form, productName: e.target.value })}
          className="input input-bordered w-full text-sm sm:text-base"
          required
        />
      </div>

      {/* Category */}
      {!editData && (
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="select select-bordered w-full text-sm sm:text-base"
            required
          >
            <option value="">Select category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat?.name}
              </option>
            ))}
          </select>
        </div>
      )}

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
        />
      </div>

      {/* Price Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Regular Price
          </label>
          <input
            type="number"
            value={form.regularPrice}
            onChange={(e) => setForm({ ...form, regularPrice: e.target.value })}
            className="input input-bordered w-full text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Offer % (optional)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={form.offer}
            onChange={(e) => setForm({ ...form, offer: e.target.value })}
            className="input input-bordered w-full text-sm sm:text-base"
            placeholder="0"
          />
        </div>
        <div className="sm:col-span-2 md:col-span-1">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="input input-bordered w-full text-sm sm:text-base"
            required
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          Product Images (1–4)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full text-xs sm:text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          {form.existingImages.length + form.productImage.length}/4 images
        </p>
      </div>

      {/* Image Previews */}
      {(form.existingImages.length > 0 || form.productImage.length > 0) && (
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
            Image Preview
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {form.existingImages.map((url, i) => (
              <div key={`exist-${i}`} className="relative group">
                <img 
                  src={url} 
                  alt="" 
                  className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-lg" 
                />
                <button
                  type="button"
                  onClick={() => removeImage(i, true)}
                  className="absolute top-1 sm:top-2 right-1 sm:right-2 btn btn-circle btn-xs sm:btn-sm btn-error opacity-90 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}
            {form.productImage.map((file, i) => (
              <div key={`new-${i}`} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 sm:top-2 right-1 sm:right-2 btn btn-circle btn-xs sm:btn-sm btn-error opacity-90 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
        <button 
          type="button" 
          onClick={closeModal} 
          className="btn btn-ghost w-full sm:w-auto text-sm sm:text-base"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary w-full sm:w-auto sm:px-8 text-sm sm:text-base"
        >
          {editData ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductFormContent;