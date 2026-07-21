import { useEffect } from "react";
import Pagination from "../components/common/Pagination";
import CustomersHeader from "../components/customers/CustomersHeader";
import CustomersEmptyState from "../components/customers/CustomersEmptyState";
import CustomersTable from "../components/customers/CustomersTable";
import CustomersLoading from "../components/customers/CustomersLoading";
import useCustomerStore from "../../utils/stores/admin/useCustomerStore";

export default function CustomersPage() {
  const {
    customers,
    loading,
    error,
    pagination,
    search,
    fetchCustomers,
    setSearch,
    setPage,
  } = useCustomerStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers({ search, page: pagination.currentPage });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, pagination.currentPage, fetchCustomers]);

  if (loading) {
    return <CustomersLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <AlertCircle size={64} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() =>
              fetchCustomers({ search, page: pagination.currentPage })
            }
            className="btn btn-primary px-8"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        <CustomersHeader search={search} setSearch={setSearch} />

        {customers.length === 0 ? (
          <CustomersEmptyState />
        ) : (
          <>
            <CustomersTable customers={customers} />
            <Pagination
              page={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
