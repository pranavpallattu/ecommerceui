// src/utils/stores/productStore.js
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
    // === STATE ===
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

    // Modal
    isModalOpen: false,
    editData: null,

    // === SETTERS ===
    setSearch: (value) => set({ search: value, page: 1 }),
    setPage: (page) => set({ page }),

    openModal: (data = null) => set({ isModalOpen: true, editData: data }),
    closeModal: () => set({ isModalOpen: false, editData: null }),

    // === FETCH ALL PRODUCTS ===
    fetchProducts: async ({ search, page, limit } = {}) => {
      set({ loading: true, error: null });

      const current = get();
      const finalSearch = search !== undefined ? search : current.search;
      const finalPage = page !== undefined ? page : current.page;
      const finalLimit = limit !== undefined ? limit : current.limit;

      try {
        const res = await getProductsApi(finalSearch, finalPage, finalLimit);

        if (!res.success) {
          set({ loading: false, error: res.message || "Failed" });
          return;
        }

        set({
          products: res.data.data,
          pagination: {
            totalProducts: res.data.pagination.totalProducts,
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
      }
    },

    // === FETCH SINGLE PRODUCT ===
    fetchProductById: async (id) => {
      set({ loading: true, error: null });
      try {
        const res = await getProductByIdApi(id);
        if (res.success) {
          set({ product: res.data, loading: false });
        } else {
          set({ error: res.message, loading: false });
        }
      } catch (err) {
        set({ loading: false, error: "Failed to load product" });
      }
    },

    // === ADD PRODUCT ===
    addProduct: async (formData) => {
      set({ loading: true });
      try {
        const res = await addProductApi(formData);
        if (res.success) {
          get().fetchProducts();
          get().closeModal();
        }
      } catch (err) {
        set({ error: "Failed to add product" });
      } finally {
        set({ loading: false });
      }
    },

    // === EDIT PRODUCT ===
    editProduct: async (id, formData) => {
      set({ loading: true });
      try {
        const res = await editProductApi(id, formData);
        if (res.success) {
          get().fetchProducts();
          get().closeModal();
        }
      } catch (err) {
        set({ error: "Failed to edit product" });
      } finally {
        set({ loading: false });
      }
    },

    // === LIST / UNLIST ===
    listProduct: async (id) => {
      await listProductApi(id);
      get().fetchProducts();
    },
    unlistProduct: async (id) => {
      await unlistProductApi(id);
      get().fetchProducts();
    },

    // === SOFT DELETE ===
    softDeleteProduct: async (id) => {
      await softDeleteProductApi(id);
      get().fetchProducts();
    },
  }))
);

export default useProductStore;