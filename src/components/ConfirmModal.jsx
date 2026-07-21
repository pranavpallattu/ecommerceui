import useConfirmModalStore from "../utils/stores/ui/useConfirmModalStore";

const ConfirmModal = () => {
  const { confirm, closeConfirm } = useConfirmModalStore();

  if (!confirm.isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box rounded-2xl max-w-md">
        <h3 className="font-bold text-xl text-gray-900">{confirm.title}</h3>

        <p className="py-4 text-gray-600">{confirm.message}</p>

        <div className="modal-action">
          <button className="btn btn-outline" onClick={closeConfirm}>
            {confirm.cancelText}
          </button>

          <button
            className={`btn text-white btn-${confirm.confirmVariant}`}
            onClick={() => {
              confirm.onConfirm?.();
              closeConfirm();
            }}
          >
            {confirm.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
