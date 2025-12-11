import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  getOrderApi,
  getOrdersApi,
  updateOrderStatusApi,
} from "../../services/allApis";

const useOrderStore = create(
  devtools((set, get) => ({
    orders: [],
    order:null,
    loading: false,
    error: null,

    search: "",
    page: 1,
    limit: 5,

    pagination: {
      totalOrders: 0,
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },

    // =============================
    // Helpers & Setters
    // =============================

    setSearch: (value) => set({ search: value, page: 1 }),
    setPage: (page) => set({ page }),

    fetchOrders: async ({ search, page, limit } = {}) => {
      set({ loading: true, error: null });

      const state = get();
      const finalSearch = search ?? state.search;
      const finalPage = page ?? state.page;
      const finalLimit = Math.max(1, Math.min(limit ?? state.limit, 50));

      try {
        const res = await getOrdersApi(finalSearch, finalPage, finalLimit);
        if (!res.success) {
          set({
            loading: false,
            error: res.message || "Failed to fetch orders",
          });
          return;
        }

        set({
          orders: res.data.data,
          pagination: {
            totalOrders: res.data.pagination.totalOrders,
            totalPages: res.data.pagination.totalPages,
            currentPage: finalPage,
            hasNextPage: finalPage < res.data.pagination.totalPages,
            hasPrevPage: finalPage > 1,
          },
          search: finalSearch,
          page: finalPage,
          loading: false,
        });
      } catch (err) {
        set({ loading: false, error: err.message || "Network error" });
      }
    },

    fetchOrderById: async (id) => {
      set({ loading: true, error: null });

      try {
        const res = await getOrderApi(id);
        if (!res.success) {
          set({ loading: false, error: res.message });
          return;
        }
        set({ order: res.data?.data, loading: false });
      } catch (err) {
        set({ loading: false, error: "Network error" });
      }
    },

    updateOrderStatus: async (id, newStatus) => {
      try {
        const res = await updateOrderStatusApi(id, { status: newStatus });
        if (res.success) {
          get().fetchOrderById(id);
        }
      } catch (err) {
        console.log("order update status error", err);
      }
    },
  }))
);

export default useOrderStore;
