import { createEvent, forward } from 'effector';
import { membersModel } from 'entities/members';

export const mount = createEvent();

export const refetch = mount;

forward({
  from: mount,
  to: membersModel.store.getMembersFX,
});
