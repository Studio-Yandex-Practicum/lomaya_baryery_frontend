import { createEvent, forward } from 'effector';
import { shiftModel } from '../../entities/shift';

export const mountLayout = createEvent();

forward({
  from: mountLayout,
  to: shiftModel.getShiftsFx,
});
