import { Package } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecentOrders({ recentOrders }) {
  return (
    <div className="card bg-white shadow-lg">
      <div className="card-body p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
          <Link
            to="/orders"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            View All →
          </Link>
        </div>

        {recentOrders?.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package
              size={64}
              strokeWidth={1.2}
              className="mx-auto mb-4 opacity-50"
            />
            <p className="text-lg">You haven’t placed any orders yet</p>
            <Link to="/shop" className="btn btn-primary btn-sm mt-6">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {recentOrders?.map((order) => (
              <div
                key={order?._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-5 last:border-0 gap-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    Order #{order?._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(order?.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">
                    ₹{order?.grandTotal?.toLocaleString("en-IN") || "0"}
                  </p>
                  <span
                    className={`badge badge-sm mt-1 ${
                      order?.orderStatus === "Delivered"
                        ? "badge-success"
                        : order.orderStatus === "Cancelled"
                          ? "badge-error"
                          : "badge-warning"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <Link
                  to={`/orders/${order?._id}`}
                  className="btn btn-outline btn-sm gap-2 sm:ml-4"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
