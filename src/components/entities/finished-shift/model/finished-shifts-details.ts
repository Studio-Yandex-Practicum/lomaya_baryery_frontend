import { shiftsModel } from '../../../../services/models';

export const $finishedShifts = shiftsModel.store.$shifts.map(
  ({ finished }) => finished
);
