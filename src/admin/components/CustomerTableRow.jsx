// src/admin/components/customers/CustomerTableRow.jsx
import { Ban, CheckCircle } from "lucide-react";
import useCustomerStore from "../../utils/stores/customerStore";

const CustomerTableRow = ({ customer }) => {
  const { toggleBlockCustomer } = useCustomerStore();
  const isBlocked = customer.isBlocked;

  return (
    <tr className="hover:bg-blue-50/30 transition-all duration-200">
      <td className="px-8 py-6">
          <div>
            <p className="font-semibold text-gray-900">{customer.name}</p>
            <p className="text-xs text-gray-500">ID: {customer._id}</p>
          </div>
      </td>

      <td className="px-8 py-6 text-gray-700 font-medium">{customer.emailId}</td>
      <td className="px-8 py-6 text-gray-600">{customer.phone || "—"}</td>

      <td className="px-8 py-6">
        <span className={`px-4 py-2 rounded-full text-xs font-bold ${
          isBlocked 
            ? "bg-red-100 text-red-700" 
            : "bg-emerald-100 text-emerald-700"
        }`}>
          {isBlocked ? "Blocked" : "Active"}
        </span>
      </td>

      <td className="px-8 py-6">
        <div className="flex justify-center">
          <button
            onClick={() => toggleBlockCustomer(customer._id)}
            className={`btn btn-sm gap-2 rounded-xl font-medium transition-all ${
              isBlocked
                ? "btn-success hover:btn-success/90"
                : "btn-error hover:btn-error/90"
            }`}
          >
            {isBlocked ? (
              <>
                <CheckCircle size={18} />
                Unblock
              </>
            ) : (
              <>
                <Ban size={18} />
                Block
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CustomerTableRow;