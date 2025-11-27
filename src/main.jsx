import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import adminRoutes from './admin/AdminRoutes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { authRoutes } from './AuthRouter.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/appStore.js'

const router = createBrowserRouter([
  adminRoutes,
  ...authRoutes,
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
       <RouterProvider router={router}> 
    </RouterProvider>
    </Provider>
   
  </StrictMode>,
)
