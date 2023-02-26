import { createEvent, sample } from 'effector';
import { adminModel } from 'entities/admin';

export const mount = createEvent();

sample({
  clock: mount,
  target: adminModel.getAdministratorsListFx,
});
