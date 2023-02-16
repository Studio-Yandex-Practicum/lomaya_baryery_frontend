import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import Api from '../../api';
import { Requests } from '../../api/models';

interface PendingRequestsStore {
  requests: Requests.IRequest[] | null;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetch: (shiftId: string) => void;
  approve: (requestId: string) => void;
  decline: (reqBody: Requests.DeclineRequestReq) => void;
}

export const usePendingRequestsStore = create<PendingRequestsStore>()(
  immer((set) => ({
    requests: null,
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
        const requests = await Api.getPendingRequests(shiftId);
        set((state) => {
          state.requests = requests;
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
        await Api.approveRequest(requestId);
        set((state) => {
          if (state.requests) {
            const requestIndex = state.requests.findIndex(
              (request) => request.request_id === requestId,
            );
            if (requestIndex !== -1) {
              state.requests[requestIndex].request_status = 'approved';
            }
          } else {
            throw new Error('internal error');
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
        await Api.declineRequest(payload);
        set((state) => {
          if (state.requests) {
            const requestIndex = state.requests.findIndex(
              (request) => request.request_id === payload.requestId,
            );
            if (requestIndex !== -1) {
              state.requests[requestIndex].request_status = 'declined';
            }
          } else {
            throw new Error('internal error');
          }
        });
      } catch (error) {
        set((state) => {
          state.isError = true;
        });
      }
    },
  })),
);

interface RealizedRequestsStore {
  requests: Requests.IRequest[] | null;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetch: (shiftId: string) => void;
}

export const useRealizedRequestsStore = create<RealizedRequestsStore>()(
  immer((set) => ({
    requests: null,
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
        const realizedRequests = await Api.getRequests(shiftId);

        set((state) => {
          state.requests = realizedRequests;
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
