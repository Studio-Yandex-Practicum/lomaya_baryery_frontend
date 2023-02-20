import cn from 'classnames';
import { useStore } from 'effector-react';
import { ContentHeading } from '../../shared/ui-kit/content-heading';
import { ContentContainer } from '../../shared/ui-kit/content-container';
import { Table } from '../../shared/ui-kit/table';
import { PreparingShiftRow, shiftModel } from '../../entities/shift';
import { FinishedShiftRows } from '../../entities/shift';
import { StartedShiftRow } from '../../entities/shift';
import { CreateNewShift } from '../../features/create-shift';
import styles from './styles.module.css';

function ShiftsTable() {
  const preparingShift = useStore(shiftModel.$preparingShift);
  const startedShift = useStore(shiftModel.$startedShift);
  const finishedShifts = useStore(shiftModel.$finishedShifts);

  return (
    <Table
      extClassName={styles.shiftsTable}
      header={[
        'Номер смены',
        'Название смены',
        'Дата старта',
        'Дата окончания',
        'Кол-во участников',
        'Статус',
      ]}
      gridClassName={styles.columnsTemplate}
      renderRows={(commonGridClassName) => (
        <div className={cn(styles.shifts, 'custom-scroll')}>
          <PreparingShiftRow
            shiftParams={preparingShift}
            gridClassName={commonGridClassName}
            routePath="/shifts/preparing"
          />
          <StartedShiftRow
            shiftParams={startedShift}
            gridClassName={commonGridClassName}
            routePath="/shifts/started"
          />
          <FinishedShiftRows
            data={finishedShifts}
            gridClassName={commonGridClassName}
            routePath="/shifts/finished"
          />
        </div>
      )}
    />
  );
}

export function PageShiftsAll() {
  return (
    <>
      <ContentContainer extClassName={styles.content}>
        <ContentHeading title="Смены">
          <CreateNewShift />
        </ContentHeading>
        <ShiftsTable />
      </ContentContainer>
    </>
  );
}
