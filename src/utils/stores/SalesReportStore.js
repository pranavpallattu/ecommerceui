// src/utils/stores/salesReportStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  getSalesReportApi,
  downloadSalesPDFApi,
  downloadSalesExcelApi,
} from "../../services/allApis";

const useSalesReportStore = create(
  devtools((set, get) => ({
    // === STATE ===
    report: null,
    loading: false,
    downloadLoading: false,
    error: null,

    // Current filter (used for PDF/Excel)
    currentPayload: { filterType: "all" },

    // === FETCH REPORT ===
    fetchReport: async (payload = { filterType: "all" }) => {
      set({ loading: true, error: null, currentPayload: payload });

      try {
        const res = await getSalesReportApi(payload);

        if (!res.success) {
          set({ loading: false, error: res.message || "Failed to fetch report" });
          return;
        }

        set({
          report: res.data.data,
          loading: false,
        });
      } catch (err) {
        console.error("fetchReport error:", err);
        set({ loading: false, error: "Network error" });
      }
    },

    // === DOWNLOAD PDF ===
    downloadPDF: async () => {
      set({ downloadLoading: true });
      try {
        const res = await downloadSalesPDFApi(get().currentPayload);
        if (res.success) {
          const link = document.createElement("a");
          link.href = res.url;
          link.download = `sales-report-${new Date().toISOString().slice(0, 10)}.pdf`;
          link.click();
        } else {
          alert("PDF download failed");
        }
      } catch (err) {
        alert("PDF download failed");
      } finally {
        set({ downloadLoading: false });
      }
    },

    // === DOWNLOAD EXCEL ===
    downloadExcel: async () => {
      set({ downloadLoading: true });
      try {
        const res = await downloadSalesExcelApi(get().currentPayload);
        if (res.success) {
          const link = document.createElement("a");
          link.href = res.url;
          link.download = `sales-report-${new Date().toISOString().slice(0, 10)}.xlsx`;
          link.click();
        } else {
          alert("Excel download failed");
        }
      } catch (err) {
        alert("Excel download failed");
      } finally {
        set({ downloadLoading: false });
      }
    },
  }))
);

export default useSalesReportStore;