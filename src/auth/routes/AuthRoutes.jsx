import AuthGuard from "../../guards/AuthGuard";
import AuthPage from "../pages/AuthPage";
import GoogleSuccessPage from "../pages/GoogleSuccessPage";

const routes = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },

  {
    path: "/google-success",
    element: <GoogleSuccessPage />,
  },
];

export default routes;
