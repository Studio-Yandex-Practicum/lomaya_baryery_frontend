import { createEvent, forward } from 'effector';
import { shiftsModel } from '../../../services/models';

export const layoutMounted = createEvent();

forward({
  from: layoutMounted,
  to: shiftsModel.effects.getShiftsFx,
});
