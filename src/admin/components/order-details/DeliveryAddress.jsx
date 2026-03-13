// src/components/order-details/DeliveryAddress.jsx
import { MapPin } from "lucide-react";

export default function DeliveryAddress({ address }) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md border border-blue-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
        <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" /> 
        Delivery Address
      </h3>

      {address ? (
        <div className="space-y-1 text-xs sm:text-sm text-gray-700">
          <p className="font-semibold">{address.name}</p>
          <p>{address.phone}</p>
          <p>{address.streetAddress}</p>
          <p>
            {address.city}, {address.state}
          </p>
          <p>
            {address.country} - {address.pincode}
          </p>
          {address.landmark && (
            <p className="text-gray-500">
              Landmark: {address.landmark}
            </p>
          )}

          <span className="inline-block mt-2 px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full bg-blue-100 text-blue-700">
            {address.addressType}
          </span>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No address found</p>
      )}
    </div>
  );
}