import { Link } from "react-router-dom";
import { Package, Heart, Wallet, User } from "lucide-react";

export default function QuickLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <QuickLinkCard
        to="/orders"
        icon={<Package size={28} />}
        label="My Orders"
      />
      <QuickLinkCard
        to="/wishlist"
        icon={<Heart size={28} />}
        label="Wishlist"
      />
      <QuickLinkCard to="/wallet" icon={<Wallet size={28} />} label="Wallet" />
      <QuickLinkCard to="/address" icon={<User size={28} />} label="Address" />
    </div>
  );
}

const QuickLinkCard = ({ to, icon, label }) => (
  <Link
    to={to}
    className="card bg-white shadow-md hover:shadow-lg hover:border-primary transition-all duration-200 border border-transparent"
  >
    <div className="card-body items-center text-center py-8">
      <div className="text-blue-600 mb-3">{icon}</div>
      <h3 className="font-semibold text-lg">{label}</h3>
    </div>
  </Link>
);
