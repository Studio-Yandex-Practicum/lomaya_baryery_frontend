import {
  createStore,
  createEffect,
  createEvent,
  attach,
  combine,
} from 'effector';
import { shiftModel } from 'entities/shift';
import { api, Request } from 'shared/api';

const { $preparingShift, $startedShift } = shiftModel;

export const clear = createEvent();

export const $requests = createStore<Request[]>([]);

const fetchPendingRequestsFx = createEffect(api.getRequests);

const fetchRealizedRequestsFx = createEffect(async (shiftId: string) => {
  const declined = api.getRequests({ shiftId, status: 'declined' });
  const approved = api.getRequests({ shiftId, status: 'approved' });

  const all = await Promise.all([declined, approved]);

  return all.flat();
});

const $recruitmentShiftId = combine(
  [$preparingShift, $startedShift],
  ([$preparingShift, $startedShift]) => {
    if ($preparingShift) {
      return $preparingShift.id;
    }
    if ($startedShift) {
      return $startedShift.id;
    }

    return null;
  }
);

export const getPendingRequestsFx = attach({
  source: $recruitmentShiftId,
  effect: fetchPendingRequestsFx,
  mapParams(_, shiftId) {
    if (shiftId !== null) {
      return { shiftId, status: 'pending' as const };
    }
    throw new Error('Создайте новую смену, чтобы начать принимать заявки');
  },
});

export const getRealizedRequestsFx = attach({
  source: $recruitmentShiftId,
  effect: fetchRealizedRequestsFx,
  mapParams(_, shiftId) {
    if (shiftId !== null) {
      return shiftId;
    }
    throw new Error('Создайте новую смену, чтобы начать принимать заявки');
  },
});

const $isLoading = createStore(false);
const $error = createStore<string | null>(null);

$requests
  .on(getPendingRequestsFx.doneData, (_, data) => data)
  .on(getRealizedRequestsFx.doneData, (_, data) => data)
  .reset(clear);

$isLoading
  .on(getPendingRequestsFx.pending, (_, isLoading) => isLoading)
  .on(getRealizedRequestsFx.pending, (_, isLoading) => isLoading);

$error
  .on(getPendingRequestsFx.failData, (_, error) => error.message)
  .on(getRealizedRequestsFx.failData, (_, error) => error.message)
  .reset([clear, getPendingRequestsFx, getRealizedRequestsFx]);

export const $requestsState = combine({
  data: $requests,
  isLoading: $isLoading,
  error: $error,
});
