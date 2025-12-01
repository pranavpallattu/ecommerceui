// src/admin/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Tag,
  Package,
  BadgePercent,
  Users,
  BarChart3,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { name: "Categories", path: "/admin/categories", icon: Tag },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Coupons", path: "/admin/coupons", icon: BadgePercent },
  { name: "Customers", path: "/admin/customers", icon: Users },
  { name: "Sales Report", path: "/admin/sales", icon: BarChart3 },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-10">
      {/* === PREMIUM HEADER === */}
      <div className="p-2 border-b border-gray-200 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="flex items-center gap-3">
          {/* Logo Circle */}
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
              <span className="text-blue-700 font-black text-lg">B</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              oneBazaar
            </h1>
            <p className="text-xs text-white/80 font-medium">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-200"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                  end
                >
                  <Icon
                    size={19}
                    className={`transition-colors ${
                      NavLink.isActive ? "text-blue-700" : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          © 2025 oneBazaar. All rights reserved.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;