import { useMemo } from 'react';

interface IUseShiftForm {
  startDate: Date;
  finishDate: Date;
  filterFinish: Date | undefined;
}

export function useShiftForm(
  startDate: string,
  finishDate: string,
  preparingStartDate?: string
): IUseShiftForm {
  return useMemo(() => {
    let filterFinish: Date | undefined;

    if (preparingStartDate) {
      filterFinish = new Date(preparingStartDate);
      filterFinish.setHours(-24, 0, 0, 0);
    }

    return {
      startDate: new Date(startDate),
      finishDate: new Date(finishDate),
      filterFinish,
    };
  }, [startDate, finishDate, preparingStartDate]);
}
