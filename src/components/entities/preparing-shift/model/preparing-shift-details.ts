import { createStore } from 'effector';
import { Shifts } from '../../../../services/api';
import { shiftsModel } from '../../../../services/models';

const $preparingShift = createStore<Shifts.TShift<'preparing'> | null>(null);

$preparingShift.on(shiftsModel.store.$shifts, (_, shifts) => shifts.preparing);

export { $preparingShift };
