// src/components/order-details/OrderItemsSection.jsx
import OrderItem from "./OrderItem";

export default function OrderItemsSection({ items, order, onReturnItem, onCancelItem }) {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">
          Order Items ({items.length})
        </h2>

        <div className="divider my-2"></div>

        <div className="space-y-6">
          {items.map((item) => (
            <OrderItem
              key={item._id}
              item={item}
              order={order}
              onReturnItem={onReturnItem}
              onCancelItem={onCancelItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}