import { create } from "zustand";
import {
  addtoCartApi,
  getCartApi,
  removeFromCartApi,
  updateQuantityApi,
} from "../../services/allApis";

const useCartStore = create((set, get) => ({
  cartProducts: null,
  loading: false,
  error: null,

fetchCartProducts: async () => {
  set({ loading: true, error: null });
  try {
    // Add timestamp to bypass any cache
    const res = await getCartApi(`?t=${Date.now()}`);
    console.log("Fresh cart from API:", res.data.data); // ← Debug here
    set({ cartProducts: res.data.data, loading: false });
  } catch (error) {
    set({
      loading: false,
      error: error?.response?.data?.message || "Failed to fetch cart",
    });
  }
},

  addToCart: async (productId) => {
    set({ loading: true, error: null });
    try {
      await addtoCartApi(productId);
      await get().fetchCartProducts();
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to add to cart",
      });
    }
  },

  removeFromCart: async (productId) => {
    set({ loading: true, error: null });
    try {
      await removeFromCartApi(productId);
      await get().fetchCartProducts();
    } catch (error) {
      set({
        loading: false,
        error:
          error?.response?.data?.message || "Failed to remove from cart",
      });
    }
  },

  updateQuantity: async (reqBody) => {
    set({ loading: true, error: null });
    try {
      await updateQuantityApi(reqBody);
      await get().fetchCartProducts();
    } catch (error) {
      set({
        loading: false,
        error:
          error?.response?.data?.message || "Failed to update quantity",
      });
    }
  },
}));

export default useCartStore;
