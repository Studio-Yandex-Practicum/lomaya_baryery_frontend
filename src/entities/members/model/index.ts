import { combine, createEffect, createStore, createEvent } from 'effector';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'patronum';
import { api, Member } from 'shared/api';

const $search = createStore<string>('');
export const searchChanged = createEvent<string>();
const performSearch = debounce({ source: searchChanged, timeout: 50 });
const $appliedFilters = createStore<string[]>([]);
const $filteredMembers = createStore<Member[]>([]);
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

$search.on(performSearch, (_, $search) => $search);
const $membersState = combine({
  data: $members,
  isLoading: $isLoadingSuccess,
  error: $error,
  search: $search,
});

function addFilterIfNotExists(filter: string, appliedFilters: string[]) {
  const index = appliedFilters.indexOf(filter);
  if (index === -1) appliedFilters.push(filter);
  return appliedFilters;
}

function removeFilter(filter: string, appliedFilters: string[]) {
  const index = appliedFilters.indexOf(filter);
  appliedFilters.splice(index, 1);
  return appliedFilters;
}

const $membersStore = combine(
  $members,
  $search,
  $appliedFilters,
  $filteredMembers,
  ($members, $search, $appliedFilters, $filteredMembers) => {
    const filteredValues = $members.filter((member: Member) =>
      member.surname.toLocaleLowerCase().includes($search.toLocaleLowerCase())
    );
    let filters: string[] = $appliedFilters;
    if ($search) {
      filters = addFilterIfNotExists('search', filters);
      $filteredMembers = filteredValues;
      return $filteredMembers;
    }
    filters = removeFilter('search', filters);
    if (filters.length === 0) {
      $filteredMembers = $members;
      return $filteredMembers;
    }
  }
);

export const store = { $membersState, $members, getMembersFX, $membersStore };
