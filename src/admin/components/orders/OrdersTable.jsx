import OrdersTableRow from "./OrdersTableRow";

export default function OrdersTable({ orders, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-80 sm:h-96 bg-white rounded-xl sm:rounded-2xl">
        <span className="loading loading-spinner loading-md sm:loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-10 sm:p-16 md:p-20 text-center">
        <p className="text-lg sm:text-xl md:text-2xl text-gray-500">
          No orders found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <tr>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                Order ID
              </th>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                User
              </th>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                Products
              </th>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                Total Amount
              </th>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                Payment
              </th>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-center text-xs sm:text-sm font-semibold whitespace-nowrap">
                Date
              </th>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-center text-xs sm:text-sm font-semibold whitespace-nowrap">
                Status
              </th>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-center text-xs sm:text-sm font-semibold whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-50">
            {orders.map((order) => (
              <OrdersTableRow key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Scroll Hint */}
      <div className="sm:hidden bg-blue-50 px-4 py-2 text-center">
        <p className="text-xs text-blue-600">
          ← Scroll horizontally to see all columns →
        </p>
      </div>
    </div>
  );
}
