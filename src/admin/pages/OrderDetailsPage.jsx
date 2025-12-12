import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  IndianRupeeIcon,
  MapPin,
  Package,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import useOrderStore from "../../utils/stores/orderStore";

const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Returned: "bg-orange-100 text-orange-700",
  ReturnPending: "bg-orange-100 text-orange-700",
  ReturnRejected: "bg-red-100 text-red-700",
};

const ALL_STATUSES = [
    "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
  "ReturnPending",
  "ReturnRejected",
];

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { order, loading, fetchOrderById, updateOrderStatus } = useOrderStore();

  useEffect(() => {
    fetchOrderById(id);
  }, [id]);

  if (loading || !order) {
    return (
      <div className="flex justify-center items-center h-80">
        <span className="loading loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-6">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Order Details
        </h1>

        {/* Status Dropdown */}
        <select
          value={order.orderStatus}
          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
          className="select select-bordered bg-white"
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* ===== Order Summary Card ===== */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-5">Order Summary</h2>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-gray-400 text-sm">Order ID</p>
            <p className="font-semibold text-gray-800">{order._id}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Date</p>
            <p className="font-medium">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Status</p>
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[order.orderStatus]}`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>
      </div>

      {/* ===== User & Address ===== */}
      <div className="grid grid-cols-2 gap-6">
        {/* User */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Customer</h3>
          <p className="text-gray-800 font-medium">{order.userId?.name}</p>
          <p className="text-gray-500 text-sm">{order.userId?.emailId}</p>
        </div>

        {/* Address */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <MapPin size={18} /> Delivery Address
          </h3>
{order.address.snapshot ? (
  <div className="p-4 border rounded-xl shadow-sm bg-white space-y-2">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-800">
        {order.address.snapshot.addressType || "Address"}
      </h3>
      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
        {order.address.snapshot.addressType === "Home" ? "Home" : "Work"}
      </span>
    </div>

    <div className="text-gray-700 leading-relaxed">
      <p className="font-medium">{order.address.snapshot.name}</p>
      <p className="text-sm">{order.address.snapshot.phone}</p>

      <p className="mt-1 text-sm">
        {order.address.snapshot.city}, {order.address.snapshot.state} – {order.address.snapshot.pincode}
      </p>

      {order.address.snapshot.landMark && (
        <p className="text-sm text-gray-500 mt-1">
          Landmark: {order.address.snapshot.landMark}
        </p>
      )}
    </div>
  </div>
) : (
  <p className="text-gray-500 text-center py-3">No address found</p>
)}

        </div>
      </div>

      {/* ===== Items Table ===== */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Package size={18} /> Items
        </h3>

   <table className="w-full">
  <thead>
    <tr className="text-left bg-gray-100 text-gray-700 text-sm">
      <th className="py-4 px-3">Product</th>
      <th className="py-4 px-3">Qty</th>
      <th className="py-4 px-3">Per Unit Price</th>
      <th className="py-4 px-3">Subtotal</th>
      <th className="py-4 px-3">Status</th>
    </tr>
  </thead>

  <tbody>
    {order.items?.map((item, idx) => (
      <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
        
        <td className="py-4 px-3">{item.productName || "—"}</td>

        <td className="py-4 px-3">{item.quantity}</td>

        {/* price */}
        <td className="py-4 px-3">
          <div className="flex items-center gap-1">
            <IndianRupeeIcon className="w-4 h-4" />
            {item.price}
          </div>
        </td>

        {/* subtotal */}
        <td className="py-4 px-3">
          <div className="flex items-center gap-1">
            <IndianRupeeIcon className="w-4 h-4" />
            {item.subtotal}
          </div>
        </td>

        {/* status */}
        <td className="py-4 px-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[item.itemStatus]}`}
          >
            {item.itemStatus}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      </div>

      {/* ===== Payment Info ===== */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Calendar size={18} /> Payment Information
        </h3>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-gray-400 text-sm">Method</p>
            <p>{order.paymentMethod}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Status</p>
            <p>{order.paymentStatus}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Grand Total</p>
            <p className="font-semibold flex gap-1 items-center">
              <IndianRupeeIcon className="w-4 h-4" />
              {order.grandTotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
