import useCategoryStore from "../../utils/stores/categoryStore";
import Pagination from "./Pagination";

const CategoriesPagination = () => {
  const { pagination, fetchCategories, search } = useCategoryStore();

  return (
    <Pagination
      page={pagination.currentPage}
      totalPages={pagination.totalPages}
      onPageChange={(page) => fetchCategories({ search, page })}
    />
  );
};

export default CategoriesPagination;