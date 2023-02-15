import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Api from '../../api';
import { Requests } from '../../api/models';

export function usePendingRequests(shiftId: string | undefined | null) {
  return useQuery({
    queryKey: ['requests', 'pending'],
    queryFn: () => (shiftId ? Api.getPendingRequests(shiftId) : null),
    enabled: Boolean(shiftId),
    staleTime: 0,
  });
}

export function useApproveRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: Api.approveRequest,
    onSuccess: (data, mutationArg) => {
      queryClient.setQueryData(
        ['requests', 'pending'],
        (oldData: Requests.GetPendingRequestsRes | undefined) => {
          if (oldData) {
            return oldData.map((request) => {
              if (request.request_id === mutationArg) {
                request.request_status = 'approved';
              }
              return request;
            });
          }
        },
      );
    },
  });
}

export function useDeclineRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: Api.declineRequest,
    onSuccess: (data, mutationArg) => {
      queryClient.setQueryData(
        ['requests', 'pending'],
        (oldData: Requests.GetPendingRequestsRes | undefined) => {
          if (oldData) {
            return oldData.map((request) => {
              if (request.request_id === mutationArg.requestId) {
                request.request_status = 'declined';
              }
              return request;
            });
          }
        },
      );
    },
  });
}

export function useRealizedRequests(shiftId: string | null | undefined) {
  return useQuery({
    queryKey: ['requests', 'realized'],
    queryFn: () => (shiftId ? Api.getRequests(shiftId) : null),
    select: (data) => {
      if (data) {
        return data.filter((request) => request.request_status !== 'pending');
      }
    },
    enabled: Boolean(shiftId),
    staleTime: 0,
  });
}
