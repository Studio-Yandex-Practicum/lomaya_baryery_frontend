import { ShiftRow } from '../../../../shared/shift-row';
import { StatusLabel } from '../../../../../ui/status-label';

interface StartedShiftRowProps {
  routePath: string;
  gridClassName: string;
  shiftParams: {
    sequence_number: number;
    title: string;
    started_at: string;
    finished_at: string;
    total_users: number;
  } | null;
}

export function StartedShiftRow({
  shiftParams,
  gridClassName,
  routePath,
}: StartedShiftRowProps) {
  if (shiftParams === null) {
    return null;
  }

  return (
    <ShiftRow
      shiftParams={shiftParams}
      gridClassName={gridClassName}
      routePath={routePath}
      label={<StatusLabel statusText="Текущая" type="current" />}
    />
  );
}
