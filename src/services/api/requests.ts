import makeRequest from './make-request';
import type { Requests } from './models';

export function getPendingRequests(shiftId: string) {
  return makeRequest<Requests.GetPendingRequestsRes>(`shifts/${shiftId}/requests?status=pending`, {
    method: 'get',
    authorization: false,
  });
}

export function getRequests(shiftId: string) {
  return makeRequest<Requests.GetRequestsRes>(`shifts/${shiftId}/requests`, {
    method: 'get',
    authorization: false,
  });
}

export function approveRequest(requestId: string) {
  return makeRequest(`requests/${requestId}/approve`, { method: 'patch', authorization: false });
}

export function declineRequest(requestId: string, message: string) {
  const reqBody: Requests.DeclineRequestReq = {
    message,
  };
  return makeRequest<Requests.ApproveRequestRes>(`requests/${requestId}/decline`, {
    method: 'patch',
    json: reqBody,
    authorization: false,
  });
}
