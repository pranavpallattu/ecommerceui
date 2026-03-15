// src/components/customers/CustomersEmptyState.jsx
export default function CustomersEmptyState() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-10 sm:p-20 text-center">
      <p className="text-xl sm:text-2xl text-gray-500">No customers found</p>
    </div>
  );
}