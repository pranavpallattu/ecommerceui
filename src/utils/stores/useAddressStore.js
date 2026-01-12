import { create } from "zustand";
import {
  getAddressApi,
  addAddressApi,
  deleteAddressApi,
  editAddressApi,
} from "../../services/allApis";

const useAddressStore = create((set, get) => ({
  addresses: [],
  loading: false,
  error: null,

  /* -------------------- Fetch Addresses -------------------- */
  fetchAddresses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getAddressApi();

      if (res?.status === true) {
        set({
          addresses: res.data,
          loading: false,
        });
      } else {
        throw new Error(res?.message || "Failed to fetch addresses");
      }
    } catch (error) {
      set({
        loading: false,
        error:
          error?.response?.data?.message ||
          error.message ||
          "Failed to fetch addresses",
      });
    }
  },

  /* -------------------- Add Address -------------------- */
  addAddress: async (addressData) => {
    set({ loading: true, error: null });
    try {
      const res = await addAddressApi(addressData);

      if (res?.success) {
        // Optimistic update (new address first)
        set((state) => ({
          addresses: [res.data, ...state.addresses],
          loading: false,
        }));
        return { success: true };
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to add address";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  /* -------------------- Delete Address (Soft Delete) -------------------- */
  deleteAddress: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await deleteAddressApi(id);

      if (res?.status === true) {
        set((state) => ({
          addresses: state.addresses.filter(
            (address) => address._id !== id
          ),
          loading: false,
        }));
        return { success: true };
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to delete address";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  /* -------------------- Edit Address -------------------- */
  editAddress: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const res = await editAddressApi(id, updatedData);

      if (res?.success) {
        set((state) => ({
          addresses: state.addresses.map((address) =>
            address._id === id ? res.data : address
          ),
          loading: false,
        }));
        return { success: true };
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update address";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  /* -------------------- Clear Store (on logout) -------------------- */
  clearAddresses: () => {
    set({ addresses: [], loading: false, error: null });
  },
}));

export default useAddressStore;
