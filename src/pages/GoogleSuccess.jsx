import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../utils/stores/userAuthStore";

export default function GoogleSuccess() {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const { role } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      await checkAuth();

      const state = useAuthStore.getState();
      if (state.role === "admin") return navigate("/admin/dashboard");
      if (state.user) return navigate("/");
      navigate("/auth");
    };

    init();
  }, []);

  return <h1>Logging in...</h1>;
}