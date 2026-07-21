import { useEffect, useState } from "react";
import { Plus, MapPin, AlertCircle } from "lucide-react";
import AddressModal from "../components/address/AddressModal";
import AddressCard from "../components/address/AddressCard";
import useAddressStore from "../../utils/stores/user/useAddressStore";
import AddressHeader from "../components/address/AddressHeader";

import { useLocation, useNavigate } from "react-router-dom";

export default function AddressPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;
  console.log(from);

  const {
    addresses = [],
    loading,
    error,
    fetchAddresses,
    addAddress,
    editAddress,
    deleteAddress,
    defaultAddress,
  } = useAddressStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (address) => {
    setEditingAddress(address);
    setModalOpen(true);
  };
  const handleSave = async (data) => {
    let success = false;

    if (editingAddress) {
      success = await editAddress(editingAddress._id, data);
    } else {
      success = await addAddress(data);
    }

    if (!success) return;

    setModalOpen(false);
    setEditingAddress(null);

    if (from) {
      navigate(from, { replace: true });
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AddressHeader
          handleOpenAdd={handleOpenAdd}
          loading={loading}
          from={from}
        />

        {/* Error */}
        {error && (
          <div className="alert alert-error mb-6 shadow-sm">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Loading / Empty / Content */}
        {loading && addresses.length === 0 ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : addresses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <MapPin
              className="mx-auto text-gray-300"
              size={64}
              strokeWidth={1}
            />
            <h3 className="text-2xl font-semibold text-gray-700 mt-4">
              No addresses yet
            </h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Add your first address to make checkout quicker and easier.
            </p>
            <button
              onClick={handleOpenAdd}
              className="btn btn-primary mt-6 gap-2"
            >
              <Plus size={18} />
              Add Address
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {addresses.map((addr) => (
              <AddressCard
                key={addr._id}
                address={addr}
                isDefault={defaultAddress?._id === addr._id}
                onEdit={() => handleOpenEdit(addr)}
                onDelete={() => deleteAddress(addr._id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AddressModal
        show={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingAddress(null);
        }}
        editData={editingAddress}
        onSave={handleSave}
        isLoading={loading}
      />
    </div>
  );
}
