// src/admin/components/CategoryTableRow.jsx
import { Edit3, Trash2, Eye, EyeOff } from "lucide-react";

const CategoryTableRow = ({ cat, onEdit, onDelete, onToggleStatus }) => {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-8 py-6 font-medium text-gray-900">{cat.name}</td>
      <td className="px-8 py-6 text-gray-600 text-sm">{cat.description}</td>
      <td className="px-8 py-6">
        {cat.offer ? (
          <span className="badge badge-info badge-sm">{cat.offer}% off</span>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
      <td className="px-8 py-6">
        <span
          className={`badge ${cat.isActive ? "badge-success" : "badge-ghost"} badge-sm`}
        >
          {cat.isActive ? "Active" : "Hidden"}
        </span>
      </td>
      <td className="px-8 py-6">
        <div className="flex justify-center gap-4">
          <button onClick={onToggleStatus} className="btn btn-ghost btn-xs">
            {cat.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button onClick={() => onEdit(cat)} className="btn btn-ghost btn-xs">
            <Edit3 size={18} />
          </button>
          <button onClick={() => onDelete(cat._id)} className="btn btn-ghost btn-xs">
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryTableRow;