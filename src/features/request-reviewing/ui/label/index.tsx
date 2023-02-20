import { RequestStatus } from 'shared/api';
import { StatusLabel } from 'shared/ui-kit/status-label';

interface RequestLabelProps {
  status: RequestStatus | undefined | null;
}

export function RequestLabel({ status }: RequestLabelProps) {
  if (!status || status === 'pending') {
    return null;
  }

  const labelProps = (() => {
    // eslint-disable-next-line default-case
    switch (status) {
      case 'approved':
        return {
          icon: 'CircleCheckIcon' as const,
          type: 'approved' as const,
          statusText: 'Участник одобрен',
        };
      case 'declined':
        return {
          icon: 'CircleStopIcon' as const,
          type: 'rejected' as const,
          statusText: 'Участник отклонён',
        };
    }
  })();

  return <StatusLabel {...labelProps} />;
}
