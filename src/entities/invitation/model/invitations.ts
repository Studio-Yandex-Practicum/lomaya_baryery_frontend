import { createStore, createEffect, combine } from 'effector';
import { getInvitationsList } from 'shared/api/typicode';

export interface Invitation {
  name: string;
  surname: string;
  email: string;
  expired_datetime: string;
}

const $invitations = createStore<Invitation[]>([]);

export const getInvitationsListFx = createEffect(getInvitationsList);

const $isLoading = createStore(false);

const $error = createStore<string | null>(null);

$isLoading.on(getInvitationsListFx.pending, (_, isLoading) => isLoading);

$error
  .on(getInvitationsListFx.failData, (_, error) => error.message)
  .reset(getInvitationsListFx);

$invitations.on(
  getInvitationsListFx.doneData,
  (_, invitationsList) => invitationsList
);

export const $invitationsState = combine({
  data: $invitations,
  isLoading: $isLoading,
  error: $error,
});
