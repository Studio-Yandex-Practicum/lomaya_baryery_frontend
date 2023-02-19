import cn from 'classnames';
import { CellDate, CellText, Table } from '../../../../shared/ui-kit/table';
import styles from './styles.module.css';

interface IShiftDetailsTableProps {
  title: string;
  start: string;
  finish: string;
  participants: number;
  featureComponent?: React.ReactNode;
  extClassName?: string;
}

export function ShiftDetailsTable({
  title,
  start,
  finish,
  participants,
  featureComponent,
  extClassName,
}: IShiftDetailsTableProps) {
  return (
    <Table
      extClassName={extClassName}
      header={['Название смены', 'Дата старта/окончания', 'Кол-во участников']}
      gridClassName={styles.columnsTemplate}
      renderRows={() => (
        <div className={cn(styles.row)}>
          <CellText type="accent" text={title} />
          <div className={styles.row__date}>
            <CellDate date={start} />
            <span
              className={cn(
                styles.row__dateDevider,
                'text text_type_main-medium'
              )}
            >
              –
            </span>
            <CellDate date={finish} />
            {featureComponent}
          </div>
          <CellText text={participants} />
        </div>
      )}
    />
  );
}
