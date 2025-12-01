// src/admin/components/customers/CustomerTableRow.jsx
import { Ban, CheckCircle } from "lucide-react";
import useCustomerStore from "../../../utils/stores/customerStore";

const CustomerTableRow = ({ customer }) => {
  const { toggleBlockCustomer } = useCustomerStore();

  const isBlocked = customer.isBlocked;

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900">{customer.name}</p>
            <p className="text-sm text-gray-500">ID: {customer._id.slice(-6)}</p>
          </div>
        </div>
      </td>

      <td className="px-8 py-6 text-gray-700">{customer.email}</td>
      <td className="px-8 py-6 text-gray-700">{customer.phone || "—"}</td>

      <td className="px-8 py-6">
        <span className={`badge ${isBlocked ? "badge-error" : "badge-success"} badge-sm`}>
          {isBlocked ? "Blocked" : "Active"}
        </span>
      </td>

      <td className="px-8 py-6">
        <button
          onClick={() => toggleBlockCustomer(customer._id)}
          className={`btn btn-sm gap-2 ${isBlocked ? "btn-success" : "btn-error"}`}
        >
          {isBlocked ? (
            <>
              <CheckCircle size={16} />
              Unblock
            </>
          ) : (
            <>
              <Ban size={16} />
              Block
            </>
          )}
        </button>
      </td>
    </tr>
  );
};

export default CustomerTableRow;