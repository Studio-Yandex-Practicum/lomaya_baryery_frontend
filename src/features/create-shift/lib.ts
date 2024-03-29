import { ShiftStatus } from 'shared/api';

function getTodayDate() {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  return today;
}

function getRecruitmentDeadline(startedAt: string) {
  if (startedAt === '') {
    return new Date(0);
  }
  const startDate = new Date(startedAt);
  const requestDeadline = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

  return requestDeadline;
}

export function getRecruitmentState(
  preparingId: string | undefined,
  startedId: string | undefined,
  startedStartDate: string | undefined
) {
  interface RecruitmentState {
    id: null | string;
    shiftType: Extract<ShiftStatus, 'preparing' | 'started'> | null;
  }

  const state: RecruitmentState = {
    id: null,
    shiftType: null,
  };

  if (preparingId) {
    state.id = preparingId;
    state.shiftType = 'preparing';
  }

  if (startedId && startedStartDate) {
    const today = getTodayDate();
    const requestsDeadline = getRecruitmentDeadline(startedStartDate);

    if (today <= requestsDeadline) {
      state.id = startedId;
      state.shiftType = 'started';
    }
  }

  return state;
}
