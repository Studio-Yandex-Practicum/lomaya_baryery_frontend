import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import Api from '../../../components/shared/api';
import { Reports } from '../../../components/shared/api/models';

interface ReportsStore {
  reports: Reports.IReport[];
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetch: (shiftId: string) => void;
}

export const useReportsStore = create<ReportsStore>()(
  immer((set) => ({
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
        const reports = await Api.getReports(shiftId);

        set((state) => {
          state.reports = reports;
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
  }))
);

function selectRealizedReports(state: ReportsStore) {
  let reports: Reports.IReport[] = [];
  if (state.reports) {
    reports = state.reports.filter(
      ({ report_status: status }) =>
        status === 'approved' || status === 'declined'
    );
  }

  return { ...state, reports };
}

export function useRealizedReportsStore() {
  return useReportsStore(selectRealizedReports);
}

export const useDeclinedReportsStore = create<ReportsStore>()(
  immer((set) => ({
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
        const reports = await Api.getDeclinedReports(shiftId);

        set((state) => {
          state.reports = reports;
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
  }))
);
