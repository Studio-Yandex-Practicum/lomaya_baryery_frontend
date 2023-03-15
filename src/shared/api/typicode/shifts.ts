import { makeRequest } from './base';
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
