import { combine, createEffect, createStore } from 'effector';
import Api, { Shifts } from '../../../../components/shared/api';
import { mapShifts } from './lib';

export interface ShiftsStore {
  preparing: Shifts.TShift<'preparing'> | null;
  started: Shifts.TShift<'started'> | null;
  finished: Shifts.TShift<'finished'>[];
}

const initShiftStore: ShiftsStore = {
  preparing: null,
  started: null,
  finished: [],
};

const $shifts = createStore<ShiftsStore>(initShiftStore);
const $isLoadingShifts = createStore(false);
const $isLoadingSuccess = createStore(false);
const $isLoadingError = createStore(false);

const $shiftsLoading = combine(
  $isLoadingShifts,
  $isLoadingSuccess,
  $isLoadingError,
  ($isLoadingShifts, $isLoadingSuccess, $isLoadingError) => ({
    isLoading: $isLoadingShifts,
    isSuccess: $isLoadingSuccess,
    isError: $isLoadingError,
  })
);

const getShiftsFx = createEffect(async () => {
  const data = await Api.getShifts();
  return mapShifts(data);
});

$shifts.on(getShiftsFx.doneData, (_, data) => data);
$isLoadingShifts.on(getShiftsFx.pending, (_, isPending) => isPending);
$isLoadingSuccess.on(getShiftsFx.doneData, () => true);
$isLoadingError.on(getShiftsFx.fail, () => true);

export const effects = { getShiftsFx };
export const store = { $shifts, $shiftsLoading };
