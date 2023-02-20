import { useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/api';

export function useParticipantsStoreQuery(
  shiftId?: string | undefined,
  queryKey?: unknown[]
) {
  return useQuery({
    queryKey,
    queryFn: shiftId ? () => api.getShiftParticipants(shiftId) : undefined,
    enabled: Boolean(shiftId),
  });
}
