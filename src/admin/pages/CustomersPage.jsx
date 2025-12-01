// src/admin/pages/CustomersPage.jsx
import React, { useEffect } from "react";
import CustomersHeader from "../components/customers/CustomersHeader";
import CustomersTable from "../components/customers/CustomersTable";
import Pagination from "../components/Pagination";

const CustomersPage = () => {
  // const { fetchCustomers, pagination } = useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, [pagination.currentPage]);

  return (
    <div className="space-y-8 p-6">
      <CustomersHeader />
      <CustomersTable />
      <Pagination
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={(page) => fetchCustomers({ page })}
      />
    </div>
  );
};

export default CustomersPage;