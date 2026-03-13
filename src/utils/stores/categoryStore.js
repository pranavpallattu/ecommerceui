// src/utils/stores/categoryStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  getCategoriesApi,
  addCategoryApi,
  editCategoryApi,
  listCategoryApi,
  unlistCategoryApi,
  softDeleteCategoryApi,
} from "../../services/allApis";
import { toast } from "react-toastify";

/**
 * Category store (Zustand)
 * - Uses devtools middleware (no persist for categories)
 * - Exposes state + actions for fetch, add, edit, list/unlist, soft delete
 */
const useCategoryStore = create(
  devtools((set, get) => ({
    // state
    categories: [],
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

// categoryStore.js
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

  try {
    if (editData) {
      await editCategory(editData._id, formData);
    } else {
      await addCategory(formData);
    }

    closeModal(); // ✅ ONLY close modal
  } catch (err) {
    // handled inside store
  }
},


    // ----- simple setters -----
    setSearch: (value) => {
      set({ search: value, page: 1 });
    },

    setPage: (page) => {
      set({ page });
    },

    setLimit: (limit) => {
      set({ limit, page: 1 });
    },

    // ----- main actions -----
    /**
     * Fetch categories from server using current search/page/limit
     * - Will call GET /category/getCategory?search=&page=&limit=
     * - Expects allApis.getCategoriesApi(search,page,limit) to return
     *   { success:true, data: { data: categoriesArray, pagination: {...} }, ... }
     */
    /**
     * Fetch categories — accepts object or uses current state
     * This is the MODERN and CORRECT way
     */
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

    /**
     * Add a new category
     * - reqBody: { name, description, offer }
     * - On success we re-fetch categories (server is source of truth)
     */
   addCategory: async (reqBody) => {
  set({ loading: true, error: null });

  try {
    const res = await addCategoryApi(reqBody);

    if (!res.success) {
      toast.error(res?.message || "Failed to add category");
      set({ error: res.message });
      return;
    }

    toast.success("Category added successfully");
    await get().fetchCategories();

  } catch (err) {
    toast.error(err?.response?.data?.message || "Server error");
    set({ error: "Server error" });
  } finally {
    set({ loading: false });
  }
},


    /**
     * Edit category
     * - id: category id
     * - reqBody: partial fields { name?, description?, offer? }
     * - After success re-fetch categories
     */
    editCategory: async (id, reqBody) => {
      try {
        set({ loading: true, error: null });
        const res = await editCategoryApi(reqBody, id);

        if (!res.success) {
          toast.error(res?.data?.message);

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

    /**
     * Toggle list (mark listed)
     */
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

    /**
     * Toggle unlist (mark unlisted)
     */
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

    /**
     * Soft delete a category (set deletedAt + isActive: false)
     */
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
