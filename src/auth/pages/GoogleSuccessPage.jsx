import { useEffect } from "react";
import useAuthStore from "../../utils/stores/auth/useAuthStore";

export default function GoogleSuccessPage() {
  const { user, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      await checkAuth();
    };
    init();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (user?.isAdmin) {
      window.location.replace("/admin/dashboard");
    } else if (user) {
      window.location.replace("/");
    } else {
      window.location.replace("/auth");
    }
  }, [user, loading]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgiPftJFEcFuclHRqhqXpbM58OXt2F5zRmtA&s"
        className="w-20 h-20 mb-6 rounded-xl object-cover"
        alt="OneBazaar Logo"
      />

      <h1 className="text-xl font-semibold text-gray-900 mb-2">
        Signing you in...
      </h1>

      <p className="text-gray-500 text-sm mb-6 max-w-xs">
        Please wait while we securely authenticate your Google account.
      </p>

      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <div className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        Loading...
      </div>
    </div>
  );
}
