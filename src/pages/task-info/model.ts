import { createEvent, forward } from 'effector';
import { tasksModel } from 'entities/task';

interface EditParams {
  id: string;
  title: string;
  file: File;
}

interface ChangeParams {
  id: string;
}

export const mount = createEvent<string>();
export const unmount = createEvent();
export const edit = createEvent<EditParams>();
export const archive = createEvent<ChangeParams>();

forward({
  from: mount,
  to: tasksModel.getTaskByIdFx,
});

forward({
  from: unmount,
  to: tasksModel.clearTask,
});

forward({
  from: edit,
  to: tasksModel.editTaskByIdFx,
});

forward({
  from: archive,
  to: tasksModel.archiveTaskByIdFx,
});
