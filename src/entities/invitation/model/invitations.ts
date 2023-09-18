import {
  createStore,
  createEffect,
  combine,
  createEvent,
  forward,
} from 'effector';
import {
  getInvitationsList,
  reactivateInvitation,
  deactivateInvitation,
} from 'shared/api/typicode';

export interface Invitation {
  id: string;
  name: string;
  surname: string;
  email: string;
  expired_datetime: string;
}

export const clear = createEvent();

const $invitations = createStore<Invitation[]>([]);

export const getInvitationsListFx = createEffect(getInvitationsList);
export const reactivateInvitationsListFx = createEffect(reactivateInvitation);
export const deactivateInvitationsListFx = createEffect(deactivateInvitation);

export const $isReactivateSuccess = createStore<boolean>(false)
  .on(reactivateInvitationsListFx.doneData, () => true)
  .reset([reactivateInvitationsListFx, clear]);

export const $isDeactivateSuccess = createStore<boolean>(false)
  .on(deactivateInvitationsListFx.doneData, () => true)
  .reset([deactivateInvitationsListFx, clear]);

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

forward({
  from: reactivateInvitationsListFx.done,
  to: getInvitationsListFx,
});

forward({
  from: deactivateInvitationsListFx.done,
  to: getInvitationsListFx,
});

export const $invitationsState = combine({
  data: $invitations,
  isLoading: $isLoading,
  error: $error,
  isReactivateSuccess: $isReactivateSuccess,
  isDeactivateSuccess: $isDeactivateSuccess,
});
