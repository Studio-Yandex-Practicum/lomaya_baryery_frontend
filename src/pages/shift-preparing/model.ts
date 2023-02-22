import { attach, createEvent, forward } from 'effector';
import { participantsModel } from '../../entities/participant';
import { shiftModel } from '../../entities/shift';

export const mount = createEvent();
export const unmount = createEvent();

const getPreparingShiftParticipantsFx = attach({
  source: shiftModel.$preparingShift,
  effect: participantsModel.getParticipantsFx,
  mapParams(_, state) {
    if (state) {
      return state.id;
    }
    throw new Error('started shift not exist');
  },
});

shiftModel.$preparingShift.on(
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
