import { makeRequest } from './base';
import { Report } from '../model';

const ROUTE = 'reports';

export function getReviewingReports(shiftId: string) {
  return makeRequest<Report<'reviewing'>[]>(
    `${ROUTE}/?shift_id=${shiftId}&status=reviewing`,
    {
      method: 'get',
      authorization: false,
      prefixUrl: 'http://127.0.0.1:3000',
    }
  );
}

export function getDeclinedReports(shiftId: string) {
  return makeRequest<Report<'declined'>[]>(
    `${ROUTE}/?shift_id=${shiftId}&status=declined`,
    {
      method: 'get',
      authorization: false,
      prefixUrl: 'http://127.0.0.1:3000',
    }
  );
}

export function getReports(shiftId: string) {
  return makeRequest<Report[]>(`${ROUTE}/?shift_id=${shiftId}`, {
    method: 'get',
    authorization: false,
    prefixUrl: 'http://127.0.0.1:3000',
  });
}

export function approveReport(reportId: string) {
  return makeRequest<Report<'approved'>>(`${ROUTE}/${reportId}/approve`, {
    method: 'patch',
    authorization: false,
    prefixUrl: 'http://127.0.0.1:3000',
  });
}

export function declineReport(reportId: string) {
  return makeRequest<Report<'declined'>>(`${ROUTE}/${reportId}/decline`, {
    method: 'patch',
    authorization: false,
    prefixUrl: 'http://127.0.0.1:3000',
  });
}
