import { Ban, CheckCircle } from "lucide-react";
import useCustomerStore from "../../../utils/stores/customerStore";
import useConfirmModalStore from "../../../utils/stores/useConfirmModalStore";

const CustomerTableRow = ({ customer }) => {
  const { toggleBlockCustomer } = useCustomerStore();
  const isBlocked = customer.isBlocked;

  const { openConfirm } = useConfirmModalStore();

  const joinedDate = new Date(customer.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <tr className="hover:bg-blue-50/30 transition-all duration-200">
      {/* Customer */}
      <td className="px-3 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
        <div>
          <p className="font-semibold text-gray-900 text-sm sm:text-base">
            {customer.name}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[120px] sm:max-w-none">
            ID: {customer._id}
          </p>
        </div>
      </td>

      {/* Email */}
      <td className="px-3 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
        <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base truncate max-w-[150px] sm:max-w-[200px] md:max-w-none">
          {customer.emailId}
        </p>
      </td>

      {/* Joined Date */}
      <td className="px-3 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
        <p className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">
          {joinedDate}
        </p>
      </td>

      {/* Status */}
      <td className="px-3 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
        <span
          className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap ${
            isBlocked
              ? "bg-red-100 text-red-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {isBlocked ? "Blocked" : "Active"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-3 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
        <div className="flex justify-center">
          <button
            onClick={() =>
              openConfirm({
                title: isBlocked ? "Unblock Customer?" : "Block Customer?",
                message: isBlocked
                  ? "This customer will regain access to the platform."
                  : "This customer will be restricted from accessing the platform.",
                confirmText: isBlocked ? "Unblock" : "Block",
                confirmVariant: isBlocked ? "success" : "error",
                onConfirm: () => toggleBlockCustomer(customer._id),
              })
            }
            className={`btn btn-sm flex items-center gap-1 sm:gap-2 w-20 sm:w-24 md:w-28 font-medium transition-all text-xs sm:text-sm ${
              isBlocked
                ? "btn-success text-white hover:brightness-95"
                : "btn-error text-white hover:brightness-95"
            }`}
          >
            {isBlocked ? (
              <>
                <CheckCircle size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Unblock</span>
                <span className="sm:hidden">✓</span>
              </>
            ) : (
              <>
                <Ban size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Block</span>
                <span className="sm:hidden">✕</span>
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CustomerTableRow;