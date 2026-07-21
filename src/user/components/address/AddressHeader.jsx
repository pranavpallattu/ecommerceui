import { MapPin, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddressHeader = ({ handleOpenAdd, loading, from }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 mb-8">
      {from && (
        <button
          onClick={() => navigate(from)}
          className="btn btn-ghost btn-sm w-fit gap-2"
        >
          <ArrowLeft size={16} />
          Back to Checkout
        </button>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MapPin className="text-indigo-600" size={28} />
            My Addresses
          </h1>

          <p className="text-gray-600 mt-1 text-sm">
            Manage delivery addresses for faster checkout
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn btn-primary gap-2 px-6"
          disabled={loading}
        >
          <Plus size={18} />
          Add New
        </button>
      </div>
    </div>
  );
};

export default AddressHeader;
