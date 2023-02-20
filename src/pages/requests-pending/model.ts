import { createEvent, forward } from 'effector';
import { requestModel } from 'entities/request';

export const mount = createEvent();
export const unmount = createEvent();

export const refetch = mount;

forward({
  from: mount,
  to: requestModel.getPendingRequestsFx,
});

forward({
  from: unmount,
  to: requestModel.clear,
});
