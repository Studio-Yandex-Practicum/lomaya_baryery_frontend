import { createStore } from 'effector';
import { Shift } from 'shared/api';
import { $shifts } from './shift';

export const $readyForCompleteShift =
  createStore<Shift<'ready_for_complete'> | null>(null);

$readyForCompleteShift.on($shifts, (_, shifts) => shifts.readyForComplete);
