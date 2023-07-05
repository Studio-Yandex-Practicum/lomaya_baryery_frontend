import { createEvent, sample } from 'effector';
import { adminModel } from 'entities/admin';

interface EditParams {
  adminId: string;
  name: string;
  surname: string;
}

interface RoleParams {
  adminId: string;
  role: string;
}

interface StatusParams {
  adminId: string;
  status: string;
}

export const mount = createEvent<string>();
export const unmount = createEvent();
export const edit = createEvent<EditParams>();
export const changeRole = createEvent<RoleParams>();
export const block = createEvent<StatusParams>();
export const resetPassword = createEvent<string>();

sample({
  clock: mount,
  target: adminModel.getAdministratorByIdFx,
});

sample({
  clock: unmount,
  target: adminModel.clear,
});

sample({
  clock: edit,
  target: adminModel.editAdministratorByIdFx,
});

sample({
  clock: changeRole,
  target: adminModel.changeRoleByIdFx,
});

sample({
  clock: block,
  target: adminModel.blockAdminByIdFx,
});

sample({
  clock: resetPassword,
  target: adminModel.resetPasswordFx,
});
