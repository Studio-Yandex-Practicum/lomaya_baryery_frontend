import { createStore } from 'effector';
import { Shifts } from '../../../../services/api';
import { shiftsModel } from '../../../../services/models';

const $finishedShifts = createStore<Array<Shifts.TShift<'finished'>>>([]);

$finishedShifts.on(shiftsModel.store.$shifts, (_, shifts) => shifts.finished);

export { $finishedShifts };
