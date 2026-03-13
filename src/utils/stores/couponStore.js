import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  getCouponsApi,
  addCouponApi,
  editCouponApi,
  updateCouponStatusApi,
  deleteCouponApi,
} from "../../services/allApis";
import { toast } from "react-toastify";

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

      // 🧪 Frontend validation
      if (!formData.code?.trim()) {
        toast.error("Coupon code is required");
        return;
      }

      if (!formData.discount || formData.discount <= 0) {
        toast.error("Discount must be greater than 0");
        return;
      }

      if (!formData.expiryDate) {
        toast.error("Expiry date is required");
        return;
      }

      set({ loading: true, error: null });

      try {
        let res;

        if (editData) {
          res = await editCouponApi(editData._id, formData);
        } else {
          res = await addCouponApi(formData);
        }

        // ❌ backend failure
        if (!res?.success) {
          toast.error(res?.data?.message || "Operation failed");
          set({ loading: false });
          return;
        }

        // ✅ success toast ONLY here
        toast.success(
          editData
            ? "Coupon updated successfully"
            : "Coupon added successfully",
        );

        await get().fetchCoupons();

        set({
          loading: false,
          isModalOpen: false,
          editData: null,
        });
      } catch (err) {
        toast.error(
          err?.response?.data?.message || err.message || "Something went wrong",
        );
        set({ loading: false });
      }
    },

    updateCouponStatus: async (id) => {
      set({ loading: true, error: null });

      try {
        const res = await updateCouponStatusApi(id);

        if (!res?.success) {
          toast.error(res?.data?.message || "Failed to update coupon status");
          set({ loading: false });
          return;
        }

        // ✅ success from backend message
        toast.success(res?.data?.message);

        await get().fetchCoupons();

        set({ loading: false });
      } catch (err) {
        toast.error(
          err?.response?.data?.message || err.message || "Something went wrong",
        );
        set({ loading: false });
      }
    },

    // =============================
    // SOFT DELETE Coupon
    // =============================
    deleteCoupon: async (id) => {
      set({ loading: true, error: null });

      try {
        const res = await deleteCouponApi(id);

        if (!res?.success) {
          toast.error(res?.data?.message || "Failed to delete coupon");
          set({ loading: false });
          return;
        }

        // ✅ success toast
        toast.success(res?.data?.message);

        await get().fetchCoupons();

        set({ loading: false });
      } catch (err) {
        toast.error(
          err?.response?.data?.message || err.message || "Something went wrong",
        );
        set({ loading: false });
      }
    },
  })),
);

export default useCouponStore;
