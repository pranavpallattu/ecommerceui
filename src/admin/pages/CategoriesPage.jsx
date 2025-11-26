// src/admin/pages/CategoriesPage.jsx
import React, { useState } from "react";
import { Search, Plus, Edit3, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";

const CategoriesPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const totalPages = 12; // example
  const visiblePages = 4;

  const categories = [
    { id: 1, name: "Electronics", desc: "Phones, laptops & gadgets", offer: "12%", active: true },
    { id: 2, name: "Fashion", desc: "Clothing & accessories", offer: "20%", active: true },
    { id: 3, name: "Home & Living", desc: "Furniture & decor", offer: null, active: false },
    { id: 4, name: "Beauty", desc: "Skincare & makeup", offer: "15%", active: true },
  ];

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  );

  // Generate visible page numbers (smart logic)
  const getVisiblePages = () => {
    const start = Math.max(1, page - Math.floor(visiblePages / 2));
    const end = Math.min(totalPages, start + visiblePages - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const getCategories=async()=>{
    const result=await 
  }



  return (
    <div className="min-h-screen bg-gray-50 py-10">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold text-gray-900">Categories</h1>
        <p className="text-sm text-gray-500 mt-2">Manage and organize product categories</p>
      </div>

      {/* Top Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="w-96">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-gray-300 transition-all"
            />
          </div>
        </div>

        <button className="h-12 px-6 bg-black text-white rounded-2xl font-medium text-sm flex items-center gap-2 hover:bg-gray-800 transition-all">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-8 py-5 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-left px-8 py-5 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="text-left px-8 py-5 text-xs font-medium text-gray-500 uppercase tracking-wider">Offer</th>
              <th className="text-left px-8 py-5 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-center px-8 py-5 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50/30 transition-all duration-200">
                <td className="px-8 py-6 font-medium text-gray-900">{cat.name}</td>
                <td className="px-8 py-6 text-gray-600 text-sm">{cat.desc}</td>
                <td className="px-8 py-6">
                  {cat.offer ? (
                    <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                      {cat.offer} off
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-8 py-6">
                  <span className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full ${
                    cat.active 
                      ? "bg-emerald-100 text-emerald-700" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {cat.active ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-5">
                    <button className="group">
                      {cat.active ? (
                        <EyeOff size={17} className="text-gray-500 group-hover:text-gray-700 transition" />
                      ) : (
                        <Eye size={17} className="text-gray-500 group-hover:text-emerald-600 transition" />
                      )}
                    </button>
                    <button className="group">
                      <Edit3 size={17} className="text-gray-500 group-hover:text-blue-600 transition" />
                    </button>
                    <button className="group">
                      <Trash2 size={17} className="text-gray-500 group-hover:text-red-600 transition" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer — Elite Pagination */}
        <div className="flex items-center justify-between px-8 py-5 bg-gray-50/50 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filtered.length}</span> of{" "}
            <span className="font-medium">{categories.length}</span> categories
          </p>

          {/* Perfect 4-Page + Chevron Pagination */}
          <div className="flex items-center gap-1 border border-gray-200 rounded-xl overflow-hidden">
            {/* Previous */}
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>

            {/* Page Numbers (Always 4 visible) */}
            {getVisiblePages().map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-10 h-10 text-sm font-medium transition-all ${
                  page === n
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {n}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;