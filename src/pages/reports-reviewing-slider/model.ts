import { createEvent, forward } from 'effector';
import { reportModel } from 'entities/report';

export const load = createEvent();

forward({
  from: load,
  to: reportModel.effects.getReviewingReportsFx,
});
