import { createStore, createEffect } from 'effector';
import { getAdministratorsList } from 'shared/api/typicode';

interface Administrator {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: 'administrator' | 'psychologist';
  status: 'active' | 'blocked';
  last_login_at: string;
}

const $administrators = createStore<Administrator[]>([]);

const getAdministratorsListFx = createEffect(getAdministratorsList);

const $isLoading = createStore(false);

const $error = createStore<string | null>(null);

$isLoading.on(getAdministratorsListFx.pending, (_, isLoading) => isLoading);

$error
  .on(getAdministratorsListFx.failData, (_, error) => error.message)
  .reset(getAdministratorsListFx);

$administrators.on(
  getAdministratorsListFx.doneData,
  (_, administratorsList) => administratorsList
);

export const store = { $administrators, $isLoading, $error };
export const effects = { getAdministratorsListFx };
