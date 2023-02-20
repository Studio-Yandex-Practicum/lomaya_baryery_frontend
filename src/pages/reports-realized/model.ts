import { createEvent, forward } from 'effector';
import { reportModel } from 'entities/participant-report';

export const mount = createEvent();
export const unmount = createEvent();

forward({
  from: mount,
  to: reportModel.effects.getRealizedReportsFx,
});

forward({
  from: unmount,
  to: reportModel.events.clear,
});
