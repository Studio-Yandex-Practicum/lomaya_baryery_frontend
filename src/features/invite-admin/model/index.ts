import { createStore, createEffect, createEvent, sample } from 'effector';
import { api } from 'shared/api';
import { emailPattern, namePattern } from 'shared/lib';

interface ValidityType {
  error: string | null;
  verified: boolean;
}

interface ValuesType {
  name: string;
  surname: string;
  email: string;
}

export const clear = createEvent();
export const setValue = createEvent<Partial<ValuesType>>();
export const submit = createEvent();

export const openPopup = createEvent();
export const closePopup = createEvent();

export const $values = createStore<ValuesType>({
  name: '',
  surname: '',
  email: '',
})
  .on(setValue, (state, fieldValue) => ({ ...state, ...fieldValue }))
  .reset(clear);

const $validity = createStore<ValidityType>({ error: null, verified: false });

const sendInviteAdminFx = createEffect(api.sendInvitation);

export const $isLoading = createStore(false).on(
  sendInviteAdminFx.pending,
  (_, isLoading) => isLoading
);

export const $isSuccess = createStore(false)
  .on(sendInviteAdminFx.doneData, () => true)
  .reset([sendInviteAdminFx, clear]);

export const $error = createStore<string | null>(null)
  .on(sendInviteAdminFx.failData, (_, error) => error.message)
  .on($validity, (_, validity) => (validity.verified ? validity.error : null))
  .reset([setValue, sendInviteAdminFx, clear]);

export const $opened = createStore(false)
  .on(closePopup, () => false)
  .on(openPopup, () => true)
  .on($isSuccess, () => false);

sample({
  clock: submit,
  source: $values,
  fn(values) {
    const validityState: ValidityType = {
      error: null,
      verified: true,
    };

    const trimmedValues = Object.values(values).map((value: string) =>
      value.trim()
    );

    if (trimmedValues.some((value) => !value)) {
      validityState.error = 'Все поля обязательные';
      return validityState;
    }

    if (!emailPattern.test(values.email)) {
      validityState.error = 'E-mail указан в неверном формате';
      return validityState;
    }

    if (!namePattern.test(values.name) || !namePattern.test(values.surname)) {
      validityState.error = 'Имя или фамилия содержит недопустимые символы';
      return validityState;
    }

    return validityState;
  },
  target: $validity,
});

sample({
  clock: $validity,
  filter: (_, validity) => validity.verified && !validity.error,
  source: $values,
  target: sendInviteAdminFx,
});
