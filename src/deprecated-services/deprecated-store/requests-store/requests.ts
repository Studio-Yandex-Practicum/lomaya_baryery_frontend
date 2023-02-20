import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { findIndexById } from '../../../shared/utils/common-helpers';
import { api } from '../../../shared/api';
import type { Request } from '../../../shared/api';

interface PendingRequestsStore {
  requests: Request[];
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetch: (shiftId: string) => void;
  approve: (requestId: string) => void;
  decline: (reqBody: Request<'declined'>) => void;
}

export const usePendingRequestsStore = create<PendingRequestsStore>()(
  immer((set, get) => ({
    requests: [],
    isIdle: true,
    isSuccess: false,
    isLoading: false,
    isError: false,
    async fetch(shiftId) {
      set((state) => {
        state.isIdle = false;
        state.isLoading = true;
      });
      try {
        const requests = await api.getPendingRequests(shiftId);
        set((state) => {
          state.requests = requests;
          state.isSuccess = true;
        });
      } catch (error) {
        set((state) => {
          state.isError = true;
        });
      } finally {
        set((state) => {
          state.isLoading = false;
          state.isIdle = true;
        });
      }
    },
    async approve(requestId) {
      try {
        await api.approveRequest(requestId);
        set((state) => {
          const { requests } = get();

          const requestIndex = findIndexById(requests, 'request_id', requestId);
          if (requestIndex !== null) {
            state.requests[requestIndex].request_status = 'approved';
          }
        });
      } catch (error) {
        set((state) => {
          state.isError = true;
        });
      }
    },
    async decline(payload) {
      try {
        await api.declineRequest(payload);
        set((state) => {
          const { requests } = get();
          const requestIndex = findIndexById(
            requests,
            'request_id',
            payload.request_id
          );
          if (requestIndex !== null) {
            state.requests[requestIndex].request_status = 'declined';
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

interface RealizedRequestsStore {
  requests: Request[];
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetch: (shiftId: string) => void;
}

export const useRealizedRequestsStore = create<RealizedRequestsStore>()(
  immer((set) => ({
    requests: [],
    isIdle: true,
    isSuccess: false,
    isLoading: false,
    isError: false,
    async fetch(shiftId) {
      set((state) => {
        state.isIdle = false;
        state.isLoading = true;
      });

      try {
        const realizedRequests = await api.getRequests(shiftId);

        set((state) => {
          state.requests = realizedRequests;
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
