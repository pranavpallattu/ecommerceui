// src/admin/components/notifications/NotificationsTable.jsx

import { useReturnRequestStore } from "../../utils/stores/useReturnRequestStore";
import NotificationsTableRow from "./NotificationsTableRow";

const NotificationsTable = () => {
  const { orderReturns, itemReturns, loading } =
    useReturnRequestStore();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-white rounded-2xl">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

//   const hasNoData =
//     orderReturns.length === 0 && itemReturns.length === 0;

//   if (hasNoData) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
//         <p className="text-xl text-gray-500">
//           No return requests found
//         </p>
//       </div>
//     );
//   }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Products
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Reason
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-50">
            {orderReturns.map((order) => (
              <NotificationsTableRow
                key={order._id}
                type="order"
                data={order}
              />
            ))}

            {itemReturns.map((itemReturn) => (
              <NotificationsTableRow
                key={itemReturn.item._id}
                type="item"
                data={itemReturn}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationsTable;
