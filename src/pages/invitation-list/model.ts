import { createEvent, sample } from 'effector';
import { invitationModel } from 'entities/invitation';

export const mount = createEvent();

sample({
  clock: mount,
  target: invitationModel.getInvitationsListFx,
});
