import { createEvent, forward } from 'effector';
import { shiftModel } from '../../entities/shift';

export const layoutMounted = createEvent();

forward({
  from: layoutMounted,
  to: shiftModel.getShiftsFx,
});
