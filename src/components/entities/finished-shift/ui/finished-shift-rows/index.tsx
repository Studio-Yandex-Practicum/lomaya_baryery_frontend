import { ShiftRow } from '../../../../shared/shift-row';
import { StatusLabel } from '../../../../../ui/status-label';

interface FinishedShiftRowProps {
  gridClassName: string;
  routePath: string;
  data: {
    id: string;
    sequence_number: number;
    title: string;
    started_at: string;
    finished_at: string;
    total_users: number;
  }[];
}

export function FinishedShiftRows({
  gridClassName,
  routePath,
  data,
}: FinishedShiftRowProps) {
  return (
    <>
      {data.map((shift) => (
        <ShiftRow
          key={shift.id}
          routePath={`${routePath}/${shift.id}`}
          gridClassName={gridClassName}
          shiftParams={shift}
          label={<StatusLabel statusText="Прошедшая" type="past" />}
        />
      ))}
    </>
  );
}
