import { useStore } from 'effector-react';
import { shiftModel } from 'entities/shift';
import { ShiftLabel } from 'entities/shift';
import { ShiftRow } from 'entities/shift';
import { Table } from 'shared/ui-kit/table';
import styles from './styles.module.css';

interface ShiftsTableProps {
  extClassName?: string;
}

export function ShiftsTable({ extClassName }: ShiftsTableProps) {
  const preparingShift = useStore(shiftModel.$preparingShift);
  const startedShift = useStore(shiftModel.$startedShift);
  const finishedShifts = useStore(shiftModel.$finishedShifts);

  const header = [
    'Номер смены',
    'Название смены',
    'Дата старта',
    'Дата окончания',
    'Кол-во участников',
    'Статус',
  ];

  return (
    <Table
      extClassName={extClassName}
      header={header}
      gridClassName={styles.columnsTemplate}
      renderRows={(gridClassName) => (
        <div className={[styles.rows, 'custom-scroll'].join(' ')}>
          <ShiftRow
            gridClassName={gridClassName}
            routePath="/shifts/preparing"
            shiftParams={preparingShift}
            label={<ShiftLabel shiftStatus={preparingShift?.status} />}
          />
          <ShiftRow
            gridClassName={gridClassName}
            routePath="/shifts/started"
            shiftParams={startedShift}
            label={<ShiftLabel shiftStatus={startedShift?.status} />}
          />
          {finishedShifts.map((shift) => (
            <ShiftRow
              key={shift.id}
              gridClassName={gridClassName}
              routePath={`/shifts/finished/${shift.id}`}
              shiftParams={shift}
              label={<ShiftLabel shiftStatus={shift?.status} />}
            />
          ))}
        </div>
      )}
    />
  );
}
