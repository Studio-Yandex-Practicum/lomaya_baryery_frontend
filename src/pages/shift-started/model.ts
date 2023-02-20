import { attach, createEvent, forward } from 'effector';
import { participantsModel } from '../../entities/participant';
import { shiftModel } from '../../entities/shift';

const mount = createEvent();
const unmount = createEvent();

const getStartedShiftParticipantsFx = attach({
  source: shiftModel.$startedShift,
  effect: participantsModel.getParticipantsFx,
  mapParams(_, state) {
    if (state) {
      return state.id;
    }
    throw new Error('started shift not exist');
  },
});

shiftModel.$startedShift.on(
  getStartedShiftParticipantsFx.doneData,
  (state, data) => {
    if (state) {
      return { ...state, total_users: data.members.length };
    }
  }
);

forward({
  from: mount,
  to: getStartedShiftParticipantsFx,
});

forward({
  from: unmount,
  to: participantsModel.clear,
});

export const events = { mount, unmount };
