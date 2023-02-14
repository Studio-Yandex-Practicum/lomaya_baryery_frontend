import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import Api, { Shifts } from '../api';

interface RootShifts {
  preparing: undefined | Shifts.IShift;
  started: undefined | Shifts.IShift;
}

export function findRootShifts(shifts: Shifts.IShift[] | undefined) {
  const result: RootShifts = { started: undefined, preparing: undefined };

  if (shifts) {
    let cur = 0;
    const end = shifts.length;
    while (!result.started && !result.preparing && cur < end) {
      if (shifts[cur].status === 'started') {
        result.started = shifts[cur];
      }

      if (shifts[cur].status === 'preparing') {
        result.preparing = shifts[cur];
      }

      cur += 1;
    }

    return result;
  }

  return result;
}

export function useShiftsStoreQuery() {
  const shifts = useQuery({
    queryKey: ['shifts'],
    queryFn: Api.getShifts,
  });

  const rootShifts: RootShifts = useMemo(
    () => findRootShifts(shifts.data),
    [shifts.data],
  );

  return { rootShifts, ...shifts };
}
