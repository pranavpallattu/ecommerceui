import { create } from "zustand";
import { devtools } from "zustand/middleware";

import {
  getProductsApi,
  getProductByIdApi,
  addProductApi,
  editProductApi,
  listProductApi,
  unlistProductApi,
  softDeleteProductApi,
} from "../../services/allApis";

const useProductStore = create(
  devtools((set, get) => ({
    // =============================
    // State
    // =============================
    products: [],
    product: null,
    loading: false,
    error: null,

    search: "",
    page: 1,
    limit: 10,

    pagination: {
      totalProducts: 0,
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

    openModal: (data = null) =>
      set({
        isModalOpen: true,
        editData: data,
      }),

    closeModal: () =>
      set({
        isModalOpen: false,
        editData: null,
      }),

    // =============================
    // Fetch All Products
    // =============================
    fetchProducts: async ({ search, page, limit } = {}) => {
      set({ loading: true, error: null });

      const state = get();
      const finalSearch = search ?? state.search;
      const finalPage = page ?? state.page;
      const finalLimit = limit ?? state.limit;

      try {
        const res = await getProductsApi(finalSearch, finalPage, finalLimit);

        if (!res.success) {
          set({
            loading: false,
            error: res.message || "Failed to load products",
          });
          return;
        }

        const pg = res.data.pagination;

        set({
          loading: false,
          products: res.data.data,
          search: finalSearch,
          page: finalPage,
          pagination: {
            totalProducts: pg.totalProducts,
            totalPages: pg.totalPages,
            currentPage: finalPage,
            hasNextPage: finalPage < pg.totalPages,
            hasPrevPage: finalPage > 1,
          },
        });
      } catch (err) {
        set({ loading: false, error: "Network error" });
      }
    },

    // =============================
    // Fetch Single Product
    // =============================
    fetchProductById: async (id) => {
      set({ loading: true, error: null });

      try {
        const res = await getProductByIdApi(id);
        if (!res.success) {
          set({ loading: false, error: res.message });
          return;
        }
        set({editData:res.data?.data})
        set({ product: res.data?.data, loading: false });
      } catch (err) {
        set({ loading: false, error: "Network error" });
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
          // Edit existing product
          res = await editProductApi(editData._id, formData);
          await get.fetchProductById(editData._id)
        } else {
          // Add new product
          res = await addProductApi(formData,true);
        }

        if (!res.success) {
          set({ loading: false, error: res.message });
          return;
        }

        // Refresh product list
        await get().fetchProducts();
        

        // Close modal
        set({ loading: false, isModalOpen: false, editData: null });
      } catch (err) {
        set({
          loading: false,
          error: "Something went wrong",
        });
      }
    },

    // =============================
    // LIST / UNLIST PRODUCT
    // =============================
    toggleListing: async (id, isChecked) => {
      try {
        const res =
          isChecked
            ? await listProductApi(id)
            : await unlistProductApi(id);

        if (res.success) {
          get().fetchProductById(id);
        }
      } catch (err) {
        console.log("Error toggling product listing");
      }
    },

    // =============================
    // SOFT DELETE PRODUCT
    // =============================
    deleteProduct: async (id) => {
      try {
        const res = await softDeleteProductApi(id);
        if (res.success) {
          get().fetchProducts();
        }
      } catch (err) {
        console.log("Delete error:", err);
      }
    },
  }))
);

export default useProductStore;
