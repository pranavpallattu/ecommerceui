// src/admin/pages/NotificationsPage.jsx
import { useEffect } from "react";
import { useReturnRequestStore } from "../../utils/stores/useReturnRequestStore";
import NotificationsTable from "../components/NotificationsTable";
import NotificationsHeader from "../components/NotificationsHeader";

const NotificationsPage = () => {
  const { fetchReturnRequests } = useReturnRequestStore();

  useEffect(() => {
    fetchReturnRequests();
  }, [fetchReturnRequests]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <NotificationsHeader/>
        <NotificationsTable />
      </div>
    </div>
  );
};

export default NotificationsPage;
