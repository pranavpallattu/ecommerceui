// src/admin/pages/CustomersPage.jsx
import React, { useEffect } from "react";
import CustomersHeader from "../components/CustomerHeader";
import CustomersTable from "../components/CustomersTable";
import Pagination from "../components/Pagination"; // ← Correct import
import useCustomerStore from "../../utils/stores/customerStore";

const CustomersPage = () => {
  const { fetchCustomers, search, pagination } = useCustomerStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers({ search, page: pagination.currentPage });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, pagination.currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <CustomersHeader />
        <CustomersTable />
        <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page) => fetchCustomers({ search, page })}
        />
      </div>
    </div>
  );
};

export default CustomersPage;