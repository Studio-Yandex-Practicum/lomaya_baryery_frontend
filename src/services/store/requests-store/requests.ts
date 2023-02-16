import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { findIndexById } from '../../../utils/common-helpers';
import Api from '../../api';
import { Requests } from '../../api/models';

interface PendingRequestsStore {
  requests: Requests.IRequest[];
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetch: (shiftId: string) => void;
  approve: (requestId: string) => void;
  decline: (reqBody: Requests.DeclineRequestReq) => void;
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
        const requests = await Api.getPendingRequests(shiftId);
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
        await Api.approveRequest(requestId);
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
        await Api.declineRequest(payload);
        set((state) => {
          const { requests } = get();
          const requestIndex = findIndexById(
            requests,
            'request_id',
            payload.requestId,
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
  })),
);

interface RealizedRequestsStore {
  requests: Requests.IRequest[];
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
        const realizedRequests = await Api.getRequests(shiftId);

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
  })),
);
