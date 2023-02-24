import { ShiftStatus } from 'shared/api';
import { StatusLabel } from 'shared/ui-kit/status-label';

interface ShiftLabelProps {
  shiftStatus: ShiftStatus | null | undefined;
}

export function ShiftLabel({ shiftStatus }: ShiftLabelProps) {
  if (shiftStatus === null || shiftStatus === undefined) {
    return null;
  }

  interface LabelProps {
    statusText: string;
    type: 'current' | 'new' | 'past' | 'rejected' | 'review';
  }

  const labelProps: LabelProps = (() => {
    // eslint-disable-next-line default-case
    switch (shiftStatus) {
      case 'started':
        return { statusText: 'Текущая', type: 'current' };
      case 'preparing':
        return { statusText: 'Новая', type: 'new' };
      case 'ready_for_complete':
        return { statusText: 'Завершающаяся', type: 'review' };
      case 'finished':
        return { statusText: 'Прошедшая', type: 'past' };
      case 'cancelled':
        return { statusText: 'Отменённая', type: 'rejected' };
    }
  })();

  return <StatusLabel {...labelProps} />;
}
