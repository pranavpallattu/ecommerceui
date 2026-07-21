import { Edit2, Trash2, MapPin, Home, Briefcase, Star } from "lucide-react";
import useConfirmModalStore from "../../../utils/stores/ui/useConfirmModalStore";
import useAddressStore from "../../../utils/stores/user/useAddressStore";

export default function AddressCard({ address, onEdit, onDelete }) {
  const { openConfirm } = useConfirmModalStore();
  const defaultAddress = useAddressStore((state) => state.defaultAddress);
  const isDefault = defaultAddress && defaultAddress._id === address._id;
  const typeIcon = {
    home: <Home size={18} />,
    work: <Briefcase size={18} />,
    other: <MapPin size={18} />,
  }[address.addressType] || <MapPin size={18} />;
  console.log(defaultAddress);

  return (
    <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 rounded-2xl overflow-hidden">
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="badge badge-outline gap-2 px-3 py-3">
              {typeIcon}
              <span className="capitalize">{address.addressType}</span>
            </div>

            {isDefault && (
              <div className="badge badge-primary gap-1.5 px-3 py-3">
                <Star size={14} fill="currentColor" />
                DEFAULT
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="btn btn-ghost btn-sm btn-circle hover:bg-gray-100"
              title="Edit"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => {
                console.log("Delete clicked");
                openConfirm({
                  title: "Delete Address?",
                  message: "This address will be removed",
                  confirmText: "Delete",
                  confirmVariant: "error",
                  onConfirm: onDelete,
                });
              }}
              className="btn btn-ghost btn-sm btn-circle text-error hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2.5 text-gray-700">
          <p className="font-semibold text-lg">{address.name}</p>
          <p className="text-base font-medium">{address.phone}</p>

          <address className="not-italic leading-relaxed">
            {address.streetAddress}
            {address.landmark && (
              <span className="text-gray-500 block">
                Near {address.landmark}
              </span>
            )}
            <br />
            {address.city}, {address.state} - {address.pincode}
            <br />
            {address.country}
          </address>
        </div>
      </div>
    </div>
  );
}
