import { createStore } from 'effector';
import { Shifts } from '../../../../services/api';
import { shiftsModel } from '../../../../services/models';

const $startedShift = createStore<Shifts.TShift<'started'> | null>(null);

$startedShift.on(shiftsModel.store.$shifts, (_, shifts) => shifts.started);

export { $startedShift };
