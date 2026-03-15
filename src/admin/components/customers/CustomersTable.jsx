// src/components/customers/CustomersTable.jsx
import CustomerTableRow from "./CustomerTableRow";

export default function CustomersTable({ customers }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <tr>
              <th className="px-3 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-left text-xs sm:text-sm font-semibold">
                Customer
              </th>
              <th className="px-3 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-left text-xs sm:text-sm font-semibold">
                Email
              </th>
              <th className="px-3 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-left text-xs sm:text-sm font-semibold">
                Joined On
              </th>
              <th className="px-3 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-left text-xs sm:text-sm font-semibold">
                Status
              </th>
              <th className="px-3 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-center text-xs sm:text-sm font-semibold">
                Actions
              </th>
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
}