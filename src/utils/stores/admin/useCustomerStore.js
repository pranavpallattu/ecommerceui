import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  getAllCustomersApi,
  updateUserStatusApi,
} from "../../../services/allApis";
import { toast } from "react-toastify";

const useCustomerStore = create(
  devtools((set, get) => ({
    customers: [],
    loading: false,
    error: null,

    search: "",
    page: 1,
    limit: 5,

    pagination: {
      totalCustomers: 0,
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },

    //  SETTERS
    setSearch: (value) => set({ search: value, page: 1 }),
    setPage: (page) => set({ page }),

    //  FETCH CUSTOMERS
    fetchCustomers: async ({ search, page, limit } = {}) => {
      set({ loading: true, error: null });

      const current = get();
      const finalSearch = search !== undefined ? search : current.search;
      const finalPage = page !== undefined ? page : current.page;
      const finalLimit = limit !== undefined ? limit : current.limit;

      try {
        const res = await getAllCustomersApi(
          finalSearch,
          finalPage,
          finalLimit,
        );

        if (!res.success) {
          set({
            loading: false,
            error: res.message || "Failed to load customers",
          });
          return;
        }

        set({
          customers: res.data.data,
          pagination: {
            totalCustomers: res.data.pagination.totalCustomers,
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
        set({ loading: false, error: "Network error" });
        console.error("fetchCustomers error:", err);
      }
    },

    //  TOGGLE BLOCK/UNBLOCK
    toggleBlockCustomer: async (id) => {
      set({ loading: true, error: null });

      try {
        const res = await updateUserStatusApi(id);

        if (!res.success) {
          const errorMessage =
            res?.data?.message || res.message || "Failed to update user status";
          toast.error(errorMessage);
          set({ loading: false });
          return;
        }

        const updatedUser = res.data.data;

        set((state) => ({
          customers: state.customers.map((c) =>
            c._id === id ? updatedUser : c,
          ),
          loading: false,
        }));

        toast.success(
          res?.data?.message || "Customer status updated successfully",
        );
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          err.message ||
          "Failed to update user status";
        toast.error(errorMessage);
        set({ loading: false, error: errorMessage });
      }
    },
  })),
);

export default useCustomerStore;
