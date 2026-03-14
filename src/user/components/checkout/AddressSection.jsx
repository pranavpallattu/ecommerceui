// src/components/checkout/AddressSection.jsx
import { MapPin } from "lucide-react";

export default function AddressSection({ defaultAddress }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="card-title flex items-center gap-2">
            <MapPin size={18} />
            Delivery Address
          </h2>
        </div>

        {defaultAddress ? (
          <div className="border rounded-xl p-4 bg-base-200/50">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{defaultAddress.name}</p>
                <p className="text-sm text-gray-600">{defaultAddress.phone}</p>
              </div>
              <span className="badge badge-outline badge-sm">
                {defaultAddress.addressType}
              </span>
            </div>

            <p className="text-sm mt-2 text-gray-700">
              {defaultAddress.streetAddress}
              {defaultAddress.landmark && `, Near ${defaultAddress.landmark}`}
              <br />
              {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pincode}
              <br />
              {defaultAddress.country || "India"}
            </p>
          </div>
        ) : (
          <div className="alert alert-info">
            Please add a delivery address
          </div>
        )}
      </div>
    </div>
  );
}