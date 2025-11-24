import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import AdminHome from './pages/AdminHome'

function App() {

  return (
    <>

    <BrowserRouter>
    <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/adminDashboard" element={<AdminHome />} />

       <Route path="/auth" element={<Auth />} />
    </Routes>
    
    </BrowserRouter>
 
    </>
  )
}

export default App
