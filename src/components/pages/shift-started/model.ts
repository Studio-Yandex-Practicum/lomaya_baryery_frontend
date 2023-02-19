import { attach, combine, createEvent, forward } from 'effector';
import { startedShiftModel } from '../../entities/started-shift';
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

forward({
  from: mount,
  to: getStartedShiftParticipantsFx,
});

forward({
  from: unmount,
  to: participantsModel.clear,
});

export const startedShiftPageModel = { mount, unmount };
