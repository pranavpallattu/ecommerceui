import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useProductStore from "../../utils/stores/user/useProductStore";
import useCartStore from "../../utils/stores/user/useCartStore";
import useWishlistStore from "../../utils/stores/user/useWishlistStore";
import useBuyNowStore from "../../utils/stores/user/useBuyNowStore";

import Breadcrumb from "../components/product-details/Breadcrumb";
import ImageGallery from "../components/product-details/ImageGallery";
import ProductInfo from "../components/product-details/ProductInfo";
import RelatedProducts from "../components/product-details/RelatedProducts";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const {
    productDetails: product,
    relatedProducts,
    loading,
    error,
    fetchProductDetails,
  } = useProductStore();

  const { addToCart, cartProducts } = useCartStore();
  const { wishlistProducts, addtoWishlist, removeFromWishlist } =
    useWishlistStore();
  const { createBuyNow } = useBuyNowStore();

  const navigate = useNavigate();

  const alreadyInCart = cartProducts?.items?.some(
    (item) => item.product._id === id,
  );

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  const isInWishlist =
    wishlistProducts?.some((item) => item._id === product?._id) || false;

  const hasDiscount = product?.regularPrice > product?.salePrice;
  const inStock = product?.quantity > 0 && product?.isActive;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.regularPrice - product.salePrice) / product.regularPrice) *
          100,
      )
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center py-12 px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Link to="/shop" className="btn btn-primary px-8">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb productName={product.productName} />

      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 items-start">
          <ImageGallery
            images={product.productImage}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            discountPercent={discountPercent}
            inStock={inStock}
            isInWishlist={isInWishlist}
            onWishlistToggle={() => {
              isInWishlist
                ? removeFromWishlist(product._id)
                : addtoWishlist(product._id);
            }}
          />

          <ProductInfo
            product={product}
            inStock={inStock}
            hasDiscount={hasDiscount}
            discountPercent={discountPercent}
            isInWishlist={isInWishlist}
            alreadyInCart={alreadyInCart}
            onAddToCart={() => addToCart(product._id)}
            onWishlistToggle={() =>
              isInWishlist
                ? removeFromWishlist(product._id)
                : addtoWishlist(product._id)
            }
            onBuyNow={async () => {
              if (!inStock) return;
              const buyNowId = await createBuyNow(product._id);
              if (buyNowId) navigate(`/checkout/${buyNowId}`);
            }}
          />
        </div>
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
    </div>
  );
}
