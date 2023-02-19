import { attach, createEvent, forward } from 'effector';
import { startedShiftModel } from '../../entities/deprecated-started-shift';
import { participantsModel } from '../../entities/participant';

const mount = createEvent();
const unmount = createEvent();

const getStartedShiftParticipantsFx = attach({
  source: startedShiftModel.$startedShift,
  effect: participantsModel.getParticipantsFx,
  mapParams(_, state) {
    if (state) {
      return state.id;
    }
    throw new Error('started shift not exist');
  },
});

startedShiftModel.$startedShift.on(
  getStartedShiftParticipantsFx.doneData,
  (state, data) => {
    if (state) {
      return { ...state, total_users: data.members.length };
    }
  }
);

const $isRedirect = startedShiftModel.$startedShift.map((state) => {
  if (state === null) {
    return true;
  }
  return false;
});

forward({
  from: mount,
  to: getStartedShiftParticipantsFx,
});

forward({
  from: unmount,
  to: participantsModel.clear,
});

export const events = { mount, unmount };

export const store = { isRedirect: $isRedirect };