// src/admin/layout/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      
      <main className="ml-64 pt-16 min-h-screen bg-gray-50">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AdminLayout;