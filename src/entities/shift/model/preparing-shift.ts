import { createStore } from 'effector';
import { Shift } from 'shared/api';
import { $shifts } from './shift';

const $preparingShift = createStore<Shift<'preparing'> | null>(null);

$preparingShift.on($shifts, (_, shifts) => shifts.preparing);

export { $preparingShift };
