import { create } from "zustand";
import { createBuynowApi, getBuynowCheckoutApi } from "../../services/allApis";


const useBuyNowStore = create((set) => ({
  loading: false,
  buyNowCheckout: null,

  // 1️⃣ Create Buy Now session
  createBuyNow: async (productId) => {
    try {
      set({ loading: true });

      const res = await createBuynowApi({ productId });

      if (res?.success) {
        return res.data.buyNowId; // 👈 backend must return this
      } else {
        // toast.error(res?.message || "Buy Now failed");
        return null;
      }
    } catch (error) {
      console.error("Buy Now Error:", error);
    //   toast.error("Something went wrong");
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // 2️⃣ Fetch Buy Now checkout details
  getBuyNowCheckout: async (buyNowId) => {
    try {
      set({ loading: true });

      const res = await getBuynowCheckoutApi(buyNowId);

      if (res?.success) {
        set({ buyNowCheckout: res.data.checkout });
      } else {
        // toast.error(res?.message || "Checkout expired");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
    //   toast.error("Unable to load checkout");
    } finally {
      set({ loading: false });
    }
  },

  // 3️⃣ Clear store (important)
  clearBuyNow: () => set({ buyNowCheckout: null }),
}));

export default useBuyNowStore;
