import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import Api from '../../api';
import { Reports } from '../../api/models';

interface ReportsStore {
  reports: Reports.IReport[] | null;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetch: (shiftId: string) => void;
}

export const useReportsStore = create<ReportsStore>()(
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
        const reports = await Api.getReports(shiftId);

        set((state) => {
          state.reports = reports;
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

function selectRealizedReports(state: ReportsStore) {
  let reports = null;
  if (state.reports) {
    reports = state.reports.filter(
      ({ report_status: status }) =>
        status === 'approved' || status === 'declined',
    );
  }

  return { ...state, reports };
}

function selectDeclinedReports(state: ReportsStore) {
  let reports = null;
  if (state.reports) {
    reports = state.reports.filter(
      ({ report_status: status }) => status === 'declined',
    );
  }

  return { ...state, reports };
}

export function useRealizedReportsStore() {
  return useReportsStore(selectRealizedReports);
}

export function useDeclinedReportsStore() {
  return useReportsStore(selectDeclinedReports);
}
