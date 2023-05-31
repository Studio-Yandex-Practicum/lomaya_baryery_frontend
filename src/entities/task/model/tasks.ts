import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { debounce } from 'patronum';
import { ITask, api } from 'shared/api';

export interface IEditTask extends ITask {
  file: File;
}

type TaskStoreType = null | {
  [key: string]: {
    description: string;
  };
};

export const $tasks = createStore<TaskStoreType>(null);
export const $tasksRaw = createStore<ITask[]>([]);
export const $task = createStore<IEditTask | null>(null);
export const $search = createStore<string>('');

export const $isLoading = createStore(false);
export const $isLoadingTaskById = createStore(false);
export const $isLoadingArchiveTask = createStore(false);

const $error = createStore<string | null>(null);
const $errorTaskById = createStore<string | null>(null);
export const $errorEditTaskById = createStore<string | null>(null);

export const fetchTasks = createEvent();
export const fetchTasksRaw = createEvent();
export const clear = createEvent();
export const clearTask = createEvent();
export const searchChanged = createEvent<string>();
const performSearch = debounce({ source: searchChanged, timeout: 50 });

const getTasksFx = createEffect(async () => {
  const tasks = await api.getTasks();

  const normalizedTasks = tasks.reduce<Record<string, { description: string }>>(
    (acc, cur) => {
      acc[cur.id] = { description: cur.title };
      return acc;
    },
    {}
  );
  return normalizedTasks;
});

const getTasksRawFx = createEffect(async () => {
  const tasks = await api.getTasks();
  tasks.sort((a, b) => a.sequence_number - b.sequence_number);

  return tasks;
});

export const getTaskByIdFx = createEffect(
  async (id: string): Promise<IEditTask> => {
    const task = await api.getTask(id);
    return task;
  }
);

export const editTaskByIdFx = createEffect(api.editTask);

export const archiveTaskByIdFx = createEffect(api.changeStatus);

$tasks.on(getTasksFx.doneData, (_, tasks) => tasks);

$tasksRaw.on(getTasksRawFx.doneData, (_, tasksRaw) => tasksRaw);

$tasksRaw.on(editTaskByIdFx.doneData, (store, changedTask) => {
  const newStore = store.map((task) => {
    if (task.id === changedTask.id) {
      return changedTask;
    }
    return task;
  });
  return newStore;
});

$task
  .on(getTaskByIdFx.doneData, (_, task) => task)
  .on(editTaskByIdFx.doneData, (_, task) => task)
  .on(archiveTaskByIdFx.doneData, (store, task) => {
    const newStore = {
      ...store,
      is_archived: task.is_archived,
    } as IEditTask;

    return newStore;
  })
  .reset(clearTask);

$isLoading.on(getTasksRawFx.pending, (_, isLoading) => isLoading);

$isLoadingTaskById.on(getTaskByIdFx.pending, (_, isLoading) => isLoading);

$isLoadingArchiveTask.on(
  archiveTaskByIdFx.pending,
  (_, isLoading) => isLoading
);

$error
  .on(getTasksRawFx.failData, (_, error) => error.message)
  .reset([clear, getTasksRawFx]);

$errorTaskById
  .on(getTaskByIdFx.failData, (_, error) => error.message)
  .reset([getTaskByIdFx]);

$errorEditTaskById
  .on(editTaskByIdFx.failData, (_, error) => {
    return 'Ошибка. Возможно задание или изображение с таким именем уже существует';
  })
  .reset([editTaskByIdFx, getTaskByIdFx]);

$search.on(performSearch, (_, $search) => $search);

sample({
  clock: fetchTasks,
  source: $tasks,
  filter(tasks) {
    return tasks === null;
  },
  target: getTasksFx,
});

sample({
  clock: fetchTasksRaw,
  source: $tasksRaw,
  filter(tasks) {
    return tasks.length === 0;
  },
  target: getTasksRawFx,
});

const $tasksStore = combine($tasksRaw, $search, ($tasksRaw, $search) => {
  if ($search) {
    const filteredValues = $tasksRaw.filter((task: ITask) =>
      task.title.toLocaleLowerCase().includes($search.toLocaleLowerCase())
    );
    return filteredValues;
  } else {
    return $tasksRaw;
  }
});

export const $tasksState = combine({
  data: $tasksRaw,
  isLoading: $isLoading,
  error: $error,
  search: $search,
});

export const $taskByIdState = combine({
  data: $task,
  isLoading: $isLoadingTaskById,
  error: $errorTaskById,
});

export const tasksStore = { $tasksState, $tasksRaw, $tasksStore };
