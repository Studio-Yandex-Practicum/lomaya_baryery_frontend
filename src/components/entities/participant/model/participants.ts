import { combine, createEffect, createEvent, createStore } from 'effector';
import Api, { Shifts } from '../../../../services/api';

interface ParticipantsStore {
  shift: Shifts.ShiftWithParticipantsRes['shift'] | null;
  members: Shifts.ShiftWithParticipantsRes['members'];
}

export const clear = createEvent();

const $participants = createStore<ParticipantsStore>({
  shift: null,
  members: [],
});

export const getParticipantsFx = createEffect((shiftId: string) =>
  Api.getShiftParticipants(shiftId)
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
