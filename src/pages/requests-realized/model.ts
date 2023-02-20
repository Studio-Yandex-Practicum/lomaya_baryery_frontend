import { createEvent, forward } from 'effector';
import { requestModel } from 'entities/request';

export const mount = createEvent();
export const unmount = createEvent();

forward({
  from: mount,
  to: requestModel.getRealizedRequestsFx,
});

forward({
  from: unmount,
  to: requestModel.clear,
});
