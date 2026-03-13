import { MapPin, Plus } from 'lucide-react'
import React from 'react'

const AddressHeader = ({handleOpenAdd, loading}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
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
        </div>  )
}

export default AddressHeader