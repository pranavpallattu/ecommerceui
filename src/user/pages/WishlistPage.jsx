import { useEffect } from "react";
import { Link } from "react-router-dom";
import useWishlistStore from "../../utils/stores/user/useWishlistStore";
import useCartStore from "../../utils/stores/user/useCartStore";
import WishlistCard from "../components/wishlist/WishlistCard";
import WishlistHeader from "../components/wishlist/WishlistHeader";

const WishlistPage = () => {
  const {
    wishlistProducts,
    fetchWishlistProducts,
    removeFromWishlist,
    loading,
  } = useWishlistStore();

  const { addToCart } = useCartStore();

  useEffect(() => {
    console.log(wishlistProducts);

    fetchWishlistProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
        <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-4 sm:p-6 lg:p-8 mb-8">
          <WishlistHeader wishlistProducts={wishlistProducts} />
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-medium text-gray-700 mb-4">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 mb-8">
                Explore products and add your favorites here.
              </p>
              <Link to="/shop" className="btn btn-primary btn-lg px-10">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {wishlistProducts.map((product) => (
              <WishlistCard
                key={product._id}
                product={product}
                onRemove={() => removeFromWishlist(product._id)}
                onAddToCart={() => addToCart(product._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
