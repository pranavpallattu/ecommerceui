import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import adminRoutes from "./admin/AdminRoutes.jsx";
import userRoutes from "./user/UserRoutes.jsx";
import authRoutes  from "./AuthRouter.jsx";
import NotFound from "./admin/pages/NotFoundPage.jsx";
import { googleSuccessRoute } from "./pages/GoogleSuccessRoute.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 🔥 App becomes the global wrapper
    children: [
      userRoutes,
      adminRoutes,
      ...authRoutes,
      googleSuccessRoute
      
    ],
  },{
    path:"*",
    element:<NotFound/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
