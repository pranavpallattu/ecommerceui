// src/admin/components/products/ProductFormContent.jsx
import { useEffect, useState } from "react";
import  useProductStore from "../../utils/stores/productStore";

const ProductFormContent = () => {
  const { editData, handleSubmit, closeModal, categories } = useProductStore();

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

  // Fill form when editing or reset when adding
  useEffect(() => {
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
  }, [editData]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = files.length + form.existingImages.length;

    if (totalImages > 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    setForm({ ...form, productImage: files });
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

    // Send existing images
    form.existingImages.forEach((url) => {
      formData.append("existingImages", url);
    });

    // Send removed images
    form.removedImages.forEach((url) => {
      formData.append("removedImages", url);
    });

    // Send new images
    form.productImage.forEach((file) => {
      formData.append("productImage", file);
    });

    handleSubmit(formData);
  };

  return (
    <>
      <h3 className="font-bold text-2xl mb-8">
        {editData ? "Edit Product" : "Add New Product"}
      </h3>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Product Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Product Name</span>
          </label>
          <input
            type="text"
            value={form.productName}
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Category</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Description</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="textarea textarea-bordered h-32"
            required
          />
        </div>

        {/* Price, Offer, Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Regular Price</span>
            </label>
            <input
              type="number"
              value={form.regularPrice}
              onChange={(e) => setForm({ ...form, regularPrice: e.target.value })}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Offer % (optional)</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={form.offer}
              onChange={(e) => setForm({ ...form, offer: e.target.value })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Stock Quantity</span>
            </label>
            <input
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Product Images (1-4)
            </span>
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Existing Images */}
        {form.existingImages.length > 0 && (
          <div className="grid grid-cols-4 gap-4">
            {form.existingImages.map((url, i) => (
              <div key={i} className="relative group">
                <img
                  src={url}
                  alt="product"
                  className="w-full h-32 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i, true)}
                  className="absolute top-2 right-2 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* New Images Preview */}
        {form.productImage.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {form.productImage.map((file, i) => (
              <div key={i} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="modal-action mt-10">
          <button type="button" onClick={closeModal} className="btn btn-ghost">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary px-8">
            {editData ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductFormContent;