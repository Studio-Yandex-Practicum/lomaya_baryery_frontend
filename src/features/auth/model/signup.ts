import { createStore, createEffect, createEvent, sample } from 'effector';
import { api } from 'shared/api';
import { getInvitation } from 'shared/api/typicode';
import { passwordPattern } from 'shared/lib';

type TokenType = string;

interface InvitationType {
  name: string;
  surname: string;
  token: string;
}

interface ValuesType {
  pwd: string;
  repeatPwd: string;
}

interface ValidityType {
  error: string | null;
  verified: boolean;
}

export const checkInvite = createEvent<TokenType>();

export const $invitation = createStore<InvitationType>({
  name: '',
  surname: '',
  token: '',
});

const getInvitationFx = createEffect(getInvitation);

export const $isChecking = createStore(false).on(
  getInvitationFx.pending,
  (_, isLoading) => isLoading
);

export const $checkError = createStore<string | null>(null)
  .on(getInvitationFx.failData, (_, error) => error.message)
  .reset(getInvitationFx);

$invitation.on(getInvitationFx.done, (_, { params: token, result }) => {
  const { name, surname } = result;
  return { name, surname, token };
});

export const submit = createEvent();
export const setValue = createEvent<Partial<ValuesType>>();
export const clear = createEvent();

export const $values = createStore<ValuesType>({ pwd: '', repeatPwd: '' });

const signUpFx = createEffect(api.signUp);

const $validity = createStore<ValidityType>({
  error: null,
  verified: false,
}).reset([setValue, submit, clear]);

export const $isSubmiting = createStore(false).on(
  signUpFx.pending,
  (_, isLoading) => isLoading
);

export const $submitError = createStore<string | null>(null)
  .on($validity, (_, validity) => (validity.verified ? validity.error : null))
  .on(signUpFx.failData, (_, error) => error.message)
  .reset([setValue, signUpFx]);

export const $isSignUpSuccess = createStore(false).on(
  signUpFx.doneData,
  () => true
);

sample({
  clock: submit,
  source: $values,
  fn(values) {
    const validityState: ValidityType = { error: null, verified: true };

    const trimmedValues = Object.values(values).map((value: string) =>
      value.trim()
    );

    if (trimmedValues.some((value) => !value)) {
      validityState.error = 'Все поля обязательные';
      return validityState;
    }

    if (!passwordPattern.test(values.pwd)) {
      validityState.error = 'Пароль содержит недопустимые символы';
      return validityState;
    }

    if (values.pwd !== values.repeatPwd) {
      validityState.error = 'Пароли не совпадают';
      return validityState;
    }

    return validityState;
  },
  target: $validity,
});

sample({
  clock: $validity,
  source: { $invitation, $values },
  filter: (_, validity) => validity.verified && !validity.error,
  fn({ $invitation, $values }) {
    const { name, surname, token } = $invitation;
    const { repeatPwd: password } = $values;
    return { name, surname, password, token };
  },
  target: signUpFx,
});
