import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  getCouponsApi,
  addCouponApi,
  editCouponApi,
  updateCouponStatusApi,
  deleteCouponApi,
} from "../../services/allApis";

const useCouponStore = create(
  devtools((set, get) => ({
    coupons: [],
    loading: false,
    error: null,

    search: "",
    page: 1,
    limit: 5,

    pagination: {
      totalCoupons: 0,
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },

    // Modal control
    isModalOpen: false,
    editData: null,

    // =============================
    // Helpers & Setters
    // =============================

    setSearch: (value) => set({ search: value, page: 1 }),
    setPage: (page) => set({ page }),

    openModal: (data = null) => {
      set({
        isModalOpen: true,
        editData: data,
      });
    },

    closeModal: () => {
      set({
        isModalOpen: false,
        editData: null,
      });
    },

    // fetch all coupons

    fetchCoupons: async ({ search, page, limit } = {}) => {
      set({ loading: true, error: null });

      const state = get();
      const finalSearch = search ?? state.search;
      const finalPage = page ?? state.page;
      const finalLimit = Math.max(1, Math.min(limit ?? state.limit, 50));

      try {
        const res = await getCouponsApi(finalSearch, finalPage, finalLimit);
        if (!res.success) {
          set({
            loading: false,
            error: res.message || "Failed to fetch coupons",
          });
          return;
        }

        set({
               coupons: res.data.data,
          pagination: {
            totalCustomers: res.data.pagination.totalCoupons,
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

    // =============================
    // ADD or EDIT Product
    // =============================

    handleSubmit: async (formData) => {
      const { editData } = get();
      set({ loading: true });

      try {
        let res;
        if (editData) {
          res = await editCouponApi(editData._id, formData);
        } else {
          res = await addCouponApi(formData);
        }
        if (!res.success) {
          set({ loading: false, error: res.message });
          return;
        }

        // Refresh product list
        await get().fetchCoupons();

        // Close modal
        set({ loading: false, isModalOpen: false, editData: null });
      } catch (err) {
        set({ loading: false, error: err.message });
      }
    },

    updateCouponStatus: async (id) => {
      try {
        const res = await updateCouponStatusApi(id);
        if (res.success) {
          get().fetchCoupons();
        }
      } catch (err) {
        console.log("coupon update status error", err);
      }
    },

    // =============================
    // SOFT DELETE Coupon
    // =============================
    deleteCoupon: async (id) => {
      try {
        const res = await deleteCouponApi(id);
        if (res.success) {
          get().fetchCoupons();
        }
      } catch (err) {
        console.log("Delete error:", err);
      }
    },
  }))
);

export default useCouponStore;
