import { create } from "zustand";

const useCheckoutStore = create((set) => ({
  selectedPayment: "cod",

  setSelectedPayment: (payment) => set({ selectedPayment: payment }),

  resetCheckout: () => set({ selectedPayment: "cod" }),
}));

export default useCheckoutStore;
