// src/components/product-details/ProductInfo.jsx
import { CheckCircle, Package, ShoppingBag, Tag, XCircle } from "lucide-react";
import InfoRow from "./InfoRow";
import PriceCard from "./PriceCard";
import TimeCard from "./TimeCard";

export default function ProductInfo({ product }) {
  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-9">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight">
          {product.productName}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
          {product.description || "No description provided."}
        </p>
      </div>

      {/* Info Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <InfoRow
          icon={<Tag className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
          label="Category"
          value={product.category?.name || "—"}
        />
        <InfoRow
          icon={<Package assName="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
          label="Stock"
          value={
            <span
              className={`font-bold text-base sm:text-lg ${
                product.quantity > 0 ? "text-emerald-700" : "text-red-700"
              }`}
            >
              {product.quantity} units
            </span>
          }
        />
        <InfoRow
          icon={<ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
          label="Status"
          value={
            <span
              className={`font-bold text-base sm:text-lg flex items-center gap-1 sm:gap-2 ${
                product.status === "Available"
                  ? "text-emerald-700"
                  : "text-red-700"
              }`}
            >
              {product.status === "Available" ? (
                <CheckCircle size={18} className="sm:w-[22px] sm:h-[22px]" />
              ) : (
                <XCircle size={18} className="sm:w-[22px] sm:h-[22px]" />
              )}
              {product.status}
            </span>
          }
        />
        <InfoRow
          label="Offer"
          value={`${product.offer || 0}%`}
          icon={<span className="text-xl sm:text-2xl font-bold text-amber-600">%</span>}
        />
      </div>

      <PriceCard product={product} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-4">
        <TimeCard label="Created At" value={product.createdAt} />
        <TimeCard label="Updated At" value={product.updatedAt} />
      </div>
    </div>
  );
}