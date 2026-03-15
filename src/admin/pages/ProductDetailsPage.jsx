// src/admin/pages/ProductDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductStore from "../../utils/stores/productStore";
import useConfirmModalStore from "../../utils/stores/useConfirmModalStore";

import HeaderSection from "../components/product-details/HeaderSection";
import ImageGallery from "../components/product-details/ImageGallery";
import ProductInfo from "../components/product-details/ProductInfo";
import ProductFormModal from "../components/products/ProductFormModal";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal, product, fetchProductById, toggleListing, loading } =
    useProductStore();

  const { openConfirm } = useConfirmModalStore();

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/70 py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl overflow-hidden">
        <HeaderSection
          product={product}
          navigate={navigate}
          openModal={openModal}
          toggleListing={toggleListing}
          openConfirm={openConfirm}
        />

        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-14">
            <ImageGallery
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />

            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      <ProductFormModal />
    </div>
  );
}