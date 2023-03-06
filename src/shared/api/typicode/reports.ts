import { makeRequest } from './base';
import { Report, ReportStatus } from '../model';

const ROUTE = 'reports';

export interface GetReportsParams {
  shiftId: string;
  status: ReportStatus | undefined;
}

export function getReports({ shiftId, status }: GetReportsParams) {
  return makeRequest<Report[]>(`${ROUTE}/`, {
    method: 'get',
    authorization: false,
    searchParams: status
      ? { shift_id: shiftId, status }
      : { shift_id: shiftId },
  });
}

export function approveReport(reportId: string) {
  return makeRequest<Report<'approved'>>(`${ROUTE}/${reportId}/approve`, {
    method: 'patch',
    authorization: false,
  });
}

export function declineReport(reportId: string) {
  return makeRequest<Report<'declined'>>(`${ROUTE}/${reportId}/decline`, {
    method: 'patch',
    authorization: false,
  });
}
