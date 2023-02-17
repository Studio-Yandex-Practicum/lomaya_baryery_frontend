import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import Api, { Shifts } from '../../../services/api';
import * as startedShiftModel from '../../entities/started-shift/model';

const submitClicker = createEvent<string>();
const openPopup = createEvent();
const closePopup = createEvent();

const $initMessage = createStore('');
const $isLoading = createStore(false);
const $isError = createStore(false);
const $error = createStore<string | null>(null);

const $openedPopup = createStore(false);

const changeMessageFx = createEffect(async (params: Shifts.UpdateShiftProps) =>
  Api.updateShiftSettings(params)
);

$openedPopup
  .on(openPopup, () => true)
  .on(closePopup, () => false)
  .on(changeMessageFx.doneData, () => false);

$isLoading.on(changeMessageFx.pending, (_, isLoading) => isLoading);

$isError
  .on(changeMessageFx.failData, () => true)
  .reset([closePopup, submitClicker]);

$error
  .on(changeMessageFx.failData, (_, error) => error.message)
  .reset([closePopup, submitClicker]);

startedShiftModel.store.startedShiftStore.on(
  changeMessageFx.doneData,
  (state, shiftData) => ({ ...state, ...shiftData })
);

sample({
  clock: submitClicker,
  source: startedShiftModel.store.startedShiftStore,
  fn(startedShift, submitEvent) {
    if (startedShift) {
      const queryBody: Shifts.UpdateShiftProps = {
        shiftId: startedShift.id,
        title: startedShift.title,
        startedAt: startedShift.started_at,
        finishedAt: startedShift.finished_at,
        message: submitEvent,
      };
      return queryBody;
    }
    throw new Error();
  },
  target: changeMessageFx,
});

sample({
  source: startedShiftModel.store.startedShiftStore,
  fn(src) {
    if (src) {
      return src.final_message;
    }
    throw new Error();
  },
  target: $initMessage,
});

const $changeMessageStore = combine({
  initMessage: $initMessage,
  openedPopup: $openedPopup,
  isLoading: $isLoading,
  isError: $isError,
  error: $isError,
});

export const store = { changeMessage: $changeMessageStore };
export const events = { openPopup, closePopup, submitClicker };
