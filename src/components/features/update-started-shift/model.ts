import {
  createStore,
  createEffect,
  combine,
  createEvent,
  forward,
} from 'effector';
import Api, { Shifts } from '../../../services/api';
import { shiftsModel } from '../../../services/models';

const closePopup = createEvent();

const openPopup = createEvent();

const submitClicker = createEvent<Shifts.UpdateShiftProps>();

const $openModal = createStore(false);

const $data = createStore<Shifts.UpdateShiftRes<'started'> | null>(null);
const $isLoading = createStore(false);
const $isError = createStore(false);
const $error = createStore<null | string>(null);

const updateStartedShiftFx = createEffect((params: Shifts.UpdateShiftProps) =>
  Api.updateShiftSettings(params)
);

$isLoading.on(updateStartedShiftFx.pending, (_, isLoading) => isLoading);

$openModal
  .on(openPopup, () => true)
  .on(closePopup, () => false)
  .on($data, () => false);

$data
  .on(updateStartedShiftFx.doneData, (_, data) => data)
  .reset([closePopup, submitClicker]);

$isError
  .on(updateStartedShiftFx.fail, () => true)
  .reset([closePopup, submitClicker]);

$error
  .on(updateStartedShiftFx.failData, (_, error) => error.message)
  .reset([closePopup, submitClicker]);

shiftsModel.store.$shifts.on($data, (state, startedShift) => {
  if (startedShift) {
    return { ...state, started: startedShift };
  }
});

const $updateStartedShift = combine({
  data: $data,
  isLoading: $isLoading,
  isError: $isError,
  error: $error,
});

forward({
  from: submitClicker,
  to: updateStartedShiftFx,
});

export const store = { $updateStartedShift, $openModal };

export const events = { openPopup, closePopup, submitClicker };
