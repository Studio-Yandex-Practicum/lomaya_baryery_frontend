import { createStore, createEffect, createEvent, combine } from 'effector';
import {
  getAdministratorsList,
  getAdministratorById,
  editAdminDataById,
  changeRoleById,
  blockAdminById,
  resetPassword,
} from 'shared/api/typicode';

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
const $admin = createStore<TAdmin | null>(null);

export const getAdministratorsListFx = createEffect(getAdministratorsList);
export const getAdministratorByIdFx = createEffect(getAdministratorById);
export const editAdministratorByIdFx = createEffect(editAdminDataById);
export const changeRoleByIdFx = createEffect(changeRoleById);
export const blockAdminByIdFx = createEffect(blockAdminById);
export const resetPasswordFx = createEffect(resetPassword);

const $isLoading = createStore(false);
const $isLoadingAdminById = createStore(false);

const $error = createStore<string | null>(null);
const $errorAdminById = createStore<string | null>(null);

export const clear = createEvent();

$isLoading.on(getAdministratorsListFx.pending, (_, isLoading) => isLoading);
$isLoadingAdminById.on(
  getAdministratorByIdFx.pending,
  (_, isLoadingAdminById) => isLoadingAdminById
);

$error
  .on(getAdministratorsListFx.failData, (_, error) => error.message)
  .reset(getAdministratorsListFx);

$errorAdminById
  .on(getAdministratorByIdFx.failData, (_, error) => error.message)
  .reset(getAdministratorByIdFx);

$admins.on(
  getAdministratorsListFx.doneData,
  (_, administratorsList) => administratorsList
);

$admin
  .on(
    getAdministratorByIdFx.doneData,
    (_, administratorsById) => administratorsById
  )
  .on(
    editAdministratorByIdFx.doneData,
    (_, editAdministratorByIdFx) => editAdministratorByIdFx
  )
  .on(changeRoleByIdFx.doneData, (_, changeRoleByIdFx) => changeRoleByIdFx)
  .on(blockAdminByIdFx.doneData, (_, blockAdminByIdFx) => blockAdminByIdFx)
  .on(resetPasswordFx.doneData, (_, resetPasswordFx) => resetPasswordFx)
  .reset(clear);

export const $adminsState = combine({
  data: $admins,
  isLoading: $isLoading,
  error: $error,
});

export const $adminState = combine({
  data: $admin,
  isLoading: $isLoadingAdminById,
  error: $errorAdminById,
});
