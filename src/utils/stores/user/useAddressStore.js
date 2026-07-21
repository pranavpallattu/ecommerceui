import { create } from "zustand";
import {
  getAddressApi,
  addAddressApi,
  deleteAddressApi,
  editAddressApi,
} from "../../../services/allApis";
import { toast } from "react-toastify";
import {validateAddress} from "../../helpers/validation"

const useAddressStore = create((set, get) => ({
  addresses: [],
  loading: false,
  error: null,
  defaultAddress: null,

  // Fetch all addresses
  fetchAddresses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getAddressApi();
      console.log(res);

      if (res.status || res.success) {
        set({
          addresses: res?.data?.data?.addresses,
          defaultAddress: res?.data?.data?.defaultAddress || [],
          loading: false,
        });
      }
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to fetch addresses",
      });
    }
  },

  // Add new address
  addAddress: async (addressData) => {
    const validationError = validateAddress(addressData);

    if (validationError) {
      toast.error(validationError);
      return false;
    }

    set({ loading: true, error: null });

    try {
      const res = await addAddressApi(addressData);

      if (!res.success) {
        toast.error(res.message);
        set({ loading: false });
        return false;
      }

      toast.success("Address added successfully");

      await get().fetchAddresses();

      set({ loading: false });

      return true;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to add address";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);

      return false;
    }
  },

  // Edit address
  editAddress: async (id, addressData) => {
    const validationError = validateAddress(addressData);

    if (validationError) {
      toast.error(validationError);
      return false;
    }

    set({ loading: true, error: null });

    try {
      const res = await editAddressApi(id, addressData);

      if (!res.success) {
        toast.error(res.message);
        set({ loading: false });
        return false;
      }

      toast.success("Address updated successfully");

      await get().fetchAddresses();

      set({ loading: false });

      return true;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update address";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);

      return false;
    }
  },

  // Delete address (soft delete)
  deleteAddress: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await deleteAddressApi(id);
      if (!res.success) {
        return toast.error(res?.message);
      }
      toast.success("Address removed successfully");
      await get().fetchAddresses();
      set({ loading: false });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to delete address";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },
}));

export default useAddressStore;
