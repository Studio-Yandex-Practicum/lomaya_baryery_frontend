import { createStore } from 'effector';
import { Shift } from 'shared/api';
import { $shifts } from './shift';

const $startedShift = createStore<Shift<'started'> | null>(null);

$startedShift.on($shifts, (_, shifts) => shifts.started);

export { $startedShift };
