// src/utils/stores/userWishlistStore.js (or WishlistStore.js)
import { create } from "zustand";
import {
  addtoWishlistApi,
  getWishlistApi,
  removeFromWishlistApi,
} from "../../services/allApis";

const useUserWishlistStore = create((set, get) => ({
  wishlistProducts: [],
  loading: false,
  error: null,

  fetchWishlistProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getWishlistApi();
      if (res.success) {
        // Backend returns { products: [{ product: { ... } }] }
        const products = res.data?.data?.products?.map(item => item.product) || [];
        set({ wishlistProducts: products, loading: false });
      }
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to fetch wishlist",
      });
    }
  },

  addtoWishlist: async (productId) => {
    set({ loading: true });
    try {
      await addtoWishlistApi(productId);
      await get().fetchWishlistProducts();
    } catch (error) {
      set({ loading: false, error: "Failed to add" });
    }
  },

  removeFromWishlist: async (productId) => {
    set({ loading: true });
    try {
      await removeFromWishlistApi(productId);
      await get().fetchWishlistProducts();
    } catch (error) {
      set({ loading: false, error: "Failed to remove" });
    }
  },
}));

export default useUserWishlistStore;