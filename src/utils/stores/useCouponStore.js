

// src/utils/stores/useCouponStore.js
import { create } from "zustand";
import {
  applyCouponApi,
  removeCouponApi,
  getAvailableCouponsApi,
} from "../../services/allApis";
import useCartStore from "./CartStore"; // Import cart store

const useCouponStore = create((set, get) => ({
  availableCoupons: [],
  loading: false,
  error: null,

  // Fetch available coupons
  fetchAvailableCoupons: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getAvailableCouponsApi();
      if (res.success) {
        set({ availableCoupons: res.data.data || [], loading: false });
      }
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to fetch coupons",
      });
    }
  },

  // Apply coupon
applyCoupon: async (code) => {
  set({ loading: true, error: null });
  try {
    const res = await applyCouponApi({ code: code.trim().toUpperCase() });
    if (res.success) {
      // Update cart immediately with the fresh data from response
       await useCartStore.getState().fetchCartProducts();
        set({ loading: false });
        return { success: true };
      }
    
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to apply coupon";
    set({ loading: false, error: message });
    return { success: false, message };
  }
},
  // Remove applied coupon
removeCoupon: async () => {
  set({ loading: true, error: null });
  try {
    const res = await removeCouponApi();
    if (res.success) {
      // Update cart immediately
       await useCartStore.getState().fetchCartProducts();
        set({ loading: false });
        return { success: true };
    }
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to remove coupon";
    set({ loading: false, error: message });
    return { success: false, message };
  }
},
}));

export default useCouponStore;