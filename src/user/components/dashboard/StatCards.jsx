// src/components/dashboard/StatCards.jsx
import { Wallet, Package, MapPin, Heart } from "lucide-react";

export default function StatCards({ balance, orderCount, addressCount, wishlistCount }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<Wallet className="text-blue-600" />}
        title="Wallet Balance"
        value={`₹${balance?.toLocaleString("en-IN") || "0"}`}
      />
      <StatCard
        icon={<Package className="text-green-600" />}
        title="Total Orders"
        value={orderCount}
      />
      <StatCard
        icon={<MapPin className="text-purple-600" />}
        title="Saved Addresses"
        value={addressCount}
      />
      <StatCard
        icon={<Heart className="text-red-600" />}
        title="Wishlist Items"
        value={wishlistCount}
      />
    </div>
  );
}

const StatCard = ({ icon, title, value }) => (
  <div className="card bg-white shadow-md hover:shadow-lg transition-all duration-200">
    <div className="card-body items-center text-center py-6">
      <div className="text-blue-600 mb-3">{icon}</div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  </div>
);