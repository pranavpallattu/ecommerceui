// src/admin/components/Navbar.jsx
import React, { useEffect } from "react";
import { Bell, UserCircle2, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useReturnRequestStore } from "../../utils/stores/useReturnRequestStore";
import useAuthStore from "../../utils/stores/userAuthStore";

const Navbar = ({ onMenuClick }) => {
  const { totalReturns, fetchReturnRequests } = useReturnRequestStore();

  useEffect(() => {
    fetchReturnRequests();
  }, []);

  const navigate = useNavigate();

  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-40 px-4 sm:px-6 flex items-center justify-between lg:justify-end">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Menu size={24} className="text-gray-700" />
      </button>

      {/* Mobile Logo (centered) */}
      <div className="lg:hidden absolute left-1/2 -translate-x-1/2">
        <h1 className="text-lg font-bold text-blue-600">oneBazaar</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notification Bell */}
        <div className="relative">
          <Link to="/admin/notifications">
            <button className="relative p-2 sm:p-2.5 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={20} className="text-gray-700 sm:w-[22px] sm:h-[22px]" />

              {totalReturns > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] flex items-center justify-center px-1 text-[10px] sm:text-xs font-bold text-white bg-red-500 rounded-full">
                  {totalReturns}
                </span>
              )}
            </button>
          </Link>

          {/* Optional: Simple tooltip on hover - Hidden on mobile */}
          <div className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 pointer-events-none transition-opacity hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            {totalReturns} new notification{totalReturns !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <UserCircle2 size={24} className="text-gray-700 sm:w-[28px] sm:h-[28px]" />
          </div>

          <ul className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-28 mt-2 border border-gray-200 z-50">
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-red-600 font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;