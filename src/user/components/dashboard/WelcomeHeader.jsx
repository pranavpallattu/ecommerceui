// src/components/dashboard/WelcomeHeader.jsx
import { LogOut } from "lucide-react";

export default function WelcomeHeader({ user, onLogout }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back
          </h1>
          <p className="text-sm text-gray-600">
            {user?.name?.split(" ")[0] || "User"}
          </p>
          <p className="text-gray-600 mt-1">{user?.emailId}</p>
          <p className="text-sm text-gray-500 mt-2">
            Manage your orders, wallet, wishlist & addresses
          </p>
        </div>

        <button
          onClick={onLogout}
          className="btn btn-ghost btn-sm gap-2 text-error self-start sm:self-center"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}