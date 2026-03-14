// src/components/order-details/CancelModal.jsx
export default function CancelModal({
  cancellationReason,
  setCancellationReason,
  activeItemId,
  orderId,
  onSubmitCancel,
}) {
  return (
    <dialog id="cancel_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Cancel Item</h3>

        <textarea
          className="textarea textarea-bordered w-full mt-3"
          placeholder="Reason for cancellation"
          value={cancellationReason}
          onChange={(e) => setCancellationReason(e.target.value)}
        />

        <div className="modal-action">
          <button
            className="btn btn-outline"
            onClick={() => document.getElementById("cancel_modal").close()}
          >
            Close
          </button>

          <button
            className="btn btn-error text-white"
            disabled={!cancellationReason}
            onClick={onSubmitCancel}
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}