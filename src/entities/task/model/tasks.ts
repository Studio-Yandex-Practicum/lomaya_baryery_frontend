import { createEffect, createEvent, createStore, sample } from 'effector';
import { api } from 'shared/api';

type TaskStoreType = null | {
  [key: string]: {
    description: string;
  };
};

export const $tasks = createStore<TaskStoreType>(null);
export const fetchTasks = createEvent();

const getTasksFx = createEffect(async () => {
  const tasks = await api.getTasks();

  const normalizedTasks = tasks.reduce<Record<string, { description: string }>>(
    (acc, cur) => {
      acc[cur.id] = { description: cur.description };
      return acc;
    },
    {}
  );
  return normalizedTasks;
});

$tasks.on(getTasksFx.doneData, (_, tasks) => tasks);

sample({
  clock: fetchTasks,
  source: $tasks,
  filter(tasks) {
    return tasks === null;
  },
  target: getTasksFx,
});
