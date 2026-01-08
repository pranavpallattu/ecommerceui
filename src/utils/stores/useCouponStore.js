// import { create } from "zustand";
// import {
//   applyCouponApi,
//   getAvailableCouponsApi,
//   removeCouponApi,
// } from "../../services/allApis";

// const useCouponStore = create((set, get) => ({
//   availableCoupons: [],
//   loading: false,
//   error: null,

//   fetchCoupons: async () => {
//     set({ loading: true, error: null });
//     try {
//       const res = await getAvailableCouponsApi();
//       set({ availableCoupons: res.data.data, loading: false });
//     } catch (error) {
//       set({
//         loading: false,
//         error:
//           error?.response?.data?.message || "Failed to fetch available coupons",
//       });
//     }
//   },
//   applyCoupon: async (reqBody) => {
//     set({ loading: true, error: null });
//     try {
//       await applyCouponApi(reqBody);
//       set({ loading: false });
//     } catch (error) {
//       set({
//         loading: false,
//         error: error?.response?.data?.message || "Failed to apply coupon",
//       });
//     }
//   },
//   removeCoupon: async () => {
//     set({ loading: true, error: null });

//     try {
//       await removeCouponApi();
//       set({ loading: false });
//     } catch (error) {
//       set({
//         loading: false,
//         error:
//           error?.response?.data?.message || "Failed to remove applied coupon",
//       });
//     }
//   },
// }));

// export default useCouponStore;



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
        // Refresh cart to get updated totals
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
        // Refresh cart
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