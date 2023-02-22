import { createEvent, forward } from 'effector';
import { reportModel } from 'entities/report';

export const mount = createEvent();

export const refetch = mount;

forward({
  from: mount,
  to: reportModel.effects.getReviewingReportsFx,
});
