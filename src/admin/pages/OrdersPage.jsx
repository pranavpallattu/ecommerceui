// src/admin/pages/CustomersPage.jsx
import React, { useEffect } from "react";
import Pagination from "../components/Pagination"; // ← Correct import
import useOrderStore from "../../utils/stores/orderStore";
import OrdersHeader from "../components/OrdersHeader";
import OrdersTable from "../components/OrdersTable";

const OrdersPage = () => {
  const { fetchOrders, search, pagination } = useOrderStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrders({ search, page: pagination.currentPage });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, pagination.currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <OrdersHeader/>
        <OrdersTable/>
        <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page) => fetchOrders({ search, page })}
        />
      </div>
    </div>
  );
};

export default OrdersPage;