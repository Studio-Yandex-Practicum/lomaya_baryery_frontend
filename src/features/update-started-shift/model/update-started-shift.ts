import {
  createStore,
  createEffect,
  combine,
  createEvent,
  forward,
  attach,
} from 'effector';
import { api } from 'shared/api';
import { shiftModel } from 'entities/shift';

export const closePopup = createEvent();

export const openPopup = createEvent();

export const submitClicker = createEvent<{
  title: string;
  finishDate: string;
}>();

export const $opened = createStore(false);

const $isLoading = createStore(false);

const $error = createStore<null | string>(null);

const updateShiftFx = createEffect(api.updateShiftSettings);

const updateStartedShiftFx = attach({
  source: shiftModel.$startedShift,
  effect: updateShiftFx,
  mapParams(params: { title: string; finishDate: string }, state) {
    if (state) {
      return {
        shiftId: state.id,
        title: params.title,
        startedAt: state.started_at,
        finishedAt: params.finishDate,
        message: state.final_message,
      };
    }
    throw new Error('started shift not exist');
  },
});

$isLoading.on(updateStartedShiftFx.pending, (_, isLoading) => isLoading);

$error
  .on(updateStartedShiftFx.failData, (_, error) => error.message)
  .reset([closePopup, submitClicker]);

$opened
  .on(openPopup, () => true)
  .on(closePopup, () => false)
  .on(updateStartedShiftFx.doneData, () => false);

shiftModel.$startedShift.on(updateStartedShiftFx.doneData, (state, data) => {
  if (state) {
    return {
      ...state,
      title: data.title,
      finished_at: data.finished_at,
    };
  }
});

export const $updateStartedShiftState = combine({
  isLoading: $isLoading,
  error: $error,
});

forward({
  from: submitClicker,
  to: updateStartedShiftFx,
});

export const $shiftTitle = shiftModel.$startedShift.map((state) => {
  if (state) {
    return state.title;
  }
  return '';
});

export const $dateRange = shiftModel.$startedShift.map((state) => {
  if (state) {
    return {
      startDate: new Date(state.started_at),
      finishDate: new Date(state.finished_at),
    };
  }
  return { startDate: new Date(), finishDate: new Date() };
});

export const $finishDateFilter = shiftModel.$preparingShift.map((state) => {
  let filter;
  if (state) {
    filter = new Date(state.started_at);
    filter.setHours(-24, 0, 0, 0);
  }
  return filter;
});

export const store = {
  $updateStartedShiftState,
  $opened,
  $dateRange,
  $finishDateFilter,
  $shiftTitle,
};
export const events = { openPopup, closePopup, submitClicker };
