import { createEvent, forward } from 'effector';
import { memberModel } from 'entities/member';

export const mount = createEvent<string>();
export const unmount = createEvent();

forward({
  from: mount,
  to: memberModel.store.getMemberByIdFx,
});
