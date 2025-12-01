// src/admin/components/customers/CustomersTable.jsx
import useCustomerStore from "../../../utils/stores/customerStore";
import CustomerTableRow from "./CustomerTableRow";

const CustomersTable = () => {
  const { customers, loading } = useCustomerStore();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-xl">No customers found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-8 py-5 text-left">Customer</th>
            <th className="px-8 py-5 text-left">Email</th>
            <th className="px-8 py-5 text-left">Phone</th>
            <th className="px-8 py-5 text-left">Status</th>
            <th className="px-8 py-5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {customers.map((customer) => (
            <CustomerTableRow key={customer._id} customer={customer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;