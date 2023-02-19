import {
  createStore,
  createEffect,
  combine,
  createEvent,
  forward,
  attach,
} from 'effector';
import { startedShiftModel } from '../../../entities/started-shift';
import Api, { Shifts } from '../../../../services/api';
import { preparingShiftModel } from '../../../entities/preparing-shift';

export const closePopup = createEvent();

export const openPopup = createEvent();

export const submitClicker = createEvent<{
  title: string;
  startDate: string;
  finishDate: string;
}>();

export const $opened = createStore(false);

const $isLoading = createStore(false);

const $error = createStore<null | string>(null);

const updateShiftFx = createEffect((params: Shifts.UpdateShiftProps) =>
  Api.updateShiftSettings(params)
);

const updatePreparingShiftFx = attach({
  source: preparingShiftModel.$preparingShift,
  effect: updateShiftFx,
  mapParams(
    params: { title: string; startDate: string; finishDate: string },
    state
  ) {
    if (state) {
      return {
        shiftId: state.id,
        title: params.title,
        startedAt: params.startDate,
        finishedAt: params.finishDate,
        message: state.final_message,
      };
    }
    throw new Error('started shift not exist');
  },
});

$isLoading.on(updatePreparingShiftFx.pending, (_, isLoading) => isLoading);

$error
  .on(updatePreparingShiftFx.failData, (_, error) => error.message)
  .reset([closePopup, submitClicker]);

$opened
  .on(openPopup, () => true)
  .on(closePopup, () => false)
  .on(updatePreparingShiftFx.doneData, () => false);

preparingShiftModel.$preparingShift.on(
  updatePreparingShiftFx.doneData,
  (state, data) => {
    if (state) {
      return {
        ...state,
        title: data.title,
        finished_at: data.finished_at,
      };
    }
  }
);

export const $updatePreparingShiftState = combine({
  isLoading: $isLoading,
  error: $error,
});

forward({
  from: submitClicker,
  to: updatePreparingShiftFx,
});

export const $shiftTitle = preparingShiftModel.$preparingShift.map((state) => {
  if (state) {
    return state.title;
  }
  return '';
});

export const $dateRange = preparingShiftModel.$preparingShift.map((state) => {
  if (state) {
    return {
      startDate: new Date(state.started_at),
      finishDate: new Date(state.finished_at),
    };
  }
  return { startDate: new Date(), finishDate: new Date() };
});

export const $startDateFilter = startedShiftModel.$startedShift.map((state) => {
  let filter = new Date();
  if (state) {
    filter = new Date(state.finished_at);
    filter.setHours(24, 0, 0, 0);
  }
  return filter;
});

export const store = {
  $updatePreparingShiftState,
  $opened,
  $dateRange,
  $startDateFilter,
  $shiftTitle,
};
export const events = { openPopup, closePopup, submitClicker };
