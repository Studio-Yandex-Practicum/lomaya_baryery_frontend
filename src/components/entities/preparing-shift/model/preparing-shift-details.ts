import { shiftsModel } from '../../../../services/models';

export const $preparingShift = shiftsModel.store.$shifts.map(
  ({ preparing }) => preparing
);
