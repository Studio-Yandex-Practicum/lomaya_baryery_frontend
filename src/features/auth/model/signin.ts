import { createEffect, createEvent, createStore, sample } from 'effector';
import { viewerModel } from 'entities/viewer';
import { api } from 'shared/api';
import { emailPattern, passwordPattern } from 'shared/lib';

interface Values {
  email: string;
  password: string;
}

interface Validity {
  error: string | null;
  verified: boolean;
}

export const setValue = createEvent<Partial<Values>>();
export const sendForm = createEvent();

export const signInFx = createEffect(api.signIn);

const $validity = createStore<Validity>({
  error: null,
  verified: false,
}).reset(setValue);

export const $isLoading = createStore(false).on(
  signInFx.pending,
  (_, isLoading) => isLoading
);

export const $error = createStore<string | null>(null)
  .on($validity, (_, validity) => (validity.verified ? validity.error : null))
  .on(signInFx.failData, (_, error) => error.message)
  .reset([signInFx, setValue]);

viewerModel.$isAuth.on(signInFx.doneData, () => true);

export const $values = createStore<Values>({ email: '', password: '' }).on(
  setValue,
  (state, value) => ({ ...state, ...value })
);

sample({
  clock: sendForm,
  source: $values,
  fn({ email, password }) {
    const validityState: Validity = {
      error: null,
      verified: true,
    };
    if ([email, password].some((value) => !value)) {
      validityState.error = 'Все поля обязательные';
      return validityState;
    }

    if (!emailPattern.test(email)) {
      validityState.error = 'E-mail указан в неверном формате';
      return validityState;
    }

    if (!passwordPattern.test(password)) {
      validityState.error = 'Проль содержит недопустимые символы';
      return validityState;
    }

    return validityState;
  },
  target: $validity,
});

sample({
  clock: $validity,
  source: $values,
  filter: (_, validity) => validity.verified && !validity.error,
  fn: (values) => values,
  target: signInFx,
});
