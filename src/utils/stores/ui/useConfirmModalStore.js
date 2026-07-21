import { create } from "zustand";

const useConfirmModalStore = create((set) => ({
  confirm: {
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    confirmVariant: "error",
    onConfirm: null,
  },

  openConfirm: (payload) =>
    set({
      confirm: {
        isOpen: true,
        confirmText: "Confirm",
        cancelText: "Cancel",
        confirmVariant: "error",
        ...payload,
      },
    }),

  closeConfirm: () =>
    set({
      confirm: {
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
      },
    }),
}));

export default useConfirmModalStore;
