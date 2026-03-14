// src/components/order-details/ReturnModal.jsx
export default function ReturnModal({
  actionType,
  returnReason,
  setReturnReason,
  activeItemId,
  orderId,
  onSubmitReturn,
}) {
  return (
    <dialog id="return_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {actionType === "return-item" ? "Return Item" : "Return Order"}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Please tell us why you want to return
        </p>

        <textarea
          className="textarea textarea-bordered w-full mt-3"
          placeholder="Reason for return"
          value={returnReason}
          onChange={(e) => setReturnReason(e.target.value)}
        />

        <div className="modal-action">
          <button
            className="btn"
            onClick={() => document.getElementById("return_modal").close()}
          >
            Cancel
          </button>

          <button
            className="btn btn-warning"
            disabled={!returnReason}
            onClick={onSubmitReturn}
          >
            Confirm Return
          </button>
        </div>
      </div>
    </dialog>
  );
}