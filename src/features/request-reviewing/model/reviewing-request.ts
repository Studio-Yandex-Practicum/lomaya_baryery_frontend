import { createStore, createEvent, createEffect, forward } from 'effector';
import { api } from 'shared/api';
import { DeclineRequestParams } from 'shared/api/typicode';
import { requestModel } from 'entities/request';
import { findIndexById } from 'shared/utils/common-helpers';

const openPopup = createEvent();
const closePopup = createEvent();

const approve = createEvent<string>();
const decline = createEvent<DeclineRequestParams>();

const approveRequestFx = createEffect((requestId: string) =>
  api.approveRequest(requestId)
);

const declineRequestFx = createEffect(
  ({ requestId, message }: DeclineRequestParams) =>
    api.declineRequest({ requestId, message })
);

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
