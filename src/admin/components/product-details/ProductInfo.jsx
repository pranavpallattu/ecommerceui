import { useState } from "react";
import { CheckCircle, Package, ShoppingBag, Tag, XCircle } from "lucide-react";
import InfoRow from "./InfoRow";
import PriceCard from "./PriceCard";
import TimeCard from "./TimeCard";

function Description({ text }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text && text.length > 200;
  const shown = expanded || !isLong ? text : text.slice(0, 200) + "...";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>

      <p className="text-gray-600 leading-7 whitespace-pre-line break-words">
        {shown || "No description provided."}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export default function ProductInfo({ product }) {
  return (
    <div className="space-y-8">
      <Description text={product.description} />

      {/* Product Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InfoRow
          icon={<Tag className="w-6 h-6 text-blue-600" />}
          label="Category"
          value={product.category?.name || "—"}
        />

        <InfoRow
          icon={<Package className="w-6 h-6 text-blue-600" />}
          label="Stock"
          value={
            <span
              className={`font-bold ${
                product.quantity > 0 ? "text-gray-900" : "text-red-600"
              }`}
            >
              {product.quantity} Units
            </span>
          }
        />

        <InfoRow
          icon={<ShoppingBag className="w-6 h-6 text-blue-600" />}
          label="Availability"
          value={
            <span
              className={`flex items-center gap-2 font-bold ${
                product.status === "Available"
                  ? "text-blue-700"
                  : "text-red-600"
              }`}
            >
              {product.status === "Available" ? (
                <CheckCircle size={18} />
              ) : (
                <XCircle size={18} />
              )}
              {product.status}
            </span>
          }
        />
      </div>

      <PriceCard product={product} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TimeCard label="Created At" value={product.createdAt} />
        <TimeCard label="Updated At" value={product.updatedAt} />
      </div>
    </div>
  );
}
