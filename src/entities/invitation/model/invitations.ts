import { createStore, createEffect } from 'effector';
import { getInvitationsList } from 'shared/api/typicode';

interface Invitation {
  name: string;
  surname: string;
  email: string;
  expired_datetime: string;
}

export const $invitations = createStore<Invitation[]>([]);

export const getInvitationsListFx = createEffect(getInvitationsList);

export const $isLoading = createStore(false);

export const $error = createStore<string | null>(null);

$isLoading.on(getInvitationsListFx.pending, (_, isLoading) => isLoading);

$error
  .on(getInvitationsListFx.failData, (_, error) => error.message)
  .reset(getInvitationsListFx);

$invitations.on(
  getInvitationsListFx.doneData,
  (_, invitationsList) => invitationsList
);
