import { createStore } from 'effector';
import { Shift } from 'shared/api';
import { $shifts } from './shift';

const $finishedShifts = createStore<Shift<'finished'>[]>([]);

$finishedShifts.on($shifts, (_, shifts) => shifts.finished);

export { $finishedShifts };
