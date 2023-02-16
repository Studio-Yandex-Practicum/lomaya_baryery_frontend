import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { findIndexById } from '../../../utils/common-helpers';
import Api from '../../api';
import { Reports } from '../../api/models';

interface ReviewingReportsStore {
  reports: Reports.IReport[] | null;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetch: (shiftId: string) => void;
  approve: (reportId: string) => void;
  decline: (reportId: string) => void;
}

export const useReviewingReportsStore = create<ReviewingReportsStore>()(
  immer((set) => ({
    reports: null,
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
      set((state) => {
        state.isIdle = false;
        state.isLoading = true;
      });

      try {
        await Api.approveReport(reportId);
        set((state) => {
          if (state.reports) {
            const index = findIndexById(state.reports, 'report_id', reportId);

            if (index) {
              state.reports[index].report_status = 'approved';
            }
          }
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
    async decline(reportId) {
      set((state) => {
        state.isIdle = false;
        state.isLoading = true;
      });

      try {
        await Api.declineReport(reportId);
        set((state) => {
          if (state.reports) {
            const index = findIndexById(state.reports, 'report_id', reportId);

            if (index) {
              state.reports[index].report_status = 'declined';
            }
          }
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
  })),
);
