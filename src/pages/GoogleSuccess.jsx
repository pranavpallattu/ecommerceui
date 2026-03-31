import { useEffect } from "react";
import useAuthStore from "../utils/stores/userAuthStore";

export default function GoogleSuccess() {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    const init = async () => {
      await checkAuth();

      const state = useAuthStore.getState();

      if (state.role === "admin") {
        return window.location.replace("/admin/dashboard");
      }

      if (state.user) {
        return window.location.replace("/");
      }

      window.location.replace("/auth");
    };

    init();
  }, []);

  return <h1>Logging in...</h1>;
}