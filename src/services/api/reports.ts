import makeRequest from './make-request';
import type { Reports } from './models';

const ROUTE = 'reports';

export function getReviewingReports(shiftId: string) {
  return makeRequest<Reports.GetReviewingReportsRes>(
    `${ROUTE}/?shift_id=${shiftId}&status=reviewing`,
    {
      method: 'get',
      authorization: false,
      prefixUrl: 'http://127.0.0.1:3000',
    },
  );
}

export function getDeclinedReports(shiftId: string) {
  return makeRequest<Reports.GetReviewingReportsRes>(
    `${ROUTE}/?shift_id=${shiftId}&status=declined`,
    {
      method: 'get',
      authorization: false,
      prefixUrl: 'http://127.0.0.1:3000',
    },
  );
}

export function getReports(shiftId: string) {
  return makeRequest<Reports.GetReportRes>(`${ROUTE}/?shift_id=${shiftId}`, {
    method: 'get',
    authorization: false,
    prefixUrl: 'http://127.0.0.1:3000',
  });
}

export function approveReport(reportId: string) {
  return makeRequest<Reports.ApproveReportRes>(`${ROUTE}/${reportId}/approve`, {
    method: 'patch',
    authorization: false,
    prefixUrl: 'http://127.0.0.1:3000',
  });
}

export function declineReport(reportId: string) {
  return makeRequest<Reports.DeclineReportRes>(`${ROUTE}/${reportId}/decline`, {
    method: 'patch',
    authorization: false,
    prefixUrl: 'http://127.0.0.1:3000',
  });
}
