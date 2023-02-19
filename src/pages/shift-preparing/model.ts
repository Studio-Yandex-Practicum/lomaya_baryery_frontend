import { attach, createEvent, forward } from 'effector';
import { participantsModel } from '../../entities/participant';
import { preparingShiftModel } from '../../entities/deprecated-preparing-shift';

const mount = createEvent();
const unmount = createEvent();

const $isRedirect = preparingShiftModel.$preparingShift.map((state) => {
  if (state === null) {
    return true;
  }
  return false;
});

const getPreparingShiftParticipantsFx = attach({
  source: preparingShiftModel.$preparingShift,
  effect: participantsModel.getParticipantsFx,
  mapParams(_, state) {
    if (state) {
      return state.id;
    }
    throw new Error('started shift not exist');
  },
});

preparingShiftModel.$preparingShift.on(
  getPreparingShiftParticipantsFx.doneData,
  (state, data) => {
    if (state) {
      return { ...state, total_users: data.members.length };
    }
  }
);

forward({
  from: mount,
  to: getPreparingShiftParticipantsFx,
});

forward({
  from: unmount,
  to: participantsModel.clear,
});

export const events = { mount, unmount };

export const store = { isRedirect: $isRedirect };
