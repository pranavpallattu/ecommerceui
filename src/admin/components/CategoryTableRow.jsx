import { Edit3, Trash2, Eye, EyeOff } from "lucide-react";
import useCategoryStore from "../../utils/stores/categoryStore";

const CategoryTableRow = ({ cat }) => {
  const { openModal, softDeleteCategory, listCategory, unlistCategory } = useCategoryStore();

  const handleToggle = () => {
    if (cat.isActive) unlistCategory(cat._id);
    else listCategory(cat._id);
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-8 py-6 font-medium text-gray-900">{cat.name}</td>
      <td className="px-8 py-6 text-gray-600 text-sm">{cat.description}</td>
      <td className="px-8 py-6">
        {cat.offer ? (
<span className="inline-flex items-center py-2 px-3 rounded text-xs font-bold bg-red-500 text-white">
   50% OFF
</span>        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
      <td className="px-8 py-6">
        {
          cat.isActive? <span className="inline-flex items-center py-2 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800">
  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
  Active
</span>
:
<span className="inline-flex items-center py-2 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800">
  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
  Inactive
</span>
        }
      </td>
      <td className="px-8 py-6">
        <div className="flex justify-center gap-4">
          <button onClick={handleToggle} className="btn btn-ghost btn-xs">
            {cat.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button onClick={() => openModal(cat)} className="btn btn-ghost btn-xs">
            <Edit3 size={18} />
          </button>
          <button onClick={() => softDeleteCategory(cat._id)} className="btn btn-ghost btn-xs">
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryTableRow;