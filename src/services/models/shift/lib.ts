import { Shifts } from '../../api';
import { ShiftsStore } from './model';

function isStatus<Status extends Shifts.TShiftStatus>(
  shift: Shifts.IShift,
  status: Status
): shift is Shifts.TShift<Status> {
  if (shift.status === status) {
    shift as Shifts.TShift<Status>;
    return true;
  }
  return false;
}

export function normalizer(shifts: Shifts.IShift[] | undefined | null) {
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

    if (result.finished.length > 1) {
      result.finished.reverse();
    }

    return result;
  }

  return result;
}
