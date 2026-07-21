import { MapPin } from "lucide-react";

export default function DeliveryAddressCard({ address }) {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title flex items-center gap-2">
          <MapPin size={20} />
          Delivery Address
        </h2>

        <div className="divider my-2"></div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold">{address.name}</p>
          <p>{address.phone}</p>
          <p>
            {address.streetAddress}
            {address.landmark && <br />}
            {address.landmark && `Near ${address.landmark}`}
          </p>
          <p>
            {address.city}, {address.state} - {address.pincode}
          </p>
          <p className="text-gray-500">{address.country || "India"}</p>
        </div>
      </div>
    </div>
  );
}
