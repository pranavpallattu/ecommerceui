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
      set({
        wishlistProducts: res.data.data?.products || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to fetch wishlist",
      });
    }
  },

  addtoWishlist: async (productId) => {
    set({ loading: true, error: null });
    try {
      await addtoWishlistApi(productId);
      await get().fetchWishlistProducts();
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to add to wishlist",
      });
    }
  },

  removeFromWishlist: async (productId) => {
    set({ loading: true, error: null });
    try {
      await removeFromWishlistApi(productId);
      await get().fetchWishlistProducts();
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to remove from wishlist",
      });
    }
  },
}));

export default useUserWishlistStore;
