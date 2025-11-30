import { Search } from "lucide-react";
import useCategoryStore from "../../utils/stores/categoryStore";

const CategoriesSearch = () => {
  const { search, setSearch } = useCategoryStore();

  return (
    <div className="max-w-md">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full pl-12 h-12 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default CategoriesSearch;