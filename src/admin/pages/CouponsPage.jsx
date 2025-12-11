import { useEffect } from "react";
import CouponsHeader from "../components/CouponsHeader"
import CouponsTable from "../components/CouponsTable";
import Pagination from "../components/Pagination";
import useCouponStore from "../../utils/stores/couponStore";
import CouponFormContent from "../components/CouponFormContent";
import CouponFormModal from "../components/CouponFormModal";

const CouponsPage = () => {

    const { fetchCoupons, search, pagination } = useCouponStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCoupons({ search, page: pagination.currentPage });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, pagination.currentPage]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <CouponsHeader/>
        <CouponsTable/>
        <CouponFormModal/>
         <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page) => fetchCoupons({ search, page })}
        />
      </div>
    </div>
  );
};

export default CouponsPage;