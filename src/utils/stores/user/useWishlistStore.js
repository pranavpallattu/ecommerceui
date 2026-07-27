import { create } from "zustand";
import {
  addtoWishlistApi,
  getWishlistApi,
  removeFromWishlistApi,
} from "../../../services/allApis";
import { toast } from "react-toastify";

const useWishlistStore = create((set, get) => ({
  wishlistProducts: [],
  loading: false,
  error: null,

  fetchWishlistProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getWishlistApi();
      if (res.success) {
        const products =
          res.data?.data?.products?.map((item) => item.product) || [];
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
      const res = await addtoWishlistApi(productId);
      if (!res.success) {
        set({ loading: false });

        return toast.error(res?.message);
      }
      toast.success("Product added to wishlist");
      await get().fetchWishlistProducts();
    } catch (error) {
      set({ loading: false, error: "Failed to add" });
    }
  },

  removeFromWishlist: async (productId) => {
    set({ loading: true });
    try {
      const res = await removeFromWishlistApi(productId);
      if (!res.success) {
        set({ loading: false });
        return toast.error(res?.message);
      }
      toast.success("Product removed from wishlist");

      await get().fetchWishlistProducts();
    } catch (error) {
      set({ loading: false, error: "Failed to remove" });
    }
  },
}));

export default useWishlistStore;
