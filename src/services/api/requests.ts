import makeRequest from './make-request';
import type { Requests } from './models';

export function getPendingRequests(shiftId: string) {
  return makeRequest<Requests.GetPendingRequestsRes>(
    `shifts/${shiftId}/requests?status=pending`,
    {
      method: 'get',
      authorization: false,
    },
  );
}

export function getRequests(shiftId: string) {
  return makeRequest<Requests.GetRequestsRes>(`shifts/${shiftId}/requests`, {
    method: 'get',
    authorization: false,
  });
}

export function approveRequest(requestId: string) {
  return makeRequest<Requests.ApproveRequestRes>(
    `requests/${requestId}/approve`,
    {
      method: 'patch',
      authorization: false,
    },
  );
}

export function declineRequest({
  requestId,
  message,
}: Requests.DeclineRequestReq) {
  return makeRequest<Requests.DeclineRequestRes>(
    `requests/${requestId}/decline`,
    {
      method: 'patch',
      json: { message },
      authorization: false,
    },
  );
}
