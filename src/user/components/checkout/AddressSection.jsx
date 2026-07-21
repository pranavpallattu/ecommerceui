import { MapPin, Phone, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function AddressSection({ defaultAddress }) {
  const location = useLocation();
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <MapPin className="text-primary" size={20} />
            <h2 className="text-xl font-semibold">Delivery Address</h2>
          </div>

          {defaultAddress && (
            <Link
              to="/address"
              state={{ from: location.pathname }}
              className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
            >
              Change
              <ChevronRight size={16} />
            </Link>
          )}
        </div>

        {defaultAddress ? (
          <div className="rounded-xl border border-base-300 p-5 bg-base-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg capitalize">
                  {defaultAddress.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Phone size={15} />
                  {defaultAddress.phone}
                </div>
              </div>

              <span className="badge badge-primary badge-outline capitalize">
                {defaultAddress.addressType}
              </span>
            </div>

            <div className="mt-4 text-sm leading-7 text-gray-700 capitalize">
              <p>{defaultAddress.streetAddress}</p>

              {defaultAddress.landmark && <p>Near {defaultAddress.landmark}</p>}

              <p>
                {defaultAddress.city}, {defaultAddress.state}{" "}
                {defaultAddress.pincode}
              </p>

              <p>{defaultAddress.country}</p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-base-300 p-6 text-center">
            <p className="text-gray-500 mb-4">No delivery address found.</p>

            <Link
              to="/address"
              state={{ from: location.pathname }}
              className="btn btn-primary btn-sm"
            >
              Add Address
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
