import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import adminRoutes from './admin/AdminRoutes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { authRoutes } from './AuthRouter.jsx'
import userRoutes from './user/UserRoutes.jsx'

const router = createBrowserRouter([
  userRoutes,
  adminRoutes,
  ...authRoutes
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <RouterProvider router={router}> 
    </RouterProvider>
  </StrictMode>,
)
