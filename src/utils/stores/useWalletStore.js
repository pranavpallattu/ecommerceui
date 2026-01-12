import { create } from "zustand";
import { getWalletApi } from "../../services/allApis";

const useWalletStore = create((set) => ({
  balance: 0,
  transactionHistory: [],
  loading: false,
  error: null,

  fetchWallet: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getWalletApi();
      console.log(res);
      

      if (res.success) {
        set({
          balance: res.data.data.balance,
          transactionHistory: res.data.data.transactionHistory || [],
          loading: false,
        });
      }
    } catch (error) {
      set({
        loading: false,
        error:
          error?.response?.data?.message ||
          "Failed to fetch wallet details",
      });
    }
  },

}));

export default useWalletStore;
