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
      {/* Logo & Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Minimalist Logo Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
            OB
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              oneBazaar
            </h1>
            <p className="text-xs text-gray-500 leading-none">
              One World. Infinite Finds.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                  end
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Optional Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          © 2025 oneBazaar Admin
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;