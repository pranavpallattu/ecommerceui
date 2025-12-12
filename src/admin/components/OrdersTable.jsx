// src/admin/components/customers/CustomersTable.jsx
import useOrderStore from "../../utils/stores/orderStore";
import OrdersTableRow from "./OrdersTableRow";

const OrdersTable = () => {
  const { orders, loading } = useOrderStore();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96 bg-white rounded-2xl">
//         <span className="loading loading-spinner loading-lg text-blue-600"></span>
//       </div>
//     );
//   }

  if (orders?.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
        <p className="text-2xl text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <tr>
              <th className="px-8 py-6 text-left text-sm font-semibold">
                Order Id
              </th>
              <th className="px-8 py-6 text-left text-sm font-semibold">
                User
              </th>
              <th className="px-8 py-6 text-left text-sm font-semibold">
                Products
              </th>
              <th className="px-8 py-6 text-left text-sm font-semibold">
                Total Amount
              </th>
              <th className="px-8 py-6 text-left text-sm font-semibold">
                Payment
              </th>
              <th className="px-8 py-6 text-center text-sm font-semibold">
                Date
              </th>
              <th className="px-8 py-6 text-center text-sm font-semibold">
                Status
              </th>
              <th className="px-8 py-6 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {orders?.map((order) => (
              <OrdersTableRow key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;





