import { useEffect, useState } from 'react';
import { X, MapPin, Home, Briefcase, Building } from 'lucide-react';

export default function AddressModal({ show, onClose, editData, onSave, isLoading = false }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    addressType: 'home',
    isDefault: false,
    country: 'India'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm(editData);
      setErrors({});
    } else {
      setForm({
        name: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        pincode: '',
        landmark: '',
        addressType: 'home',
        isDefault: false,
        country: 'India'
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) errs.phone = 'Enter valid 10-digit mobile number';
    if (!form.streetAddress.trim()) errs.streetAddress = 'Street address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state.trim()) errs.state = 'State is required';
    if (!form.pincode.match(/^[1-9][0-9]{5}$/)) errs.pincode = 'Enter valid 6-digit PIN code';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-5 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <MapPin className="text-blue-600" size={26} />
            {editData ? 'Edit Address' : 'Add New Address'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            disabled={isLoading}
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
          {/* Name & Phone */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
                placeholder="9876543210"
              />
              {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address / House No. *
            </label>
            <input
              type="text"
              name="streetAddress"
              value={form.streetAddress}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.streetAddress ? 'input-error' : ''}`}
              placeholder="House No. 12, Street Name, Area"
            />
            {errors.streetAddress && <p className="text-red-600 text-xs mt-1">{errors.streetAddress}</p>}
          </div>

          {/* City, State, PIN */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className={`input input-bordered w-full ${errors.city ? 'input-error' : ''}`}
                placeholder="Malappuram"
              />
              {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                className={`input input-bordered w-full ${errors.state ? 'input-error' : ''}`}
                placeholder="Kerala"
              />
              {errors.state && <p className="text-red-600 text-xs mt-1">{errors.state}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                maxLength={6}
                className={`input input-bordered w-full ${errors.pincode ? 'input-error' : ''}`}
                placeholder="676123"
              />
              {errors.pincode && <p className="text-red-600 text-xs mt-1">{errors.pincode}</p>}
            </div>
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Landmark (optional)
            </label>
            <input
              type="text"
              name="landmark"
              value={form.landmark}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Near KSRTC Bus Stand / Opposite Masjid"
            />
          </div>

          {/* Address Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Address Type
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['home', 'work', 'other'].map(type => (
                <label
                  key={type}
                  className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    form.addressType === type
                      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="addressType"
                    value={type}
                    checked={form.addressType === type}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {type === 'home' && <Home size={28} className="mb-2 text-blue-600" />}
                  {type === 'work' && <Briefcase size={28} className="mb-2 text-blue-600" />}
                  {type === 'other' && <Building size={28} className="mb-2 text-blue-600" />}
                  <span className="font-medium capitalize text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Default */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
              className="checkbox checkbox-primary checkbox-md"
            />
            <label className="text-gray-700 font-medium cursor-pointer">
              Make this my default address
            </label>
          </div>
{/* Footer */}
<div className="flex justify-end gap-4 pt-6 border-t mt-6">
  <button
    type="button"
    onClick={onClose}  // ✅ Use the onClose prop
    className="btn btn-outline px-8"
    disabled={isLoading}
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={isLoading}
    className="btn btn-primary min-w-[140px] gap-2"
  >
    {isLoading && <span className="loading loading-spinner loading-sm"></span>}
    {editData ? 'Update Address' : 'Save Address'}
  </button>
</div>
        </form>
      </div>
    </div>
  );
}