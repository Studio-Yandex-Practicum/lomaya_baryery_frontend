import { createEvent, forward } from 'effector';
import { tasksModel } from 'entities/task';

export const mount = createEvent();
export const unmount = createEvent();

export const refetch = mount;

forward({
  from: mount,
  to: tasksModel.fetchTasksRaw,
});

forward({
  from: unmount,
  to: tasksModel.clear,
});
