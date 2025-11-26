// src/admin/components/Navbar.jsx
import React from "react";
import { Bell, UserCircle2, LogOut, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-40 px-6 flex items-center justify-end">
      <div className="flex items-center gap-5">

        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors">
            <Bell size={22} className="text-gray-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Optional: Simple tooltip on hover */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 pointer-events-none transition-opacity hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            3 new notifications
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <UserCircle2 size={28} className="text-gray-700" />
          </div>

          <ul className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-48 mt-2 border border-gray-200 z-50">
            <li>
              <a className="flex items-center gap-3">
                <User size={16} />
                Profile
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 text-red-600 font-medium">
                <LogOut size={16} />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;