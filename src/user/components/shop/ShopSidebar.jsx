import { X } from "lucide-react";

export default function ShopSidebar({
  category,
  shopCategories,
  onCategoryChange,
}) {
  const items = [
    { _id: "all", name: "All Products" },
    ...(shopCategories || []),
  ];

  return (
    <div className="drawer-side z-50">
      <label htmlFor="shop-drawer" className="drawer-overlay"></label>

      <aside className="w-72 bg-white border-r border-base-200 flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 lg:border-none">
          <h2 className="text-lg font-bold text-gray-900">Categories</h2>
          <label
            htmlFor="shop-drawer"
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <X size={18} className="text-gray-500" />
          </label>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-2">
            {items.map((cat) => {
              const active = category === cat._id;

              return (
                <li key={cat._id}>
                  <button
                    onClick={() => onCategoryChange(cat._id)}
                    className={`w-full text-left rounded-xl px-4 py-3 transition ${
                      active
                        ? "bg-base-200 text-gray-900 font-semibold shadow"
                        : "hover:bg-base-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
