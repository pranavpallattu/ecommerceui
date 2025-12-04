// src/admin/pages/ProductDetailsPage.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../../utils/stores/productStore";
// import ProductActions from "../components/products/ProductActions";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { product, fetchProductById, loading } = useProductStore();

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Images */}
          <div className="p-10">
            <img
              src={product.productImage?.[0] || "/placeholder.jpg"}
              alt={product.productName}
              className="w-full rounded-3xl shadow-2xl object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-10 space-y-8">
            <div>
              <h1 className="text-4xl font-black text-gray-900">{product.productName}</h1>
              <p className="text-gray-600 mt-4 text-lg">{product.description}</p>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="text-xl font-semibold">{product.category?.name || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-4xl font-black text-gray-900">
                  ₹{product.salePrice?.toFixed(2)}
                </p>
                {product.regularPrice > product.salePrice && (
                  <p className="text-lg text-gray-500 line-through">
                    ₹{product.regularPrice}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Stock</p>
                <p className={`text-2xl font-bold ${product.quantity > 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {product.quantity} units
                </p>
              </div>
            </div>

            {/* <ProductActions product={product} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;