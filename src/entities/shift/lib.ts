import { Shift, ShiftStatus } from '../../shared/api';
import { ShiftsStore } from './model/shift';

function isStatus<T extends ShiftStatus>(
  shift: Shift,
  status: T
): shift is Shift<T> {
  if (shift.status === status) {
    shift as Shift<T>;
    return true;
  }
  return false;
}

export function mapShifts(shifts: Shift[] | undefined | null) {
  const result: ShiftsStore = {
    started: null,
    preparing: null,
    finished: [],
  };

  if (shifts && shifts.length > 0) {
    let cur = 0;
    const end = shifts.length;
    while (cur < end) {
      const curShift = shifts[cur];
      if (isStatus(curShift, 'started')) {
        result.started = curShift;
      }

      if (isStatus(curShift, 'preparing')) {
        result.preparing = curShift;
      }

      if (isStatus(curShift, 'finished')) {
        result.finished.push(curShift);
      }

      cur += 1;
    }

    return result;
  }

  return result;
}
