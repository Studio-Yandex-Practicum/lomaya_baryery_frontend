import { useMemo } from 'react';

interface IUseShiftForm {
  startDate: Date;
  finishDate: Date;
  filterStart: Date;
}

export function useShiftForm(
  startDate: string,
  finishDate: string,
  startedFinishDate?: string
): IUseShiftForm {
  return useMemo(() => {
    let filterStart = new Date();

    if (startedFinishDate) {
      filterStart = new Date(startedFinishDate);
    }

    filterStart.setHours(24, 0, 0, 0);

    return {
      startDate: new Date(startDate),
      finishDate: new Date(finishDate),
      filterStart,
    };
  }, [startDate, finishDate, startedFinishDate]);
}
