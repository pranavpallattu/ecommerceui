import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ConfirmModal from "./components/ConfirmModal";
import ScrollToTop from "./pages/ScrollToTop";
import useAuthStore from "./utils/stores/auth/useAuthStore";

function App() {
  const { checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} />
      <Outlet />
      <ConfirmModal />
    </div>
  );
}

export default App;
