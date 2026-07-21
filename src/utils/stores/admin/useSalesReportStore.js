import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  getSalesReportApi,
  downloadSalesPDFApi,
  downloadSalesExcelApi,
} from "../../../services/allApis";
import { toast } from "react-toastify";

const useSalesReportStore = create(
  devtools((set, get) => ({
    report: null,
    loading: false,
    downloadLoading: false,
    error: null,

    // Used for PDF / Excel downloads
    currentPayload: { filterType: "all" },

    //  FETCH REPORT
    fetchReport: async (payload = { filterType: "all" }) => {
      set({ loading: true, error: null, currentPayload: payload });

      try {
        const res = await getSalesReportApi(payload);

        if (!res?.success) {
          const msg = res?.message || "Failed to fetch sales report";
          set({ loading: false, error: msg });
          toast.error(msg);
          return;
        }

        set({
          report: res.data.data,
          loading: false,
        });
      } catch (err) {
        console.error("fetchReport error:", err);
        set({ loading: false, error: "Network error" });
        toast.error("Network error while fetching report");
      }
    },

    //  DOWNLOAD PDF
    downloadPDF: async () => {
      set({ downloadLoading: true });

      try {
        const res = await downloadSalesPDFApi(get().currentPayload);

        if (!res?.success || !res?.url) {
          toast.error(res?.message || "PDF download failed");
          return;
        }

        const link = document.createElement("a");
        link.href = res.url;
        link.download = `sales-report-${new Date()
          .toISOString()
          .slice(0, 10)}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Sales report PDF downloaded");
      } catch (err) {
        console.error("downloadPDF error:", err);
        toast.error("PDF download failed");
      } finally {
        set({ downloadLoading: false });
      }
    },

    //  DOWNLOAD EXCEL
    downloadExcel: async () => {
      set({ downloadLoading: true });

      try {
        const res = await downloadSalesExcelApi(get().currentPayload);

        if (!res?.success || !res?.url) {
          toast.error(res?.message || "Excel download failed");
          return;
        }

        const link = document.createElement("a");
        link.href = res.url;
        link.download = `sales-report-${new Date()
          .toISOString()
          .slice(0, 10)}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Sales report Excel downloaded");
      } catch (err) {
        console.error("downloadExcel error:", err);
        toast.error("Excel download failed");
      } finally {
        set({ downloadLoading: false });
      }
    },
  })),
);

export default useSalesReportStore;
