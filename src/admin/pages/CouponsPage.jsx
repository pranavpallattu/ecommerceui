import { useEffect } from "react";
import CouponsHeader from "../components/coupons/CouponsHeader";
import CouponsTable from "../components/coupons/CouponsTable";
import CouponFormModal from "../components/coupons/CouponFormModal";
import Pagination from "../components/common/Pagination";
import useCouponStore from "../../utils/stores/admin/useCouponStore";

export default function CouponsPage() {
  const { coupons, loading, search, pagination, fetchCoupons } =
    useCouponStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCoupons({ search, page: pagination.currentPage });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, pagination.currentPage, fetchCoupons]);

  if (loading && coupons.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
        {/* Header */}
        <CouponsHeader />

        {/* Table + Modal */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden">
          <CouponsTable />
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <Pagination
              page={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) => fetchCoupons({ search, page })}
            />
          </div>
        )}

        {/* Modal – always present, shows when isModalOpen = true */}
        <CouponFormModal />
      </div>
    </div>
  );
}
