import { createStore } from 'effector';
import { Shifts } from '../../../shared/api';
import { shiftsModel } from '../../../../deprecated-services/deprecated-store/deprecated-models';

const $startedShift = createStore<Shifts.TShift<'started'> | null>(null);

$startedShift.on(shiftsModel.store.$shifts, (_, shifts) => shifts.started);

export { $startedShift };
