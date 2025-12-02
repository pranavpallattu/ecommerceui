// src/admin/components/customers/CustomersTable.jsx
import useCustomerStore from "../../utils/stores/customerStore";
import CustomerTableRow from "./CustomerTableRow";

const CustomersTable = () => {
  const { customers, loading } = useCustomerStore();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-white rounded-2xl">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
        <p className="text-2xl text-gray-500">No customers found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <tr>
              <th className="px-8 py-6 text-left text-sm font-semibold">Customer</th>
              <th className="px-8 py-6 text-left text-sm font-semibold">Email</th>
              <th className="px-8 py-6 text-left text-sm font-semibold">Phone</th>
              <th className="px-8 py-6 text-left text-sm font-semibold">Status</th>
              <th className="px-8 py-6 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {customers.map((customer) => (
              <CustomerTableRow key={customer._id} customer={customer} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTable;