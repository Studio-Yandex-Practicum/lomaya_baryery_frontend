import { combine, createEffect, createStore, createEvent } from 'effector';
import { api, Member } from 'shared/api';

const $members = createStore<Member[]>([]);
const $isLoadingSuccess = createStore(false);
const clear = createEvent();

const getMembersFX = createEffect(async () => {
  const data = await api.getMembers();
  return data;
});

const $error = createStore<string | null>(null)
  .on(getMembersFX.failData, (_, error) => error.message)
  .reset([clear, getMembersFX]);

$members.on(getMembersFX.doneData, (_, data) => data);
$isLoadingSuccess.on(getMembersFX.doneData, () => true);

const $membersState = combine({
  data: $members,
  isLoading: $isLoadingSuccess,
  error: $error,
});

export const store = { $membersState, $members, getMembersFX };
