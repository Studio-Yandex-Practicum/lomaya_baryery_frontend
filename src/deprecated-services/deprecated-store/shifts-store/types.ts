import type { Shifts } from '../../../components/shared/api';

export interface RootShifts {
  preparing: undefined | Shifts.IShift;
  started: undefined | Shifts.IShift;
}
