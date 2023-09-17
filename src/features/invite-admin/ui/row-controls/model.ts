import { createEvent, sample } from 'effector';
import { invitationModel } from 'entities/invitation';

export const reactivate = createEvent<string>();
export const deactivate = createEvent<string>();

sample({
  clock: reactivate,
  target: invitationModel.reactivateInvitationsListFx,
});

sample({
  clock: deactivate,
  target: invitationModel.deactivateInvitationsListFx,
});
