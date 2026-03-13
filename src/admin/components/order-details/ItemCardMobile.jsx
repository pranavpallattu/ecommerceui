// src/components/order-details/ItemCardMobile.jsx
export default function ItemCardMobile({ item, STATUS_COLORS }) {
    
    
  return (
    
    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
      <div className="flex justify-between items-start">
        <p className="font-medium text-sm flex-1">{item.productName}</p>
        <span
          className={`ml-2 px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap ${STATUS_COLORS[item.itemStatus]}`}
        >
          {item.itemStatus}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-gray-500">Qty</p>
          <p className="font-medium">{item.quantity}</p>
        </div>
        <div>
          <p className="text-gray-500">Price</p>
          <p className="font-medium">₹{item.price}</p>
        </div>
        <div>
          <p className="text-gray-500">Subtotal</p>
          <p className="font-medium">₹{item.subtotal}</p>
        </div>
      </div>
    </div>
  );
}