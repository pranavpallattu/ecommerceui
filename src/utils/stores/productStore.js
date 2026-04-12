import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { toast } from "react-toastify";

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
    // STATE
    // =============================
    products: [],
    product: null,
    loading: false,
    error: null,

    search: "",
    page: 1,
    limit: 12,

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

    // =============================
    // UI HELPERS
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
    // FETCH PRODUCTS
    // =============================
    fetchProducts: async (params = {}) => {
      set({ loading: true, error: null });

      const state = get();
      const finalSearch = params.search ?? state.search;
      const finalPage = params.page ?? state.page;
      const finalLimit = params.limit ?? state.limit;

      try {
        const res = await getProductsApi(
          finalSearch,
          finalPage,
          finalLimit
        );

        if (!res?.success) {
          toast.error(res?.message || "Failed to fetch products");
          set({ loading: false });
          return;
        }

        const pg = res.data.pagination;

        set({
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
          loading: false,
        });
      } catch (err) {
        console.error(err);
        toast.error("Network error while fetching products");
        set({ loading: false });
      }
    },

    // =============================
    // FETCH PRODUCT BY ID
    // =============================
    fetchProductById: async (id) => {
      set({ loading: true, error: null });

      try {
        const res = await getProductByIdApi(id);

        if (!res?.success) {
          toast.error(res?.message || "Failed to load product");
          set({ loading: false });
          return;
        }

        set({
          product: res.data.data,
          editData: res.data.data,
          loading: false,
        });
      } catch (err) {
        console.error(err);
        toast.error("Network error");
        set({ loading: false });
      }
    },

    // =============================
    // ADD / EDIT PRODUCT
    // =============================
    handleSubmit: async (formData) => {
      const { editData } = get();
      set({ loading: true });

      try {
        let res;

        if (editData) {
          // EDIT
          res = await editProductApi(editData._id, formData);
        } else {
          // ADD
          res = await addProductApi(formData);
        }

        if (!res?.success) {
          toast.error(res?.message || "Operation failed");
          set({ loading: false });
          return;
        }

        toast.success(res?.data?.message || "Product saved successfully");

        await get().fetchProducts();
        await get().fetchProductById(editData ? editData?._id : formData?._id);

        set({
          loading: false,
          isModalOpen: false,
          editData: null,
        });
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
        set({ loading: false });
      }
    },

    // =============================
    // LIST / UNLIST PRODUCT
    // =============================
    toggleListing: async (id, isChecked) => {
      try {
        const res = isChecked
          ? await listProductApi(id)
          : await unlistProductApi(id);

        if (!res?.success) {
         return toast.error(res?.message || "Failed to update status");
        }

        toast.success(
          isChecked ? "Product listed " : "Product unlisted "
        );

        get().fetchProducts();
        get().fetchProductById(id)
      } catch (err) {
        console.error(err);
        toast.error("Failed to update product status");
      }
    },

    // =============================
    // SOFT DELETE PRODUCT
    // =============================
    deleteProduct: async (id) => {
      try {
        const res = await softDeleteProductApi(id);

        if (!res?.success) {
          toast.error(res?.message || "Failed to delete product");
          return;
        }

        toast.success("Product deleted successfully ");
        get().fetchProducts();
      } catch (err) {
        console.error(err);
        toast.error("Delete failed");
      }
    },
  }))
);

export default useProductStore;
