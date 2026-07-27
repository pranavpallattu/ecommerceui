import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {  AlertCircle, Search, Filter, Package } from "lucide-react";
import useOrderStore from "../../utils/stores/user/useOrderStore";
import OrdersTable from "../components/orders/OrdersTable";
import CancelModal from "../components/orders/CancelModal";
import { STATUS_BADGES } from "../../utils/helpers/statusBadges";
import { toast } from "react-toastify";
import OrdersFilter from "../components/orders/OrderFilters";
import OrdersHeader from "../components/orders/OrdersHeader";

const getStatusBadge = (status) => STATUS_BADGES[status] || "badge-ghost";

export default function OrdersPage() {
  const {
    userOrders,
    loading,
    error,
    filters,
    setFilters,
    getUserOrders,
    cancelOrder,
  } = useOrderStore();

  const [searchInput, setSearchInput] = useState(filters?.search || "");
  // useRef() creates an object that persists across re-renders without causing re-renders when its value changes.
  const isFirstRun = useRef(true);

  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    getUserOrders();
  }, []);

  // Debounced search
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const timer = setTimeout(() => {
      const next = { ...filters, search: searchInput };
      setFilters({ search: searchInput });
      getUserOrders(next);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const toggleStatus = (value) => {
    const current = filters?.status || [];
    const nextStatus = current?.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ status: nextStatus });
    getUserOrders({ ...filters, status: nextStatus });
  };

  const toggleTime = (value) => {
    const current = filters?.time || [];
    const nextTime = current?.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ time: nextTime });
    getUserOrders({ ...filters, time: nextTime });
  };

  const clearFilters = () => {
    const next = { search: "", status: [], time: [] };
    setSearchInput("");
    setFilters(next);
    getUserOrders(next);
  };

  const handleCancelClick = (orderId) => {
    setCancelOrderId(orderId);
    setCancelReason("");
    document.getElementById("cancel_modal")?.showModal();
  };

  const handleConfirmCancel = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please provide a cancellation reason");
      return;
    }
    await cancelOrder(cancelOrderId, { reason: cancelReason });
    setCancelOrderId(null);
    setCancelReason("");
    document.getElementById("cancel_modal")?.close();
  };

  const handleCloseModal = () => {
    setCancelOrderId(null);
    setCancelReason("");
    document.getElementById("cancel_modal")?.close();
  };

  if (loading && userOrders?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <p className="font-semibold text-gray-900 mb-3">{error}</p>
          <button
            onClick={() => getUserOrders()}
            className="btn btn-primary btn-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const hasNoOrdersAtAll =
    !userOrders?.length &&
    !searchInput &&
    !filters.status?.length &&
    !filters.time?.length;

  if (hasNoOrdersAtAll) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package size={56} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 mb-6">Your orders will appear here</p>
          <Link to="/shop" className="btn btn-primary btn-sm px-6">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
<div className="w-full px-6 xl:px-10 py-8">        {/* Header */}
        <OrdersHeader userOrders={userOrders} />

        {/* Content */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Filters */}
          <aside className="col-span-12 xl:col-span-2 xl:sticky xl:top-6">
            <OrdersFilter
              status={filters?.status || []}
              time={filters?.time || []}
              onToggleStatus={toggleStatus}
              onToggleTime={toggleTime}
              onClear={clearFilters}
            />
          </aside>

          {/* Table */}
          <section className="col-span-12 xl:col-span-10">
            <div className="relative mb-5">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by Product Name..."
                className="input input-bordered w-full pl-11 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              />
            </div>

            {loading ? (
              <div className="flex justify-center py-16 bg-white rounded-2xl border border-gray-200">
                <span className="loading loading-spinner loading-md text-blue-600"></span>
              </div>
            ) : userOrders?.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 text-center py-16">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  No orders found
                </h3>
                <p className="text-gray-500 text-sm">
                  Try adjusting your filters or search term.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <OrdersTable
                  orders={userOrders}
                  getStatusBadge={getStatusBadge}
                  onCancelClick={handleCancelClick}
                />
              </div>
            )}
          </section>
        </div>
      </div>

      <CancelModal
        cancelOrderId={cancelOrderId}
        cancelReason={cancelReason}
        setCancelReason={setCancelReason}
        onClose={handleCloseModal}
        onConfirmCancel={handleConfirmCancel}
      />
    </div>
  );
}
