import { createStore, createEffect, createEvent, forward } from 'effector';
import { reportModel } from 'entities/report';
import { api } from 'shared/api';
import { findIndexById } from 'shared/lib/helpers';

const approve = createEvent<string>();
const decline = createEvent<string>();

const approveReportFx = createEffect(api.approveReport);

const declineReportFx = createEffect(api.declineReport);

const $error = createStore<string | null>(null)
  .on(approveReportFx.failData, (_, error) => error.message)
  .on(declineReportFx.failData, (_, error) => error.message)
  .reset([approve, decline, reportModel.store.$reports]);

reportModel.store.$reports
  .on(approveReportFx.done, (state, { params }) => {
    const index = findIndexById(state, 'report_id', params);

    if (index !== null) {
      const updatedState = [...state];
      updatedState[index].report_status = 'approved';
      return updatedState;
    }
  })
  .on(declineReportFx.done, (state, { params }) => {
    const index = findIndexById(state, 'report_id', params);

    if (index !== null) {
      const updatedState = [...state];
      updatedState[index].report_status = 'declined';
      return updatedState;
    }
  });

forward({
  from: approve,
  to: approveReportFx,
});

forward({
  from: decline,
  to: declineReportFx,
});

export const store = { $error };
export const events = { approve, decline };
