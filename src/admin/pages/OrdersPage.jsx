// src/admin/pages/OrdersPage.jsx
import { useEffect } from "react";
import useOrderStore from "../../utils/stores/orderStore";

import OrdersHeader from "../components/orders/OrdersHeader";
import OrdersTable from "../components/orders/OrdersTable";
import Pagination from "../components/Pagination";

export default function OrdersPage() {
  const {
    orders,
    loading,
    search,
    pagination,
    fetchOrders,
    setSearch,
    setPage,
  } = useOrderStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrders({ search, page: pagination.currentPage });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, pagination.currentPage, fetchOrders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        <OrdersHeader 
          search={search} 
          setSearch={setSearch} 
        />

        <OrdersTable 
          orders={orders} 
          loading={loading} 
        />

        <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}