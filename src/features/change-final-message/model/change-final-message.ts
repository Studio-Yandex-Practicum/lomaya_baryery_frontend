import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
} from 'effector';
import { shiftModel } from '../../../entities/shift';
import { api } from '../../../shared/api';

const openPopup = createEvent();
const closePopup = createEvent();
const submitClicker = createEvent<string>();

const $initMessage = shiftModel.$startedShift.map((state) => {
  if (state) {
    return state.final_message;
  }
  return '';
});

const $isLoading = createStore(false);
const $error = createStore<string | null>(null);

const $openedPopup = createStore(false);

const updateShiftFx = createEffect(async (params: api.UpdateShiftParams) =>
  api.updateShiftSettings(params)
);

const changeFinalMessageFx = attach({
  source: shiftModel.$startedShift,
  mapParams(params: string, state) {
    if (state) {
      return {
        shiftId: state.id,
        message: params,
        title: state.title,
        startedAt: state.started_at,
        finishedAt: state.finished_at,
      };
    }
    throw new Error('started shift not exist');
  },
  effect: updateShiftFx,
});

$openedPopup
  .on(openPopup, () => true)
  .on(closePopup, () => false)
  .on(changeFinalMessageFx.doneData, () => false);

$isLoading.on(changeFinalMessageFx.pending, (_, isLoading) => isLoading);

$error
  .on(changeFinalMessageFx.failData, (_, error) => error.message)
  .reset([closePopup, submitClicker]);

shiftModel.$startedShift.on(changeFinalMessageFx.doneData, (state, data) => {
  if (state) {
    return { ...state, final_message: data.final_message };
  }
});

const $changeMessageStore = combine({
  initMessage: $initMessage,
  openedPopup: $openedPopup,
  isLoading: $isLoading,
  error: $error,
});

forward({
  from: submitClicker,
  to: changeFinalMessageFx,
});

export const store = { changeMessage: $changeMessageStore };
export const events = { openPopup, closePopup, submitClicker };
