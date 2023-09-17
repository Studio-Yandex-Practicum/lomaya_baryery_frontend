import { createEvent, sample } from 'effector';
import { invitationModel } from 'entities/invitation';
import { adminModel } from 'entities/admin';

export const mount = createEvent();
export const mountAdmins = createEvent();

sample({
  clock: mount,
  target: invitationModel.getInvitationsListFx,
});

sample({
  clock: mountAdmins,
  target: adminModel.getAdministratorsListFx,
});
