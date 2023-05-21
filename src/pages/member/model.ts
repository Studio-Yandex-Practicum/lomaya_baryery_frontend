import { createEvent, sample } from 'effector';
import { memberModel } from 'entities/member';

export const mount = createEvent<string>();
export const unmount = createEvent();

sample({
  clock: mount,
  target: memberModel.store.getMemberByIdFx,
});

sample({
  clock: unmount,
  target: memberModel.store.clear,
});