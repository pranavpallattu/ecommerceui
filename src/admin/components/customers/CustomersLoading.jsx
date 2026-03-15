// src/components/customers/CustomersLoading.jsx
export default function CustomersLoading() {
  return (
    <div className="flex justify-center items-center h-64 sm:h-96 bg-white rounded-xl sm:rounded-2xl">
      <span className="loading loading-spinner loading-lg text-blue-600"></span>
    </div>
  );
}