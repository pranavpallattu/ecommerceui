import { create } from "zustand";
import {
  applyCouponApi,
  removeCouponApi,
  getAvailableCouponsApi,
  removeBuyNowCouponApi,
  applyBuyNowCouponApi,
} from "../../../services/allApis";
import useCartStore from "./useCartStore";
import { toast } from "react-toastify";
import useBuyNowStore from "./useBuyNowStore";

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
      const res = await applyCouponApi({
        code: code.trim().toUpperCase(),
      });

      if (!res.success) {
        set({ loading: false });
        toast.error(res.message);
        return;
      }

      toast.success("Coupon applied successfully");

      await useCartStore.getState().fetchCartProducts();

      set({ loading: false });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to apply coupon";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);
    }
  },
  // Remove applied coupon
  removeCoupon: async () => {
    set({ loading: true, error: null });
    try {
      const res = await removeCouponApi();
      if (!res.success) {
        set({ loading: false });
        toast.error(res.message);
        return;
      }

      toast.success("Coupon removed successfully");
      await useCartStore.getState().fetchCartProducts();
      set({ loading: false });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to remove coupon";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },
  applyBuyNowCoupon: async (buyNowId, code) => {
    set({ loading: true, error: null });

    try {
      const res = await applyBuyNowCouponApi(buyNowId, {
        code: code.trim().toUpperCase(),
      });

      if (!res.success) {
        set({ loading: false });
        toast.error(res.message);
        return;
      }

      toast.success("Coupon applied successfully");

      await useBuyNowStore.getState().getBuyNowCheckout(buyNowId);

      set({
        loading: false,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to apply coupon";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);
    }
  },
  removeBuyNowCoupon: async (buyNowId) => {
    set({ loading: true, error: null });

    try {
      const res = await removeBuyNowCouponApi(buyNowId);

      if (!res.success) {
        set({ loading: false });
        toast.error(res.message);
        return;
      }

      toast.success("Coupon removed successfully");

      await useBuyNowStore.getState().getBuyNowCheckout(buyNowId);

      set({
        loading: false,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to remove coupon";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);
    }
  },
}));

export default useCouponStore;
