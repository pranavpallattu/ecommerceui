// src/components/orders/CancelModal.jsx
export default function CancelModal({
  cancelOrderId,
  cancelReason,
  setCancelReason,
  onClose,
  onConfirmCancel,
}) {
  return (
    <dialog id="cancel_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-red-600">
          Confirm Cancellation
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Please tell us why you want to cancel this order. Once submitted,
          this action cannot be changed.
        </p>

        <textarea
          className="textarea textarea-bordered w-full mt-3"
          placeholder="Reason for cancellation"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />

        <div className="modal-action">
          <button
            className="btn btn-outline"
            onClick={onClose}
          >
            Close
          </button>

          <button
            className="btn btn-error text-white"
            disabled={!cancelReason.trim()}
            onClick={onConfirmCancel}
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}