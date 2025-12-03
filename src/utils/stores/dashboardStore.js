// src/utils/stores/dashboardStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  getOrderSummaryApi,
  getBestProductsApi,
  getBestCategoriesApi,
} from "../../services/allApis";

const useDashboardStore = create(
  devtools((set) => ({
    // State
    orderSummary: null,
    bestProducts: [],
    bestCategories: [],
    loading: false,
    error: null,

    // Current filter (for re-use in downloads)
    currentFilter: { filterType: "all" },

    // Fetch Order Summary with filter
    fetchOrderSummary: async (filter = { filterType: "all" }) => {
      set({ loading: true, error: null, currentFilter: filter });

      try {
        const res = await getOrderSummaryApi(filter);
        if (res.success) {
          set({ orderSummary: res.data.data, loading: false });
        } else {
          set({ error: res.message || "Failed", loading: false });
        }
      } catch (err) {
        set({ loading: false, error: "Network error" });
      }
    },

    // Best Selling
    fetchBestProducts: async () => {
      try {
        const res = await getBestProductsApi();
        if (res.success) set({ bestProducts: res.data.data });
      } catch (err) {
        console.error(err);
      }
    },

    fetchBestCategories: async () => {
      try {
        const res = await getBestCategoriesApi();
        if (res.success) set({ bestCategories: res.data.data });
      } catch (err) {
        console.error(err);
      }
    },
  }))
);

export default useDashboardStore;