import { makeRequest } from './base';
import { Request, RequestStatus } from '../model';

export interface GetRequestsParams {
  shiftId: string;
  status?: RequestStatus;
}

export function getRequests({ shiftId, status }: GetRequestsParams) {
  return makeRequest<Request[]>(`shifts/${shiftId}/requests`, {
    method: 'get',
    authorization: true,
    searchParams: status ? { status } : undefined,
  });
}

export function approveRequest(requestId: string) {
  return makeRequest<Request<'approved'>>(`requests/${requestId}/approve`, {
    method: 'patch',
    authorization: true,
  });
}

export interface DeclineRequestParams {
  requestId: string;
  message: string;
}

export function declineRequest({ requestId, message }: DeclineRequestParams) {
  return makeRequest<Request<'declined'>>(`requests/${requestId}/decline`, {
    method: 'patch',
    json: { message },
    authorization: true,
  });
}
