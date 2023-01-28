import cn from 'classnames';
import { Button } from '../../ui/button';
import { CellDate, CellText, Table } from '../../ui/table';
import styles from './styles.module.css';

interface IShiftDetailsTableProps {
  title: string;
  start: string;
  finish: string;
  participants: number;
  onButtonClick?: () => void;
  extClassName?: string;
}

export function ShiftDetailsTable({
  title,
  start,
  finish,
  participants,
  onButtonClick,
  extClassName,
}: IShiftDetailsTableProps) {
  return (
    <Table
      extClassName={extClassName}
      header={['Название смены', 'Дата старта/окончания', 'Кол-во участников']}
      gridClassName={styles.columnsTemplate}
      renderRows={(commonGridStyles) => (
        <div className={cn(styles.row, commonGridStyles)}>
          <CellText type="accent" text={title} />
          <div className={styles.row__date}>
            <CellDate date={start} />
            <span className={cn(styles.row__dateDevider, 'text text_type_main-medium')}>–</span>
            <CellDate date={finish} />
            {onButtonClick && (
              <Button
                extClassName={styles.row__editButton}
                htmlType="button"
                type="secondary"
                size="small"
                onClick={onButtonClick}
              >
                Изменить
              </Button>
            )}
          </div>
          <CellText text={participants} />
        </div>
      )}
    />
  );
}
