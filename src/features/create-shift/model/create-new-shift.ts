import {
  createStore,
  createEffect,
  combine,
  createEvent,
  sample,
  forward,
} from 'effector';
import { shiftModel } from '../../../entities/shift';
import { api } from '../../../shared/api';

import { getRecruitmentState } from '../lib';

const closePopup = createEvent();

const openPopup = createEvent();

const submitClicker = createEvent<{
  title: string;
  startedAt: string;
  finishedAt: string;
}>();

const $shiftsWithRecruitment = combine({
  preparing: shiftModel.$preparingShift,
  started: shiftModel.$startedShift,
});

const $dialogText = createStore<string | null>(null);

sample({
  clock: openPopup,
  source: $shiftsWithRecruitment,
  target: $dialogText,
  fn: ({ preparing, started }) => {
    const current = getRecruitmentState(
      preparing?.id,
      started?.id,
      started?.started_at
    );
    if (current.shiftType === 'preparing') {
      return 'Смена уже создана. Вы сможете создать новую через 2 дня после старта ранее созданной.';
    }
    if (current.shiftType === 'started') {
      return 'В текущую смену идёт набор участников. Новую смену можно создать через 2 дня после старта.';
    }

    return null;
  },
});

const $opened = createStore(false);

const $isLoading = createStore(false);

const $error = createStore<null | string>(null);

const postNewShiftFx = createEffect(
  (params: { title: string; startedAt: string; finishedAt: string }) =>
    api.createNewShift(params)
);

$isLoading.on(postNewShiftFx.pending, (_, isLoading) => isLoading);

$error
  .on(postNewShiftFx.failData, (_, error) => error.message)
  .reset([closePopup, submitClicker]);

$opened
  .on(openPopup, () => true)
  .on(closePopup, () => false)
  .on(postNewShiftFx.doneData, () => false);

shiftModel.$preparingShift.on(postNewShiftFx.doneData, (_, data) => {
  data.total_users = 0;
  data.sequence_number = 0;
  return data;
});

export const $dateRange = shiftModel.$startedShift.map((state) => {
  let startDate = new Date();

  if (state) {
    startDate = new Date(state.finished_at);
  }

  startDate.setHours(24, 0, 0, 0);

  const finishDate = new Date(startDate);
  finishDate.setHours(24);
  return { startDate, finishDate };
});

export const $startDateFilter = $dateRange.map((state) => state.startDate);

const $createShiftState = combine({
  isLoading: $isLoading,
  error: $error,
});

forward({
  from: submitClicker,
  to: postNewShiftFx,
});

export const store = {
  $createShiftState,
  $dialogText,
  $opened,
  $dateRange,
  $startDateFilter,
};

export const events = { openPopup, closePopup, submitClicker };
