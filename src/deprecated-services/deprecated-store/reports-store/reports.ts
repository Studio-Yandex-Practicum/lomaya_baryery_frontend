import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { api } from '../../../shared/api';
import type { Report } from '../../../shared/api';

interface ReportsStore {
  reports: Report[];
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
        const reports = await api.getReports(shiftId);

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
  let reports: Report[] = [];
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
        const reports = await api.getDeclinedReports(shiftId);

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
