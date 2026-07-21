import AuthPage from "../pages/AuthPage";
import GoogleSuccessPage from "../pages/GoogleSuccessPage";

const routes = [
  {
    path: "/auth",
    element: <AuthPage />,
  },

  {
    path: "/google-success",
    element: <GoogleSuccessPage />,
  },
];

export default routes;
