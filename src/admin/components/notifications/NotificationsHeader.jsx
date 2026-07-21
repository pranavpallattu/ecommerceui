export default function NotificationsHeader() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-blue-100">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Return Notifications
        </h1>
        <p className="text-blue-600 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
          Manage and monitor Order and Item return requests
        </p>
      </div>
    </div>
  );
}
