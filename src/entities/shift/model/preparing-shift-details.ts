import { createStore } from 'effector';
import { Shifts } from '../../../shared/api';
import { shiftsModel } from '../../../../deprecated-services/deprecated-store/deprecated-models';

const $preparingShift = createStore<Shifts.TShift<'preparing'> | null>(null);

$preparingShift.on(shiftsModel.store.$shifts, (_, shifts) => shifts.preparing);

export { $preparingShift };
