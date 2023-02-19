import { createEvent, forward } from 'effector';
import { shiftsModel } from '../../../deprecated-services/deprecated-store/deprecated-models';

export const layoutMounted = createEvent();

forward({
  from: layoutMounted,
  to: shiftsModel.effects.getShiftsFx,
});
