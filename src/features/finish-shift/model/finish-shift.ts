import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
} from 'effector';
import { api } from 'shared/api';
import { shiftModel } from 'entities/shift';

const submitClicker = createEvent();
const openPopup = createEvent();
const closePopup = createEvent();

const $opened = createStore(false);

const $dialogText = createStore(
  'Участинки смогут отправить отчёт до\u00A0конца следующего дня, не\u00A0забудьте их\u00A0проверить. Вы уверены, что хотите завершить смену?'
);

const $isLoading = createStore(false);

const $error = createStore<null | string>(null);

const finishShiftFx = createEffect(api.finishShift);

const finishStartedShiftFx = attach({
  source: shiftModel.$startedShift,
  mapParams(_, state) {
    if (state) {
      return state.id;
    }
    throw new Error('started shift not exist');
  },
  effect: finishShiftFx,
});

$opened
  .on(openPopup, () => true)
  .on(closePopup, () => false)
  .on(finishStartedShiftFx.doneData, () => false);

$isLoading.on(finishStartedShiftFx.pending, (_, isLoading) => isLoading);

$error
  .on(finishStartedShiftFx.failData, (_, error) => error.message)
  .reset([submitClicker, closePopup]);

shiftModel.$startedShift.on(finishStartedShiftFx.doneData, () => null);

shiftModel.$finishedShifts.on(finishStartedShiftFx.doneData, (state, data) => {
  const newState = [...state];
  newState.unshift(data);
  return newState;
});

forward({
  from: submitClicker,
  to: finishStartedShiftFx,
});

const $finishMessageState = combine({
  dialogText: $dialogText,
  isLoading: $isLoading,
  error: $error,
});

export const store = { $finishMessageState, $opened };
export const events = { submitClicker, openPopup, closePopup };
