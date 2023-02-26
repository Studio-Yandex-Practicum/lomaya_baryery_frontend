import { IStatusLabelProps, StatusLabel } from 'shared/ui-kit/status-label';

interface AdminLabelProps {
  adminStatus: 'active' | 'blocked';
}

export function AdminLabel({ adminStatus }: AdminLabelProps) {
  const labelProps = (() => {
    // eslint-disable-next-line default-case
    switch (adminStatus) {
      case 'active':
        return {
          icon: 'CircleCheckIcon',
          statusText: 'Активен',
          type: 'approved',
        } satisfies IStatusLabelProps;
      case 'blocked':
        return {
          icon: 'CircleStopIcon',
          statusText: 'Заблокирован',
          type: 'rejected',
        } satisfies IStatusLabelProps;
    }
  })();

  return <StatusLabel {...labelProps} />;
}
