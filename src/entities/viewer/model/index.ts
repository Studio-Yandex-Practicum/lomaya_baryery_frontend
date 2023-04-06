import { createEffect, createEvent, createStore, sample } from 'effector';
import { api } from 'shared/api';

type ViewerState = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: 'administrator' | 'expert';
  status: 'active';
  last_login_at: string;
} | null;

export const clear = createEvent();
export const logout = createEvent();

export const verifyViewer = createEvent();

export const $viewer = createStore<ViewerState>(null);

export const $isAuth = createStore(false);

const getAppUserFx = createEffect(api.getAppUser);

const logoutFx = createEffect(() => {
  clear();
  api.Config.clearToken();
});

export const $isVerifying = createStore(true).on(
  getAppUserFx.pending,
  (_, isLoading) => isLoading
);

export const $isError = createStore(false)
  .on(getAppUserFx.failData, () => true)
  .reset(clear);

$viewer.on(getAppUserFx.doneData, (_, data) => data).reset(clear);

$isAuth.on($viewer, (_, viewerState) => Boolean(viewerState));

sample({
  source: verifyViewer,
  target: getAppUserFx,
});

sample({
  clock: $isAuth,
  source: $viewer,
  filter(viewer, isAuth) {
    return viewer === null && isAuth;
  },
  target: getAppUserFx,
});

sample({
  clock: logout,
  target: logoutFx,
});
