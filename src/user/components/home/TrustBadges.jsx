// src/components/home/TrustBadges.jsx
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

export default function TrustBadges() {
  return (
    <section className="bg-white py-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Truck className="text-blue-600 mb-3" size={40} />
            <h4 className="font-semibold text-lg">Free Shipping</h4>
            <p className="text-sm text-gray-600">For All Orders</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="text-blue-600 mb-3" size={40} />
            <h4 className="font-semibold text-lg">Secure Payment</h4>
            <p className="text-sm text-gray-600">100% Encrypted</p>
          </div>
          <div className="flex flex-col items-center">
            <RotateCcw className="text-blue-600 mb-3" size={40} />
            <h4 className="font-semibold text-lg">Easy Returns</h4>
            <p className="text-sm text-gray-600">Returns Made Simple</p>
          </div>
          <div className="flex flex-col items-center">
            <Headphones className="text-blue-600 mb-3" size={40} />
            <h4 className="font-semibold text-lg">24/7 Support</h4>
            <p className="text-sm text-gray-600">Instant Help</p>
          </div>
        </div>
      </div>
    </section>
  );
}