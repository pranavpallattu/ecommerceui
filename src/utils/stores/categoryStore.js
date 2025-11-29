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
      totalPages: 1,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false,
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
    fetchCategories: async () => {
      try {
        set({ loading: true, error: null });
        const { search, page, limit } = get();
        // call API (function should accept search,page,limit)
        const res = await getCategoriesApi(search || "", page || 1, limit || 5);

        if (!res || !res.success) {
          set({ loading: false, error: res?.message || "Failed to fetch categories" });
          return { success: false, message: res?.message || "Failed" };
        }

        set({
          categories: res.data.data || [],
          pagination: res.data.pagination || {
            totalCategories: 0,
            totalPages: 1,
            currentPage: page,
            hasNextPage: false,
            hasPrevPage: false,
          },
          loading: false,
          error: null,
        });

        return { success: true, data: res.data };
      } catch (err) {
        console.error("fetchCategories error:", err);
        set({ loading: false, error: err.message || "Server error" });
        return { success: false, message: err.message || "Server error" };
      }
    },

    /**
     * Add a new category
     * - reqBody: { name, description, offer }
     * - On success we re-fetch categories (server is source of truth)
     */
    addCategory: async (reqBody) => {
      try {
        set({ loading: true, error: null });
        const res = await addCategoryApi(reqBody);

        if (!res || !res.success) {
          set({ loading: false, error: res?.message || "Failed to add category" });
          return { success: false, message: res?.message || "Failed to add category" };
        }

        // re-fetch to get fresh list (keeps pagination consistent)
        await get().fetchCategories();
        return { success: true, data: res.data };
      } catch (err) {
        console.error("addCategory error:", err);
        set({ loading: false, error: err.message || "Server error" });
        return { success: false, message: err.message || "Server error" };
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

        if (!res || !res.success) {
          set({ loading: false, error: res?.message || "Failed to edit category" });
          return { success: false, message: res?.message || "Failed to edit category" };
        }

        await get().fetchCategories();
        return { success: true, data: res.data };
      } catch (err) {
        console.error("editCategory error:", err);
        set({ loading: false, error: err.message || "Server error" });
        return { success: false, message: err.message || "Server error" };
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

        if (!res || !res.success) {
          set({ loading: false, error: res?.message || "Failed to list category" });
          return { success: false, message: res?.message || "Failed to list category" };
        }

        await get().fetchCategories();
        return { success: true, data: res.data };
      } catch (err) {
        console.error("listCategory error:", err);
        set({ loading: false, error: err.message || "Server error" });
        return { success: false, message: err.message || "Server error" };
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

        if (!res || !res.success) {
          set({ loading: false, error: res?.message || "Failed to unlist category" });
          return { success: false, message: res?.message || "Failed to unlist category" };
        }

        await get().fetchCategories();
        return { success: true, data: res.data };
      } catch (err) {
        console.error("unlistCategory error:", err);
        set({ loading: false, error: err.message || "Server error" });
        return { success: false, message: err.message || "Server error" };
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

        if (!res || !res.success) {
          set({ loading: false, error: res?.message || "Failed to delete category" });
          return { success: false, message: res?.message || "Failed to delete category" };
        }

        await get().fetchCategories();
        return { success: true, data: res.data };
      } catch (err) {
        console.error("softDeleteCategory error:", err);
        set({ loading: false, error: err.message || "Server error" });
        return { success: false, message: err.message || "Server error" };
      } finally {
        set({ loading: false });
      }
    },
  }))
);

export default useCategoryStore;
