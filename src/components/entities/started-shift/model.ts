import { createStore, sample } from 'effector';
import { Shifts } from '../../../services/api';
import { shiftsModel } from '../../../services/models';

const $startedShiftStore = createStore<Shifts.TShift<'started'> | null>(null);

sample({
  source: shiftsModel.store.$shifts,
  target: $startedShiftStore,
  fn(src) {
    return src.started;
  },
});

export const store = { startedShiftStore: $startedShiftStore };
