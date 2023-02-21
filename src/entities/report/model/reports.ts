import {
  createStore,
  createEvent,
  createEffect,
  attach,
  combine,
} from 'effector';
import { shiftModel } from 'entities/shift';
import { api, Report } from 'shared/api';
import { GetReportsParams } from 'shared/api/typicode';

const clear = createEvent();

const $reports = createStore<Report[]>([]);

const fetchReportsFx = createEffect((params: GetReportsParams) =>
  api.getReports(params)
);

const getReviewingReportsFx = attach({
  source: shiftModel.$startedShift,
  effect: fetchReportsFx,
  mapParams(_, state) {
    if (state) {
      return { shiftId: state.id, status: 'reviewing' as const };
    }
    throw new Error('Отчёты не принимаются пока нет текущей смены');
  },
});

const getDeclinedReportsFx = attach({
  source: shiftModel.$startedShift,
  effect: fetchReportsFx,
  mapParams(_, state) {
    if (state) {
      return { shiftId: state.id, status: 'declined' as const };
    }
    throw new Error('Отчёты не принимаются пока нет текущей смены');
  },
});

const getRealizedReportsFx = attach({
  source: shiftModel.$startedShift,
  effect: fetchReportsFx,
  mapParams(_, state) {
    if (state) {
      return { shiftId: state.id, status: undefined };
    }
    throw new Error('Отчёты не принимаются пока нет текущей смены');
  },
});

const $isLoading = createStore(false)
  .on(getReviewingReportsFx.pending, (_, isLoading) => isLoading)
  .on(getDeclinedReportsFx.pending, (_, isLoading) => isLoading)
  .on(getRealizedReportsFx.pending, (_, isLoading) => isLoading);

const $error = createStore<string | null>(null)
  .on(getReviewingReportsFx.failData, (_, error) => error.message)
  .on(getDeclinedReportsFx.failData, (_, error) => error.message)
  .on(getRealizedReportsFx.failData, (_, error) => error.message)
  .reset([clear, getReviewingReportsFx]);

$reports
  .on(getReviewingReportsFx.doneData, (_, data) => data)
  .on(getDeclinedReportsFx.doneData, (_, data) => data)
  .on(getRealizedReportsFx.doneData, (_, data) =>
    data.filter(
      (report) =>
        report.report_status === 'approved' ||
        report.report_status === 'declined'
    )
  )
  .reset(clear);

const $reportsState = combine({
  data: $reports,
  isLoading: $isLoading,
  error: $error,
});

export const store = { $reportsState, $reports };
export const effects = {
  getReviewingReportsFx,
  getDeclinedReportsFx,
  getRealizedReportsFx,
};
export const events = { clear };
