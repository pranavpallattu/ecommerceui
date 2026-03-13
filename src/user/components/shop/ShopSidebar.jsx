// src/components/shop/ShopSidebar.jsx
export default function ShopSidebar({ category, shopCategories, onCategoryChange }) {
  return (
    <div className="drawer-side z-50">
      <label htmlFor="shop-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <aside className="bg-white w-64 min-h-full border-l border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Categories</h2>
          <ul className="menu p-0 space-y-2">
            <li>
              <a
                onClick={() => onCategoryChange("all")}
                className={`py-3 px-4 rounded-lg transition-all ${
                  category === "all" ? "bg-gray-100 text-blue-600 font-medium" : "hover:bg-gray-100"
                }`}
              >
                All Products
              </a>
            </li>
            {shopCategories?.map((cat) => (
              <li key={cat._id}>
                <a
                  onClick={() => onCategoryChange(cat._id)}
                  className={`py-3 px-4 rounded-lg transition-all ${
                    category === cat._id ? "bg-gray-100 text-blue-600 font-medium" : "hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}