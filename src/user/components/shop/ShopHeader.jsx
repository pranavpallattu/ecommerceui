// src/components/shop/ShopHeader.jsx
export default function ShopHeader({ search, category, shopCategories }) {
  const categoryName = shopCategories?.find(c => c._id === category)?.name || category;

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <nav className="text-sm text-gray-500 mb-2">
          <span className="hover:underline cursor-pointer">Home</span> / Shop
          {category !== "all" && ` / ${categoryName}`}
          {search && ` / Results for "${search}"`}
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
      </div>
    </header>
  );
}