import { useQuery } from '@tanstack/react-query';
import Api from '../../../components/shared/api';

export function useParticipantsStoreQuery(
  shiftId?: string | undefined,
  queryKey?: unknown[]
) {
  return useQuery({
    queryKey,
    queryFn: shiftId ? () => Api.getShiftParticipants(shiftId) : undefined,
    enabled: Boolean(shiftId),
  });
}
