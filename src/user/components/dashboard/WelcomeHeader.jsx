import { LogOut, Mail, UserRound } from "lucide-react";

export default function WelcomeHeader({ user, onLogout }) {
  return (
  <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
  <div className="absolute -right-16 -top-16 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-blue-100 blur-3xl opacity-60"></div>
  <div className="absolute -left-16 -bottom-16 h-36 w-36 sm:h-48 sm:w-48 rounded-full bg-indigo-100 blur-3xl opacity-50"></div>

  <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-4 sm:p-6 lg:p-8">
    {/* User Info */}
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left flex-1">
      {/* Avatar */}
      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
        <UserRound className="w-8 h-8 sm:w-9 sm:h-9" />
      </div>

      <div className="min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back,
          <span className="text-blue-600">
            {" "}
            {user?.name?.split(" ")[0] || "User"}
          </span>
        </h1>

        <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 text-gray-500">
          <Mail size={16} className="shrink-0" />
          <span className="text-sm sm:text-base break-all">
            {user?.emailId}
          </span>
        </div>

        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl">
          Manage your orders, wishlist, saved addresses and wallet all in one
          place.
        </p>
      </div>
    </div>

    {/* Logout */}
    <button
      onClick={onLogout}
      className="btn btn-outline border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl gap-2 w-full sm:w-auto"
    >
      <LogOut size={18} />
      Logout
    </button>
  </div>
</div>
  );
}
