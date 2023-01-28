import { useMemo } from 'react';

interface IUseShiftForm {
  startDate: Date;
  finishDate: Date;
  filterStart: Date;
}

export function useShiftForm(startedFinishDate?: string): IUseShiftForm {
  return useMemo(() => {
    let start = new Date();

    if (startedFinishDate) {
      start = new Date(startedFinishDate);
    }

    start.setHours(24, 0, 0, 0);

    const finish = new Date(start);
    finish.setHours(24);

    return {
      startDate: start,
      finishDate: finish,
      filterStart: start,
    };
  }, [startedFinishDate]);
}
