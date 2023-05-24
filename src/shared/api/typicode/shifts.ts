import { formElementForBlobFile } from 'shared/lib';
import { makeRequest, makeBlobRequest } from './base';
import { Participant, Shift } from '../model';

export function getShifts() {
  return makeRequest<Shift[]>('shifts/', {
    method: 'get',
    authorization: true,
  });
}

interface CreateShiftParams {
  title: string;
  startedAt: string;
  finishedAt: string;
}

export function createNewShift({
  title,
  startedAt,
  finishedAt,
}: CreateShiftParams) {
  const reqBody = {
    title,
    started_at: startedAt,
    finished_at: finishedAt,
  };

  return makeRequest<Shift<'preparing'>>('shifts/', {
    authorization: true,
    method: 'post',
    json: reqBody,
  });
}

interface GetShiftParticipants {
  shift: Shift;
  members: Participant[];
}

export function getShiftParticipants(shiftId: string) {
  return makeRequest<GetShiftParticipants>(`shifts/${shiftId}/users`, {
    method: 'get',
    authorization: true,
  });
}

export interface UpdateShiftParams {
  shiftId: string;
  title: string;
  startedAt: string;
  finishedAt: string;
  message: string;
}

export function updateShiftSettings({
  shiftId,
  title,
  startedAt,
  finishedAt,
  message,
}: UpdateShiftParams) {
  const reqBody = {
    title,
    started_at: startedAt,
    finished_at: finishedAt,
    final_message: message,
  };

  return makeRequest<Shift<'started' | 'preparing'>>(`shifts/${shiftId}`, {
    method: 'patch',
    json: reqBody,
    authorization: true,
  });
}

export function finishShift(shiftId: string) {
  return makeRequest<Shift<'finished'>>(`shifts/${shiftId}/finish`, {
    method: 'patch',
    authorization: true,
  });
}

function getFullReport() {
  return makeBlobRequest(`analytics/total`, {
    method: 'get',
    authorization: true,
  });
}

function getReportById(shiftId: string) {
  return makeBlobRequest(`analytics/${shiftId}/shift_report`, {
    method: 'get',
    authorization: true,
  });
}

export const downloadFullReport = async (): Promise<void> => {
  const date: Date = new Date();
  const outputFilename = `Отчет от ${date.getDate()}_${
    date.getMonth() + 1
  }_${date.getFullYear()}.xls`;
  try {
    const response: Blob = await getFullReport();
    formElementForBlobFile(response, outputFilename);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const downloadReportByShiftId = async (
  shiftId: string,
  shiftName: string
): Promise<void> => {
  const date: Date = new Date();
  const outputFilename = `${shiftName}_${date.getDate()}_${
    date.getMonth() + 1
  }_${date.getFullYear()}.xls`;
  try {
    const response: Blob = await getReportById(shiftId);
    formElementForBlobFile(response, outputFilename);
  } catch (error) {
    return Promise.reject(error);
  }
};
