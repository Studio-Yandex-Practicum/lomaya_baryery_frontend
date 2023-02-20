import { combine, createEffect, createEvent, createStore } from 'effector';
import { api, Participant, Shift } from 'shared/api';

interface ParticipantsStore {
  shift: Shift | null;
  members: Participant[];
}

export const clear = createEvent();

const $participants = createStore<ParticipantsStore>({
  shift: null,
  members: [],
});

export const getParticipantsFx = createEffect((shiftId: string) =>
  api.getShiftParticipants(shiftId)
);

const $isLoading = createStore(false);
const $error = createStore<null | string>(null);

$isLoading.on(getParticipantsFx.pending, (_, isLoading) => isLoading);

$error
  .on(getParticipantsFx.failData, (_, error) => error.message)
  .reset([getParticipantsFx, clear]);

$participants.on(getParticipantsFx.doneData, (_, data) => data).reset(clear);

export const $participantsState = combine({
  data: $participants,
  isLoading: $isLoading,
  error: $error,
});
