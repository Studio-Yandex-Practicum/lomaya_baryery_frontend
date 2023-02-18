import { createStore, createEffect, createEvent, attach } from 'effector';
import Api, { Shifts } from '../../../../services/api';

import { $startedShift } from './started-shift-details';

type ParticipantsStore = Shifts.ShiftWithParticipantsRes | { members: [] };

export const clear = createEvent();

export const $participants = createStore<ParticipantsStore>({
  members: [],
});

export const getParticipanstFx = createEffect((shiftId: string) =>
  Api.getShiftParticipants(shiftId)
);

export const $isLoading = createStore(false);
export const $error = createStore<null | string>(null);

$isLoading.on(getParticipanstFx.pending, (_, isLoading) => isLoading);

$error
  .on(getParticipanstFx.failData, (_, error) => error.message)
  .reset([getParticipanstFx, clear]);

$participants.on(getParticipanstFx.doneData, (_, data) => data).reset(clear);

$startedShift.on(getParticipanstFx.doneData, (state, data) => {
  if (data && state !== null) {
    return { ...state, total_users: data.members.length };
  }
});

attach({
  source: $startedShift,
  effect: getParticipanstFx,
  mapParams(_, state) {
    if (state) {
      return state.id;
    }
    throw new Error('started shift not exist');
  },
});
