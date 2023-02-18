import {
  createStore,
  createEvent,
  createEffect,
  forward,
  combine,
} from 'effector';
import Api, { Shifts } from '../../../services/api';

const mountEvent = createEvent<string>();
const unmountEvent = createEvent();

const $participantsStore = createStore<Shifts.ShiftWithParticipantsRes | null>(
  null
);

const $isLoading = createStore(false);

const $isError = createStore(false);

const getShiftParticipantsFx = createEffect(async (shiftId: string) =>
  Api.getShiftParticipants(shiftId)
);

$isLoading.on(getShiftParticipantsFx.pending, (isLoading) => isLoading);

$isError.on(getShiftParticipantsFx.failData, () => true).reset(unmountEvent);

$participantsStore
  .on(getShiftParticipantsFx.doneData, (_, data) => data)
  .reset(unmountEvent);

forward({
  from: mountEvent,
  to: getShiftParticipantsFx,
});

const $fetchParticipantsStore = combine({
  data: $participantsStore,
  isLoading: $isLoading,
  isError: $isError,
});

export const store = {
  participants: $fetchParticipantsStore,
};
export const events = { mountEvent, unmountEvent };
