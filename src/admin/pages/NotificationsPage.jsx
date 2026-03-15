// src/admin/pages/NotificationsPage.jsx
import { useEffect } from "react";
import { useReturnRequestStore } from "../../utils/stores/useReturnRequestStore";

import NotificationsHeader from "../components/notifications/NotificationsHeader";
import NotificationsTable from "../components/notifications/NotificationsTable";

export default function NotificationsPage() {
  const { 
    orderReturns, 
    itemReturns, 
    loading, 
    fetchReturnRequests 
  } = useReturnRequestStore();

  useEffect(() => {
    fetchReturnRequests();
  }, [fetchReturnRequests]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        <NotificationsHeader />

        <NotificationsTable 
          orderReturns={orderReturns}
          itemReturns={itemReturns}
          loading={loading}
        />
      </div>
    </div>
  );
}