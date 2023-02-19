import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { findIndexById } from '../../../components/shared/utils/common-helpers';
import Api from '../../../components/shared/api';
import { Reports } from '../../../components/shared/api/models';

interface ReviewingReportsStore {
  reports: Reports.IReport[];
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetch: (shiftId: string) => void;
  approve: (reportId: string) => void;
  decline: (reportId: string) => void;
}

export const useReviewingReportsStore = create<ReviewingReportsStore>()(
  immer((set, get) => ({
    reports: [],
    isIdle: true,
    isLoading: false,
    isSuccess: false,
    isError: false,
    async fetch(shiftId) {
      set((state) => {
        state.isIdle = false;
        state.isLoading = true;
      });

      try {
        const reviewingReports = await Api.getReviewingReports(shiftId);

        set((state) => {
          state.reports = reviewingReports;
          state.isSuccess = true;
        });
      } catch (error) {
        set((state) => {
          state.isError = true;
        });
      } finally {
        set((state) => {
          state.isIdle = true;
          state.isLoading = false;
        });
      }
    },
    async approve(reportId) {
      try {
        await Api.approveReport(reportId);
        set((state) => {
          const { reports } = get();
          if (reports) {
            const index = findIndexById(reports, 'report_id', reportId);

            if (index !== null) {
              state.reports[index].report_status = 'approved';
            }
          }
        });
      } catch (error) {
        set((state) => {
          state.isError = true;
        });
      }
    },
    async decline(reportId) {
      try {
        await Api.declineReport(reportId);
        set((state) => {
          const { reports } = get();
          if (reports) {
            const index = findIndexById(reports, 'report_id', reportId);

            if (index !== null) {
              state.reports[index].report_status = 'declined';
            }
          }
        });
      } catch (error) {
        set((state) => {
          state.isError = true;
        });
      }
    },
  }))
);
