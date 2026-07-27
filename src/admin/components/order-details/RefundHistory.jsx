import { Wallet } from "lucide-react";

export default function RefundHistory({ refunds = [] }) {
  const processedRefunds = refunds.filter(
    (refund) => refund.status === "Processed",
  );

  const totalRefunded = processedRefunds.reduce(
    (sum, refund) => sum + refund.amount,
    0,
  );

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md border border-blue-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <Wallet size={18} />
        Refund History
      </h3>

      {processedRefunds.length === 0 ? (
        <p className="text-sm text-gray-500">No refunds processed.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Refund ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {processedRefunds.map((refund) => (
                  <tr key={refund.refundId}>
                    <td className="font-mono text-xs">
                      {refund.refundId}
                    </td>

                    <td className="font-semibold text-green-600">
                      ₹{refund.amount.toFixed(2)}
                    </td>

                    <td>
                      <span className="badge badge-success p-3 text-white" >
                        {refund.status}
                      </span>
                    </td>

                    <td>{refund.reason || "-"}</td>

                    <td>
                      {refund.date
                        ? new Date(refund.date).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex justify-end">
            <div className="text-right">
              <p className="text-gray-500 text-sm">Total Refunded</p>

              <p className="text-2xl font-bold text-green-600">
                ₹{totalRefunded.toFixed(2)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}