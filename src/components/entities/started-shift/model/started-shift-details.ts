import { shiftsModel } from '../../../../services/models';

export const $startedShift = shiftsModel.store.$shifts.map(
  ({ started }) => started
);
