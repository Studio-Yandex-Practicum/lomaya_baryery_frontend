import { createStore } from 'effector';
import { Shifts } from '../../../shared/api';
import { shiftsModel } from '../../../../deprecated-services/deprecated-store/deprecated-models';

const $finishedShifts = createStore<Array<Shifts.TShift<'finished'>>>([]);

$finishedShifts.on(shiftsModel.store.$shifts, (_, shifts) => shifts.finished);

export { $finishedShifts };
