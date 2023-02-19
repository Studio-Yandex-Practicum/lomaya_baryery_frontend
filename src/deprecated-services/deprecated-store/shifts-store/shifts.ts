import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import Api, { Shifts } from '../../../components/shared/api';
import { findRootShifts, getRecruitmentState } from './lib';

export function useShiftsStoreQuery() {
  const queryData = useQuery({
    queryKey: ['shifts'],
    queryFn: Api.getShifts,
    select: (data) => data.filter((shift) => shift.status !== 'cancelled'),
  });

  const rootShifts = useMemo(
    () => findRootShifts(queryData.data),
    [queryData.data]
  );

  const publicAPI = {
    ...queryData,
    rootShifts,
  };

  return publicAPI;
}

export function useCreateNewShift() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shiftProps: Shifts.CreateShiftProps) =>
      Api.createNewShift(shiftProps),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shifts'] }),
  });
}

export function useUpdateShift(shiftId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shiftProps: Shifts.UpdateShiftProps) =>
      Api.updateShiftSettings(shiftProps),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
      queryClient.invalidateQueries({ queryKey: ['participants', shiftId] });
    },
  });
}

export function useFinishShift() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shiftId: string) => Api.finishShift(shiftId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
    },
  });
}

export function useRecruitmentState() {
  const {
    rootShifts: { preparing, started },
  } = useShiftsStoreQuery();

  const state = getRecruitmentState(
    preparing?.id,
    started?.id,
    started?.started_at
  );

  return state;
}
