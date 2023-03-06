import { combine, createEvent, sample } from 'effector';
import { shiftModel } from 'entities/shift';
import { Shift } from 'shared/api';
import { participantsModel } from '../../entities/participant';

export const mount = createEvent<string>();
export const unmount = createEvent();

sample({
  clock: mount,
  target: participantsModel.getParticipantsFx,
});

sample({
  clock: unmount,
  target: participantsModel.clear,
});

export const $shiftsList = combine(
  shiftModel.$readyForCompleteShift,
  shiftModel.$finishedShifts,
  (readyForComplete, finished) => {
    const shiftsList: Shift[] = [];

    if (readyForComplete) {
      shiftsList.push(readyForComplete);
      return shiftsList.concat(finished);
    }

    return finished;
  }
);
