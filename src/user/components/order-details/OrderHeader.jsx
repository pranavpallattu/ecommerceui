// src/components/order-details/OrderHeader.jsx
import { Link } from "react-router-dom";

export default function OrderHeader({ orderId }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Order Details</h1>
        <p className="text-gray-600 mt-1">
          Order ID: <span className="font-mono text-sm">#{orderId.slice(-8)}</span>
        </p>
      </div>

      <Link to="/orders" className="btn btn-outline btn-sm gap-2">
        Back to Orders
      </Link>
    </div>
  );
}