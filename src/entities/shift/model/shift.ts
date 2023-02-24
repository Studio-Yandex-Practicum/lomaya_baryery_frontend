import { combine, createEffect, createStore } from 'effector';
import { api, Shift } from 'shared/api';
import { mapShifts } from '../lib';

export interface ShiftsStore {
  preparing: Shift<'preparing'> | null;
  started: Shift<'started'> | null;
  readyForComplete: Shift<'ready_for_complete'> | null;
  finished: Shift<'finished'>[];
}

const initShiftStore: ShiftsStore = {
  preparing: null,
  started: null,
  readyForComplete: null,
  finished: [],
};

const $shifts = createStore<ShiftsStore>(initShiftStore);
const $isLoadingSuccess = createStore(false);
const $isLoadingError = createStore(false);

const $shiftsLoading = combine({
  isSuccess: $isLoadingSuccess,
  isError: $isLoadingError,
});

const getShiftsFx = createEffect(async () => {
  const data = await api.getShifts();
  return mapShifts(data);
});

$shifts.on(getShiftsFx.doneData, (_, data) => data);
$isLoadingSuccess.on(getShiftsFx.doneData, () => true);
$isLoadingError.on(getShiftsFx.fail, () => true);

export { $shifts, $shiftsLoading, getShiftsFx };
