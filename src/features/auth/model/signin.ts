import { createEffect, createEvent, createStore, forward } from 'effector';
import { viewerModel } from 'entities/viewer';
import { api } from 'shared/api';

export const login = createEvent<{ email: string; password: string }>();

export const signInFx = createEffect(api.signIn);

export const $isLoading = createStore(false).on(
  signInFx.pending,
  (_, isLoading) => isLoading
);

export const $error = createStore<string | null>(null)
  .on(signInFx.failData, (_, error) => error.message)
  .reset(signInFx);

viewerModel.$isAuth.on(signInFx.doneData, () => true);

forward({
  from: login,
  to: signInFx,
});
