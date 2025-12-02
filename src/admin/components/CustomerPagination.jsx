import useCustomerStore from "../../utils/stores/customerStore";
import Pagination from "./Pagination";

const CustomerPagination = () => {
  const { pagination, fetchCustomers, search } = useCustomerStore();

  return (
    <Pagination
      page={pagination.currentPage}
      totalPages={pagination.totalPages}
      onPageChange={(page) => fetchCustomers({ search, page })}
    />
  );
};

export default CustomerPagination;