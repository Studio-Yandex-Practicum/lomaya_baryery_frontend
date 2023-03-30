import { createStore, createEffect, combine } from 'effector';
import { getAdministratorsList } from 'shared/api/typicode';

export interface TAdmin {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: 'administrator' | 'expert';
  status: 'active' | 'blocked';
  last_login_at: string;
}

const $admins = createStore<TAdmin[]>([]);

export const getAdministratorsListFx = createEffect(getAdministratorsList);

const $isLoading = createStore(false);

const $error = createStore<string | null>(null);

$isLoading.on(getAdministratorsListFx.pending, (_, isLoading) => isLoading);

$error
  .on(getAdministratorsListFx.failData, (_, error) => error.message)
  .reset(getAdministratorsListFx);

$admins.on(
  getAdministratorsListFx.doneData,
  (_, administratorsList) => administratorsList
);

export const $adminsState = combine({
  data: $admins,
  isLoading: $isLoading,
  error: $error,
});
