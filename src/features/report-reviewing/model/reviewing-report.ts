import { createStore, createEffect, createEvent, forward } from 'effector';
import { reportModel } from 'entities/report';
import { api } from 'shared/api';
import { findIndexById } from 'shared/utils/common-helpers';

const approve = createEvent<string>();
const decline = createEvent<string>();

const approveReportFx = createEffect((reportId: string) =>
  api.approveReport(reportId)
);

const declineReportFx = createEffect((reportId: string) =>
  api.declineReport(reportId)
);

const $isApproveLoadingId = createStore<string | null>(null)
  .on(approveReportFx, (_, reportId) => reportId)
  .on(approveReportFx.finally, () => null);

const $isDeclineLoadingId = createStore<string | null>(null)
  .on(declineReportFx, (_, reportId) => reportId)
  .on(declineReportFx.finally, () => null);

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

export const store = { $isApproveLoadingId, $isDeclineLoadingId, $error };
export const events = { approve, decline };
