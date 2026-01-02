import { create } from "zustand";
import {
  getHomeProductsApi,
  getProductDetailsApi,
  getShopProductsApi,
} from "../../services/allApis";

const useUserProductStore = create((set, get) => ({
  homeProducts: [],
  loading: false,
  error: null,
  productDetails: null,
  relatedProducts: [],
  shopProducts: [],
  shopCategories: [],
  shopPagination: null,
  shopFilters: {
    category: "all",
    sort: "default",
    search: "",
  },

  fetchHomeProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getHomeProductsApi();
      set({ homeProducts: res.data.data, loading:false, error:null });
    } catch (error) {
      console.error(error.message);
    }
  },

  fetchProductDetails: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await getProductDetailsApi(id);
      set({
        productDetails: res.data?.data?.product,
        relatedProducts: res.data?.data?.relatedProducts,
        loading:false,
        error:null
      });
    } catch (error) {
      console.error(error.message);
    }
  },

  fetchShopProducts: async ({
    search = "",
    page = 1,
    limit = 10,
    category = "all",
    sort = "default",
  }) => {
    set({ loading: true, error: null });

    try {
      const res = await getShopProductsApi(search, page, limit, category, sort);

      const { products, pagination, categories, appliedFilters } =
        res.data.data;

      set({
        shopProducts: products,
        shopPagination: pagination,
        shopCategories: categories,
        shopFilters: appliedFilters,
        loading: false,
        error:null
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useUserProductStore;
