export default function ItemTableDesktop({ items, STATUS_COLORS }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          <th className="py-3 px-3 text-left">Product</th>
          <th className="py-3 px-3 text-center">Qty</th>
          <th className="py-3 px-3 text-center">Price</th>
          <th className="py-3 px-3 text-center">Subtotal</th>
          <th className="py-3 px-3 text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item, idx) => (
          <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
            <td className="py-3 px-3">{item.productName}</td>
            <td className="py-3 px-3 text-center">{item.quantity}</td>
            <td className="py-3 px-3 text-center">₹{item.price}</td>
            <td className="py-3 px-3 text-center">₹{item.subtotal}</td>
            <td className="py-3 px-3 text-center">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs ${STATUS_COLORS[item.itemStatus]}`}
              >
                {item.itemStatus}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
