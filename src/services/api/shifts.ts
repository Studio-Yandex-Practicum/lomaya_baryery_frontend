import makeRequest from './make-request';
import type { Shifts } from './models';

export function getShifts() {
  return makeRequest<Shifts.GetShiftsRes>('shifts/', {
    method: 'get',
  });
}

export function createNewShift({
  title,
  startedAt,
  finishedAt,
}: Shifts.CreateShiftProps) {
  const reqBody: Shifts.CreateShiftReq = {
    title,
    started_at: startedAt,
    finished_at: finishedAt,
  };

  return makeRequest<Shifts.CreateShiftRes>('shifts/', {
    authorization: false,
    method: 'post',
    json: reqBody,
  });
}

export function getShiftParticipants(shiftId: string) {
  return makeRequest<Shifts.ShiftWithParticipantsRes>(
    `shifts/${shiftId}/users`,
    {
      method: 'get',
      authorization: false,
    },
  );
}

export function updateShiftSettings({
  shiftId,
  title,
  startedAt,
  finishedAt,
  message,
}: Shifts.UpdateShiftProps) {
  const reqBody: Shifts.UpdateShiftReq = {
    title,
    started_at: startedAt,
    finished_at: finishedAt,
    final_message: message,
  };

  return makeRequest<Shifts.UpdateShiftRes>(`shifts/${shiftId}`, {
    method: 'patch',
    json: reqBody,
    authorization: false,
  });
}

export function finishShift(shiftId: string) {
  return makeRequest<Shifts.FinishShiftRes>(`shifts/${shiftId}/finish`, {
    method: 'patch',
    authorization: false,
  });
}
