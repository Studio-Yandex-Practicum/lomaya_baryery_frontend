import { createStore, createEvent, createEffect, forward } from 'effector';
import { api } from 'shared/api';
import { DeclineRequestParams } from 'shared/api/typicode';
import { requestModel } from 'entities/request';
import { findIndexById } from 'shared/lib/helpers';
import { shiftModel } from 'entities/shift';

const openPopup = createEvent();
const closePopup = createEvent();

const approve = createEvent<string>();
const decline = createEvent<DeclineRequestParams>();

const approveRequestFx = createEffect(api.approveRequest);

const declineRequestFx = createEffect(api.declineRequest);

const $isApproveLoading = createStore(false).on(
  approveRequestFx.pending,
  (_, isLoading) => isLoading
);

const $isDeclineLoading = createStore(false).on(
  declineRequestFx.pending,
  (_, isLoading) => isLoading
);

const $error = createStore<string | null>(null)
  .on(approveRequestFx.failData, (_, error) => error.message)
  .on(declineRequestFx.failData, (_, error) => error.message)
  .reset([approveRequestFx, declineRequestFx, closePopup]);

const $opened = createStore(false)
  .on(openPopup, () => true)
  .on(closePopup, () => false)
  .reset(declineRequestFx.doneData);

requestModel.$requests.on(approveRequestFx.done, (state, { params }) => {
  const index = findIndexById(state, 'request_id', params);
  if (index !== null) {
    const updatedState = [...state];
    updatedState[index].request_status = 'approved';
    return updatedState;
  }
});

requestModel.$requests.on(declineRequestFx.done, (state, { params }) => {
  const index = findIndexById(state, 'request_id', params.requestId);
  if (index !== null) {
    const updatedState = [...state];
    updatedState[index].request_status = 'declined';
    return updatedState;
  }
});

shiftModel.$shifts.on(approveRequestFx.doneData, (state) => {
  if (state.preparing) {
    return {
      ...state,
      preparing: {
        ...state.preparing,
        total_users: state.preparing.total_users + 1,
      },
    };
  }
  if (state.started) {
    return {
      ...state,
      started: {
        ...state.started,
        total_users: state.started.total_users + 1,
      },
    };
  }
});

forward({
  from: approve,
  to: approveRequestFx,
});

forward({
  from: decline,
  to: declineRequestFx,
});

export const store = { $isApproveLoading, $isDeclineLoading, $error, $opened };
export const events = { closePopup, openPopup, approve, decline };
