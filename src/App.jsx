import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ConfirmModal from "./admin/components/ConfirmModal";
import useAuthStore from "./utils/stores/userAuthStore";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);


  useEffect(() => {
    checkAuth(); // ✅ SINGLE SOURCE OF TRUTH
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <ToastContainer position="top-right" autoClose={3000} />
      <Outlet />
      <ConfirmModal />
    </div>
  );
}

export default App;
