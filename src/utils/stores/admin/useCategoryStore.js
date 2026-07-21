import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  getCategoriesApi,
  addCategoryApi,
  editCategoryApi,
  listCategoryApi,
  unlistCategoryApi,
  softDeleteCategoryApi,
  getActiveCategoriesApi,
} from "../../../services/allApis";
import { toast } from "react-toastify";

const useCategoryStore = create(
  devtools((set, get) => ({
    // state
    categories: [],
    activeCategories: [],
    loading: false,
    error: null,

    // search + pagination state (frontend controlled)
    search: "",
    page: 1,
    limit: 5,

    pagination: {
      totalCategories: 0,
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },

    isModalOpen: false,
    modalMode: "add", // "add" | "edit"
    editData: null,

    openAddModal: () =>
      set({
        isModalOpen: true,
        modalMode: "add",
        editData: null,
      }),

    openEditModal: (data) =>
      set({
        isModalOpen: true,
        modalMode: "edit",
        editData: data,
      }),

    closeModal: () =>
      set({
        isModalOpen: false,
        modalMode: "add",
        editData: null,
      }),

    // Submit handler
    handleSubmit: async (formData) => {
      const { editData, addCategory, editCategory, closeModal } = get();

      const result = editData
        ? await editCategory(editData._id, formData)
        : await addCategory(formData);

      if (result?.success) {
        closeModal();
      }
    },

    //  setters
    setSearch: (value) => {
      set({ search: value, page: 1 });
    },

    setPage: (page) => {
      set({ page });
    },

    setLimit: (limit) => {
      set({ limit, page: 1 });
    },

    fetchCategories: async ({ search, page, limit } = {}) => {
      set({ loading: true, error: null });

      // Use passed values OR current state
      const current = get();
      const finalSearch = search !== undefined ? search : current.search;
      const finalPage = page !== undefined ? page : current.page;
      const finalLimit = limit !== undefined ? limit : current.limit;

      try {
        const res = await getCategoriesApi(finalSearch, finalPage, finalLimit);

        if (!res.success) {
          set({ loading: false, error: res.message || "Failed to fetch" });
          return;
        }

        set({
          categories: res.data.data,
          pagination: {
            totalCategories: res.data.pagination.totalCategories,
            totalPages: res.data.pagination.totalPages,
            currentPage: finalPage,
            hasNextPage: finalPage < res.data.pagination.totalPages,
            hasPrevPage: finalPage > 1,
          },
          // Also sync root state
          search: finalSearch,
          page: finalPage,
          limit: finalLimit,
          loading: false,
          error: null,
        });
      } catch (err) {
        set({ loading: false, error: "Network error" });
        console.error("fetchCategories error:", err);
      }
    },

    fetchActiveCategories: async () => {
      set({ loading: true, error: null });

      try {
        const res = await getActiveCategoriesApi();

        if (!res.success) {
          set({ loading: false, error: res.message || "Failed to fetch" });
          return;
        }

        set({
          activeCategories: res.data.data,
          loading: false,
          error: null,
        });
      } catch (err) {
        set({ loading: false, error: "Network error" });
        console.error("activefetchCategories error:", err);
      }
    },

    addCategory: async (reqBody) => {
      set({ loading: true, error: null });

      try {
        const res = await addCategoryApi(reqBody);

        if (!res.success) {
          toast.error(res?.message || "Failed to add category");
          set({ error: res.message });

          return {
            success: false,
            message: res?.message || "Failed to add category",
          };
        }

        toast.success("Category added successfully");

        await get().fetchCategories();

        return {
          success: true,
          data: res.data,
        };
      } catch (err) {
        const message = err?.response?.data?.message || "Server error";

        toast.error(message);
        set({ error: message });

        return {
          success: false,
          message,
        };
      } finally {
        set({ loading: false });
      }
    },

    editCategory: async (id, reqBody) => {
      try {
        set({ loading: true, error: null });
        const res = await editCategoryApi(reqBody, id);

        if (!res.success) {
          toast.error(res?.message);

          set({
            error: res?.message || "Failed to edit category",
          });
          return {
            success: false,
            message: res?.message || "Failed to edit category",
          };
        }

        toast.success("Category edited successfully");

        await get().fetchCategories();
        return { success: true, data: res.data };
      } catch (err) {
        toast.error(err?.response?.data?.message || "Server error");
        set({ error: "Server error" });
      } finally {
        set({ loading: false });
      }
    },

    listCategory: async (id) => {
      try {
        set({ loading: true, error: null });
        const res = await listCategoryApi(id);

        if (!res.success) {
          toast.error(res?.data?.message);

          set({
            loading: false,
            error: res?.message || "Failed to list category",
          });
          return {
            success: false,
            message: res?.message || "Failed to list category",
          };
        }
        toast.success("Category listed successfully");

        await get().fetchCategories();
        return { success: true, data: res.data };
      } catch (err) {
        toast.error(err?.response?.data?.message || "Server error");
        set({ loading: false, error: "Server error" });
      } finally {
        set({ loading: false });
      }
    },

    unlistCategory: async (id) => {
      try {
        set({ loading: true, error: null });
        const res = await unlistCategoryApi(id);

        if (!res.success) {
          toast.error(res?.data?.message);

          set({
            loading: false,
            error: res?.message || "Failed to unlist category",
          });
          return {
            success: false,
            message: res?.message || "Failed to unlist category",
          };
        }

        toast.success("Category unlisted successfully");

        await get().fetchCategories();
        return { success: true, data: res.data };
      } catch (err) {
        toast.error(err?.response?.data?.message || "Server error");
        set({ loading: false, error: "Server error" });
      } finally {
        set({ loading: false });
      }
    },

    softDeleteCategory: async (id) => {
      try {
        set({ loading: true, error: null });
        const res = await softDeleteCategoryApi(id);

        if (!res.success) {
          toast.error(res?.data?.message || "Failed to delete category");
          set({
            loading: false,
            error: res?.message || "Failed to delete category",
          });
          return {
            success: false,
            message: res?.message || "Failed to delete category",
          };
        }

        toast.success("Category deleted successfully");

        await get().fetchCategories();
        return { success: true, data: res.data };
      } catch (err) {
        toast.error(err?.response?.data?.message || "Server error");
        set({ loading: false, error: "Server error" });
      } finally {
        set({ loading: false });
      }
    },
  })),
);

export default useCategoryStore;
