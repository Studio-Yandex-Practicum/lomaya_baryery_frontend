import { ReportStatus } from 'shared/api';
import { StatusLabel } from 'shared/ui-kit/status-label';

interface ReportLabelProps {
  status: ReportStatus | undefined | null;
}

export function ReportLabel({ status }: ReportLabelProps) {
  if (!status || status === 'reviewing') {
    return null;
  }

  const labelProps = (() => {
    // eslint-disable-next-line default-case
    switch (status) {
      case 'approved':
        return {
          icon: 'CircleCheckIcon' as const,
          type: 'approved' as const,
          statusText: 'Задание принято',
        };
      case 'declined':
        return {
          icon: 'CircleStopIcon' as const,
          type: 'rejected' as const,
          statusText: 'Задание отклонено',
        };
      case 'waiting':
        return {
          icon: 'CircleStopIcon' as const,
          type: 'review' as const,
          statusText: 'Задание на проверке',
        };
    }
  })();

  return <StatusLabel {...labelProps} />;
}
