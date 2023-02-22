import { createEvent, forward } from 'effector';
import { reportModel } from 'entities/report';

export const mount = createEvent();

forward({
  from: mount,
  to: reportModel.effects.getDeclinedReportsFx,
});
