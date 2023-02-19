import cn from 'classnames';
import { useStore } from 'effector-react';
import { ContentHeading } from '../../shared/ui-kit/content-heading';
import { ContentContainer } from '../../shared/ui-kit/content-container';
import { Table } from '../../shared/ui-kit/table';
import {
  preparingShiftModel,
  PreparingShiftRow,
} from '../../entities/deprecated-preparing-shift';
import {
  finishedShiftModel,
  FinishedShiftRows,
} from '../../entities/deprecated-finished-shift';
import {
  startedShiftModel,
  StartedShiftRow,
} from '../../entities/deprecated-started-shift';
import { CreateNewShift } from '../../features/create-shift';
import styles from './styles.module.css';

function ShiftsTable() {
  const preparingShift = useStore(preparingShiftModel.$preparingShift);
  const startedShift = useStore(startedShiftModel.$startedShift);
  const finishedShifts = useStore(finishedShiftModel.$finishedShifts);

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
