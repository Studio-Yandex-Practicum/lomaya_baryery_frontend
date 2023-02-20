import { StatusLabel } from '../../../../shared/ui-kit/status-label';
import { ShiftRow } from '../../../../shared/ui/shift-row';

interface PreparingShiftRowProps {
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

export function PreparingShiftRow({
  gridClassName,
  routePath,
  shiftParams,
}: PreparingShiftRowProps) {
  if (shiftParams === null) {
    return null;
  }

  return (
    <ShiftRow
      gridClassName={gridClassName}
      routePath={routePath}
      shiftParams={shiftParams}
      label={<StatusLabel statusText="Новая" type="new" />}
    />
  );
}
