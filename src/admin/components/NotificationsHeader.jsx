const NotificationsHeader = () => {

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Return Notifications</h1>
          <p className="text-blue-600 mt-2 text-lg">Manage and monitor Order and Item return requests</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsHeader;