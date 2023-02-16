import type { Shifts } from '../../api';

export interface RootShifts {
  preparing: undefined | Shifts.IShift;
  started: undefined | Shifts.IShift;
}
