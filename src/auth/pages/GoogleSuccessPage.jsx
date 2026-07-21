import { useEffect } from "react";
import useAuthStore from "../../utils/stores/auth/useAuthStore";

export default function GoogleSuccessPage() {
  const { user, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      await checkAuth(); // 
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

  return <h1>Logging in...</h1>;
}