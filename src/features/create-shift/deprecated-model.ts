import {
  createStore,
  createEffect,
  combine,
  createEvent,
  sample,
  forward,
} from 'effector';
import Api, { Shifts } from '../../shared/api';
import { shiftsModel } from '../../../deprecated-services/deprecated-store/deprecated-models';
import { getRecruitmentState } from './lib';

const closePopup = createEvent();

const openPopup = createEvent();

const submitClicker = createEvent<Shifts.CreateShiftProps>();

const $recruitmentShift = createStore('');

const $openModal = createStore(false);

sample({
  clock: openPopup,
  source: shiftsModel.store.$shifts,
  target: $recruitmentShift,
  fn: (shifts) => {
    const { preparing, started } = shifts;
    const current = getRecruitmentState(
      preparing?.id,
      started?.id,
      started?.started_at
    );
    if (current.shiftType === 'preparing') {
      return 'Смена уже создана. Вы сможете создать новую через 2 дня после старта ранее созданной.';
    }
    if (current.shiftType === 'started') {
      return 'В текущую смену идёт набор участников. Новую смену можно создать через 2 дня после старта.';
    }

    return '';
  },
});

const $isLoading = createStore(false);
const $isError = createStore(false);
const $error = createStore<null | string>(null);

const postNewShiftFx = createEffect((params: Shifts.CreateShiftProps) =>
  Api.createNewShift(params)
);

$isLoading.on(postNewShiftFx.pending, (_, isLoading) => isLoading);

$openModal
  .on(openPopup, () => true)
  .on(closePopup, () => false)
  .on(postNewShiftFx.doneData, () => false);

$isError.on(postNewShiftFx.fail, () => true).reset([closePopup, submitClicker]);

$error
  .on(postNewShiftFx.failData, (_, error) => error.message)
  .reset([closePopup, submitClicker]);

shiftsModel.store.$shifts.on(postNewShiftFx.doneData, (state, newShift) => {
  if (newShift) {
    newShift.total_users = 0;
    return { ...state, preparing: newShift };
  }
});

const $createShift = combine({
  isLoading: $isLoading,
  isError: $isError,
  error: $error,
});

forward({
  from: submitClicker,
  to: postNewShiftFx,
});

export const store = { $createShift, $recruitmentShift, $openModal };

export const events = { openPopup, closePopup, submitClicker };