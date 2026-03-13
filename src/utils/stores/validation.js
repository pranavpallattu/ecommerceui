export const validateAddress = (data) => {
  if (!data.name?.trim()) return "Name is required";
  if (!data.phone?.trim()) return "Phone number is required";

  if (!/^[6-9]\d{9}$/.test(data.phone)) {
    return "Enter a valid 10-digit mobile number";
  }

  if (!data.streetAddress?.trim())
    return "Street address is required";

  if (!data.city?.trim()) return "City is required";
  if (!data.state?.trim()) return "State is required";

  if (!data.pincode?.trim()) return "Pincode is required";

  if (!/^\d{6}$/.test(data.pincode)) {
    return "Enter a valid 6-digit pincode";
  }

  if (!data.addressType) return "Address type is required";

  return null; // ✅ valid
};
