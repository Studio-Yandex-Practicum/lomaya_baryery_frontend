import { combine, createEffect, createEvent, createStore } from 'effector';
import { api, MemberById } from 'shared/api';

const $member = createStore<MemberById | null>(null);
const $isLoadingSuccess = createStore(false);
export const clear = createEvent();

const getMemberByIdFx = createEffect(async (memberId: string) => {
  const data = await api.getMember(memberId);
  return data;
});

const $error = createStore<string | null>(null)
  .on(getMemberByIdFx.failData, (_, error) => error.message)
  .reset([clear, getMemberByIdFx]);

$member.on(getMemberByIdFx.doneData, (_, data) => data);
$isLoadingSuccess.on(getMemberByIdFx.doneData, () => false);

const $memberState = combine({
  data: $member,
  isLoading: $isLoadingSuccess,
  error: $error,
});

export const store = { $memberState, $member, getMemberByIdFx };
