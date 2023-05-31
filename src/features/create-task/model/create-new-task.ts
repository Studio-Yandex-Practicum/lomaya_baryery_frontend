import {
  createStore,
  createEffect,
  combine,
  createEvent,
  forward,
} from 'effector';

import { $tasksRaw } from 'entities/task/model';

import { ITask, api } from 'shared/api';

const closePopup = createEvent();

const openPopup = createEvent();

const submitClicker = createEvent<{
  title: string;
  file: File;
}>();

const $opened = createStore(false);

const $isLoading = createStore(false);

const $error = createStore<null | string>(null);

const postNewTaskFx = createEffect(api.createNewTask);

$isLoading.on(postNewTaskFx.pending, (_, isLoading) => isLoading);

$error
  .on(postNewTaskFx.failData, (_, error) => {
    debugger;
    if (error.message.search(/^Объект <.*> уже существует$/) !== -1) {
      return 'Задание или изображение с таким именем уже существует';
    }
    return error.message;
  })
  .reset([closePopup, submitClicker]);

$opened
  .on(openPopup, () => true)
  .on(closePopup, () => false)
  .on(postNewTaskFx.doneData, () => false);

$tasksRaw.on(postNewTaskFx.doneData, (store, data) => {
  return [...store, data as ITask];
});

const $createTaskState = combine({
  isLoading: $isLoading,
  error: $error,
});

forward({
  from: submitClicker,
  to: postNewTaskFx,
});

export const store = {
  $createTaskState,
  $opened,
};

export const events = { openPopup, closePopup, submitClicker };
