// src/admin/components/customers/CustomersTable.jsx
import useCouponStore from "../../utils/stores/couponStore";
import CouponsTableRow from "./CouponsTableRow";

const CouponsTable = () => {
  const { coupons, loading } = useCouponStore();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96 bg-white rounded-2xl">
//         <span className="loading loading-spinner loading-lg text-blue-600"></span>
//       </div>
//     );
//   }

  if (coupons.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
        <p className="text-2xl text-gray-500">No coupons found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <tr>
              <th className="px-8 py-6 text-left text-sm font-semibold">
                Coupon Code
              </th>
              <th className="px-8 py-6 text-left text-sm font-semibold">
                Description
              </th>
              <th className="px-8 py-6 text-left text-sm font-semibold">
                Discount Type
              </th>
              <th className="px-8 py-6 text-left text-sm font-semibold">
                Discount
              </th>
              <th className="px-8 py-6 text-center text-sm font-semibold">
                Minimum Purchase
              </th>
              <th className="px-8 py-6 text-center text-sm font-semibold">
                Expiry Date
              </th>
              <th className="px-8 py-6 text-center text-sm font-semibold">
                Usage Limit
              </th>
              <th className="px-8 py-6 text-center text-sm font-semibold">
                Per User Limit
              </th>
                  <th className="px-8 py-6 text-center text-sm font-semibold">
                Total Used Count
              </th>
              <th className="px-8 py-6 text-center text-sm font-semibold">
                Status
              </th>
              <th className="px-8 py-6 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {coupons.map((coupon) => (
              <CouponsTableRow key={coupon._id} coupon={coupon} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponsTable;
