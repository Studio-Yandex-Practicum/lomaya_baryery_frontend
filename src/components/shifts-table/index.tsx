import cn from 'classnames';
import { useStore } from 'effector-react';
import { useMemo } from 'react';
import { Shifts } from '../../services/api';
import { shiftsModel } from '../../services/models';
import { StatusLabel } from '../../ui/status-label';
import { CellDate, CellLink, CellText, Table } from '../../ui/table';
import styles from './styles.module.css';

interface IShiftsTableProps {
  extClassName?: string;
}

export function ShiftsTable({ extClassName }: IShiftsTableProps) {
  const shifts = useStore(shiftsModel.store.$shifts);

  const renderData = useMemo(
    () =>
      Object.values(shifts)
        .flat()
        .filter((shift) => shift !== null),
    [shifts]
  );

  function renderStatusLabel(status: Shifts.TShiftStatus) {
    switch (status) {
      case 'preparing':
        return <StatusLabel statusText="Новая" type="new" />;
      case 'started':
        return <StatusLabel statusText="Текущая" type="current" />;
      case 'finished':
        return <StatusLabel statusText="Прошедшая" type="past" />;
      default:
        return null;
    }
  }

  function getRoutePath(shift: Shifts.IShift) {
    switch (shift.status) {
      case 'preparing':
        return `/shifts/preparing`;
      case 'started':
        return `/shifts/started`;
      case 'finished':
        return `/shifts/finished/${shift.id}`;
      default:
        return '/';
    }
  }

  return (
    <Table
      extClassName={extClassName}
      header={[
        'Номер смены',
        'Название смены',
        'Дата старта',
        'Дата окончания',
        'Кол-во участников',
        'Статус',
      ]}
      gridClassName={styles.columnsTemplate}
      renderRows={(commonGridStyles) =>
        shifts && (
          <div className={cn(styles.shifts, 'custom-scroll')}>
            {renderData.map((shift) => (
              <div
                key={shift.id}
                className={cn(styles.row, commonGridStyles, 'tableContentRow')}
              >
                <CellText text={shift.sequence_number} />
                <CellLink text={shift.title} routeTo={getRoutePath(shift)} />
                <CellDate date={shift.started_at} />
                <CellDate date={shift.finished_at} />
                <CellText text={shift.total_users} />
                {renderStatusLabel(shift.status)}
              </div>
            ))}
          </div>
        )
      }
    />
  );
}
