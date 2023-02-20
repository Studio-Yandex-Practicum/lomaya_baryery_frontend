import { createEvent, forward } from 'effector';
import { reportModel } from 'entities/participant-report';

export const mount = createEvent();
export const unmount = createEvent();

export const refetch = mount;

forward({
  from: mount,
  to: reportModel.effects.getReviewingReportsFx,
});

forward({
  from: unmount,
  to: reportModel.events.clear,
});
