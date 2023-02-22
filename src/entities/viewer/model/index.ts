import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from 'effector';
import { api } from 'shared/api';

type ViewerState = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: 'administrator' | 'psychologist';
  status: 'active';
  last_login_at: Date;
} | null;

export const clear = createEvent();

export const verifyViewer = createEvent();

export const $viewer = createStore<ViewerState>(null);

export const $isAuth = createStore(false);

const getAppUserFx = createEffect(api.getAppUser);

export const $isVerifying = createStore(true).on(
  getAppUserFx.pending,
  (_, isLoading) => isLoading
);

export const $isError = createStore(false)
  .on(getAppUserFx.failData, () => true)
  .reset(clear);

$viewer.on(getAppUserFx.doneData, (_, data) => data).reset(clear);

$isAuth.on($viewer, (_, viewerState) => Boolean(viewerState));

forward({
  from: verifyViewer,
  to: getAppUserFx,
});

sample({
  clock: $isAuth,
  source: $viewer,
  filter(src, clk) {
    return src === null && clk;
  },
  target: getAppUserFx,
});
