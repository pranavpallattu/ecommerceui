import OrderRow from "./OrderRow";

export default function OrdersTable({ orders, getStatusBadge, onCancelClick }) {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
      <table className="table table-sm w-full">
        <thead>
          <tr>
            <th>Order</th>
            <th>Items</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              getStatusBadge={getStatusBadge}
              onCancelClick={onCancelClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
