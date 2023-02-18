import cn from 'classnames';
import { useStore } from 'effector-react';
import { ContentHeading } from '../../../ui/content-heading';
import { ContentContainer } from '../../../ui/content-container';
import { CreateNewShift } from '../../features/create-shift';
import { Table } from '../../../ui/table';
import {
  preparingShiftModel,
  PreparingShiftRow,
} from '../../entities/preparing-shift';
import {
  finishedShiftModel,
  FinishedShiftRows,
} from '../../entities/finished-shift';
import {
  startedShiftModel,
  StartedShiftRow,
} from '../../entities/started-shift';
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
      renderRows={(commonGridStyles) => (
        <div className={cn(styles.shifts, 'custom-scroll')}>
          <PreparingShiftRow
            shiftParams={preparingShift}
            gridClassName={commonGridStyles}
            routePath="preparing"
          />
          <StartedShiftRow
            shiftParams={startedShift}
            gridClassName={commonGridStyles}
            routePath="started"
          />
          <FinishedShiftRows
            data={finishedShifts}
            gridClassName={commonGridStyles}
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
