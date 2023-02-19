import {
  createStore,
  createEffect,
  combine,
  createEvent,
  forward,
  attach,
} from 'effector';
import { startedShiftModel } from '../../../entities/started-shift';
import Api, { Shifts } from '../../../../services/api';
import { preparingShiftModel } from '../../../entities/preparing-shift';

export const closePopup = createEvent();

export const openPopup = createEvent();

export const submitClicker = createEvent<{
  title: string;
  finishDate: string;
}>();

export const $opened = createStore(false);

const $isLoading = createStore(false);

const $error = createStore<null | string>(null);

const updateShiftFx = createEffect((params: Shifts.UpdateShiftProps) =>
  Api.updateShiftSettings(params)
);

const updateStartedShiftFx = attach({
  source: startedShiftModel.$startedShift,
  effect: updateShiftFx,
  mapParams(params: { title: string; finishDate: string }, state) {
    if (state) {
      return {
        shiftId: state.id,
        title: params.title,
        startedAt: state.started_at,
        finishedAt: params.finishDate,
        message: state.final_message,
      };
    }
    throw new Error('started shift not exist');
  },
});

$isLoading.on(updateStartedShiftFx.pending, (_, isLoading) => isLoading);

$error
  .on(updateStartedShiftFx.failData, (_, error) => error.message)
  .reset([closePopup, submitClicker]);

$opened
  .on(openPopup, () => true)
  .on(closePopup, () => false)
  .on(updateStartedShiftFx.doneData, () => false);

export const $updateStartedShiftState = combine({
  isLoading: $isLoading,
  error: $error,
});

forward({
  from: submitClicker,
  to: updateStartedShiftFx,
});

export const $dateRange = startedShiftModel.$startedShift.map((state) => {
  if (state) {
    return {
      startDate: new Date(state.started_at),
      finishDate: new Date(state.finished_at),
    };
  }
  return { startDate: new Date(), finishDate: new Date() };
});

export const $finishDateFilter = preparingShiftModel.$preparingShift.map(
  (state) => {
    let filter;
    if (state) {
      filter = new Date(state.started_at);
      filter.setHours(-24, 0, 0, 0);
    }
    return filter;
  }
);

export const store = {
  $updateStartedShiftState,
  $opened,
  $dateRange,
  $finishDateFilter,
};
export const events = { openPopup, closePopup, submitClicker };

// relocate from UI

// interface IUseShiftForm {
//   startDate: Date;
//   finishDate: Date;
//   filterFinish: Date | undefined;
// }

// export function useShiftForm(
//   startDate: string,
//   finishDate: string,
//   preparingStartDate?: string
// ): IUseShiftForm {
//   return useMemo(() => {
//     let filterFinish: Date | undefined;

//     if (preparingStartDate) {
//       filterFinish = new Date(preparingStartDate);
//       filterFinish.setHours(-24, 0, 0, 0);
//     }

//     return {
//       startDate: new Date(startDate),
//       finishDate: new Date(finishDate),
//       filterFinish,
//     };
//   }, [startDate, finishDate, preparingStartDate]);
// }
